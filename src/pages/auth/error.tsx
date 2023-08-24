import { Box, Button, Card, Group } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { TitleText } from '../../components';

const ErrorPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    let sub = true;
    if (sub) {
      if (status === 'authenticated') router.push('/');
    }
    return () => {
      sub = false;
    };
  }, [status, router]);

  return (
    <>
      <Card
        sx={{ maxWidth: 360 }}
        mx="auto"
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ marginTop: '200px' }}
      >
        <Card.Section>
          <Box p="lg">
            <form>
              <Group m="md" position="center">
                <TitleText title="Sign In Error" />
              </Group>
              <Group mt="xl">
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => {
                    router.push('/auth/sign-in');
                  }}
                >
                  Sign In
                </Button>
              </Group>
            </form>
          </Box>
        </Card.Section>
      </Card>
    </>
  );
};

const Page = () => {
  return <ErrorPage />;
};

export default Page;
