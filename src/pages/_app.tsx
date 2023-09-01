import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]';
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
  const { Component, pageProps } = props;
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
    const { status, data } = useSession();
    const users = trpc.user.list.useQuery()

    return (
      <>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <Notifications />
            <AppShell
              padding="md"
              navbar={
                <>
                  {status === 'authenticated' && (
                    <Navbar
                      p="md"
                      hiddenBreakpoint="sm"
                      hidden={!opened}
                      width={{ sm: 250, lg: 300 }}
                    >
                      <NavBar />
                    </Navbar>
                  )}
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
                      {status === 'authenticated' && (
                        <>
                          <ActionIcon variant="light" size="xl">
                            <IconLogout
                              color="red"
                              size={20}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                notifications.show({
                                  color: 'red',
                                  title: 'Authentication',
                                  message: 'Logging out ... Thanks for using Manta Wallet',
                                });
                                signOut();
                              }}
                            />
                          </ActionIcon>
                        </>
                      )}
                    </Group>
                  </Group>
                </Header>
              }
              aside={
                <>
                  {status === 'authenticated' && (
                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                      <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                        <Text>Application sidebar</Text>
                      </Aside>
                    </MediaQuery>
                  )}
                </>
              }
              footer={
                <>
                  {status === 'authenticated' && (
                    <Footer height={60} p="md">
                      Application footer
                    </Footer>
                  )}
                </>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
            >
              <Component {...pageProps} />
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
      <SessionProvider session={pageProps.session}>
        <AppContent />
      </SessionProvider>
    </>
  );
};

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorscheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default trpc.withTRPC(App);
