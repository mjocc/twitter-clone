import { useAtomValue } from 'jotai';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import TweetComposer from '../components/tweets/TweetComposer';
import TweetList from '../components/tweets/TweetList';
import { api, ApiResponse } from '../lib/api';
import { fetchTweets, Tweet as TweetType } from '../lib/api/tweet';
import { usernameAtom } from '../lib/state';
import { UserInfoCookie } from './_app';

export const getServerSideProps: GetServerSideProps<{
  initialData: ApiResponse<TweetType>;
}> = async (context) => {
  const userInfoCookie: UserInfoCookie | null = JSON.parse(
    context.req.cookies?.['auth-token'] ?? null
  );
  const { data } = await fetchTweets({
    author__followed_by__username: userInfoCookie?.username,
    reply: 'false',
  });
  return {
    props: {
      initialData: data,
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
      <TweetComposer />
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
