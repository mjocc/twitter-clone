import Head from 'next/head';
import { useAtomValue } from 'jotai';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import TweetComposer from '../components/tweets/TweetComposer';
import TweetList from '../components/tweets/TweetList';
import { api, ApiResponse } from '../lib/api';
import { fetchTweeters, Tweeter } from '../lib/api/tweeters';
import { usernameAtom } from '../lib/state';
import { UserInfoCookie } from './_app';
import TweeterList from '../components/tweeter/TweeterList';

// TODO: implement following page
export const getServerSideProps: GetServerSideProps<{
  initialData: ApiResponse<Tweeter>;
}> = async (context) => {
  const userInfoCookie: UserInfoCookie | null = JSON.parse(
    context.req.cookies?.['auth-token'] ?? null
  );
  const { data } = await fetchTweeters({
    followed_by__username: userInfoCookie?.username,
  });
  return {
    props: {
      initialData: data,
    },
  };
};

type FollowingProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Following: NextPage<FollowingProps> = ({ initialData }) => {
  const username = useAtomValue(usernameAtom);

  return (
    <>
      <Head>
        <title>Following | Twitter</title>
      </Head>
      <TweeterList
        filters={{
          followed_by__username: username,
        }}
        initialData={initialData}
      />
    </>
  );
};

export default Following;
