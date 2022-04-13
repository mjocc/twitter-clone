import { useAtomValue } from 'jotai';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { InfiniteData } from 'react-query';
import TweetList from '../components/tweets/TweetList';
import { ApiResponse, makeApiCall } from '../lib/api';
import { Tweet as TweetType } from '../lib/api/query';
import { usernameAtom } from '../lib/state';
import { UserInfoCookie } from './_app';

//TODO: make this a thing that can be generated from a function?
export const getServerSideProps: GetServerSideProps<{
  initialData:ApiResponse<TweetType>;
}> = async (context) => {
  const userInfoCookie: UserInfoCookie | null = JSON.parse(
    context.req.cookies['auth-token']
  );
  const response = await fetch(
    'http://localhost:8000/tweets?' +
      new URLSearchParams({
        author__followed_by__username: userInfoCookie
          ? userInfoCookie.username
          : '',
        reply: 'false',
      })
  );
  const responseData = await response.json()
  return {
    props: {
      initialData: responseData
    },
  };
};

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<HomeProps> = ({ initialData }) => {
  const username = useAtomValue(usernameAtom);
  
  return (
    <>
      <Head>
        <title>Home | Twitter</title>
      </Head>
      <TweetList
        filters={{
          author__followed_by__username: username,
          reply: 'false',
        }}
        initialData={initialData}
      />
    </>
  );
};

export default Home;
