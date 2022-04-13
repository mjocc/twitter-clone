import { Button, Group, Stack, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Home } from 'tabler-icons-react';

interface Error404PageProps {}

const Error404Page: NextPage<Error404PageProps> = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Page not found | Twitter</title>
      </Head>
      <Stack
        align="center"
        justify="center"
        sx={{ marginTop: '15vh' }}
      >
        <Title
          order={1}
          align="center"
          sx={{ fontSize: 200, marginBottom: -35 }}
        >
          404
        </Title>
        <Title order={2} align="center" sx={{ fontSize: 50, marginBottom: 5 }}>
          This page could not be found
        </Title>
        <Group>
          <Button
            leftIcon={<ArrowLeft size={32} />}
            onClick={() => router.back()}
            size="lg"
          >
            Back
          </Button>
          <Link href="/" passHref>
            <Button leftIcon={<Home size={32} />} size="lg">
              Home
            </Button>
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default Error404Page;
