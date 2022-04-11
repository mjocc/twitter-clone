import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import TweetList from '../components/tweets/TweetList';
import { usernameAtom } from '../lib/state';

const Home: NextPage = () => {
  const username = useAtomValue(usernameAtom);

  return (
    <>
      <Head>
        <title>Home | Twitter</title>
      </Head>
      <TweetList
        queryParams={{
          author__followed_by__username: username,
        }}
      />
    </>
  );
};

export default Home;
