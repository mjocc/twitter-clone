import { Paper, Stack, Text } from '@mantine/core';
import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ApiResponse } from '../lib/api';
import { Tweet } from '../lib/api/query';
import { usernameAtom } from '../lib/state';

const Home: NextPage = () => {
  const username = useAtomValue(usernameAtom);
  const [page, setPage] = useState(1);
  const { isLoading, isSuccess, isError, isIdle, data } = useQuery<
    ApiResponse<Tweet>,
    Error,
    ApiResponse<Tweet>
  >([
    '/tweets',
    {
      author__followed_by__username: username,
      page,
    },
  ]);

  return (
    <>
      <Head>
        <title>Home | Twitter</title>
      </Head>
      <Stack>
        {isSuccess &&
          data.results.map((tweet) => (
            <Paper key={tweet.id}>
              <Text px={15} py={10}>{tweet.text}</Text>
            </Paper>
          ))}
      </Stack>
    </>
  );
};

export default Home;
