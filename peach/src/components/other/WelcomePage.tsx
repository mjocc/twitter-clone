import { Box, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import Image from 'next/image';
import { VoidFunctionComponent } from 'react';
import icon from '../../../public/icon.png';
import AuthButtons from '../authentication/AuthButtons';

interface WelcomePageProps {}

const WelcomePage: VoidFunctionComponent<WelcomePageProps> = () => {
  return (
    <>
      <Head>
        <title>Welcome | Twitter</title>
      </Head>
      <Stack
        align="center"
        justify="center"
        sx={{ height: '100%', paddingBottom: 150 }}
      >
        <Image src={icon} height={100} width={100} />
        <Title
          order={1}
          align="center"
          sx={{ fontSize: 50, marginBottom: -10, marginTop: -10 }}
        >
          Welcome to Twitter!
        </Title>
        <Title order={2} align="center" sx={{ fontSize: 30, marginBottom: 5 }}>
          Sign up to follow people and post tweets.
        </Title>
        <Box sx={{ width: 400 }}>
          <AuthButtons grow large />
        </Box>
      </Stack>
    </>
  );
};

export default WelcomePage;
