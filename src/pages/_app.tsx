import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  Modal,
  Aside,
  Footer,
  Navbar,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { IconCrown, IconLogout, IconPlus } from '@tabler/icons-react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import NextApp, { AppContext } from 'next/app';
import { ColorSchemeToggle, NavBar } from '../components';
import { trpc } from '../utils/trpc';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';

const App = (props: AppProps & { colorScheme: ColorScheme }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (process.env.VERCEL_ENV === 'production' && 'dark') || props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const AppContent = () => {
    return (
      <>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Notifications />
            <AppShell
              padding="md"
              navbar={
                <>
                  <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 250, lg: 300 }}
                  >
                    <NavBar />
                  </Navbar>
                </>
              }
              header={
                <Header height={70} p="sm">
                  <Group position="apart">
                    <Group>
                      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="sm"
                          color={theme.colors.gray[6]}
                          mr="xl"
                        />
                      </MediaQuery>
                      <ActionIcon variant="light" size="xl">
                        <IconCrown size={24} />
                      </ActionIcon>
                      <Text
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                        ta="center"
                        p="xs"
                        fz="xl"
                        fw={700}
                      >
                        {'  '}Royal Diadems
                      </Text>
                    </Group>
                    <Group>
                      <ColorSchemeToggle />
                    </Group>
                  </Group>
                </Header>
              }
              aside={
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                    <Text>Application sidebar</Text>
                  </Aside>
                </MediaQuery>
              }
              footer={
                <Footer height={60} p="md">
                  Application footer
                </Footer>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
            >
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </AppShell>
          </MantineProvider>
        </ColorSchemeProvider>
      </>
    );
  };
  return (
    <>
      <Head>
        <title>Royal Diadems</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>
      <AppContent />
    </>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};

export default trpc.withTRPC(App);
