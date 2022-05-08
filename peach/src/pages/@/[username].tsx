import { Alert, Box, Tabs } from '@mantine/core';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import UserBanner from '../../components/tweeter/UserBanner';
import TweetList from '../../components/tweets/TweetList';
import { ApiResponse } from '../../lib/api';
import { getUserInfo } from '../../lib/api/auth';
import { fetchTweeter, Tweeter } from '../../lib/api/tweeters';
import { fetchTweets, Tweet } from '../../lib/api/tweets';

export const getServerSideProps: GetServerSideProps<{
  initialData: {
    tweets: ApiResponse<Tweet>;
    replies: ApiResponse<Tweet>;
    likes: ApiResponse<Tweet>;
    userInfo: Tweeter;
  };
}> = async (context) => {
  const { username } = context.params as { username?: string };
  if (!username) return { notFound: true };

  let data;
  try {
    ({ data } = await getUserInfo(username));
  } catch (error) {
    return { notFound: true };
  }

  if (data.count === 0) return { notFound: true };
  const userInfo: Tweeter = data.results[0];

  const initialResponses = await Promise.all([
    fetchTweets({
      author__username: username,
      reply: false,
    }),
    fetchTweets({
      author__username: username,
    }),
    fetchTweets({
      liked_by__username: username,
    }),
  ]);
  const [tweets, replies, likes] = initialResponses.map((res) => res.data);
  const initialData = { tweets, replies, likes, userInfo };
  return {
    props: { initialData },
  };
};

type ProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Profile: NextPage<ProfileProps> = ({ initialData }) => {
  const { id, username, profile_name } = initialData.userInfo;

  const {
    data: tweeter,
    isSuccess,
    isError,
    isLoading,
  } = useQuery(
    ['tweeters', { id }],
    async () => (await fetchTweeter(id)).data,
    {
      initialData: initialData.userInfo,
    }
  );

  return (
    <>
      <Head>
        <title>
          {profile_name} (@{username}) | Twitter
        </title>
      </Head>
      {isSuccess && <UserBanner {...tweeter} noLink />}
      {isError && (
        <Alert
          icon={<AlertCircle size={16} />}
          title="Something went wrong"
          color="red"
          mt="md"
        >
          Tweeter could not be fetched. Please try again later.
        </Alert>
      )}
      <Box my={5}>
        <Tabs tabPadding="lg">
          <Tabs.Tab label="Tweets">
            <TweetList
              filters={{
                author__username: username,
                reply: false,
              }}
              initialData={initialData.tweets}
            />
          </Tabs.Tab>
          {/* // TODO: this should render replies correctly - mabye do it in tweet component? */}
          <Tabs.Tab label="Tweets & replies">
            <TweetList
              filters={{
                author__username: username,
              }}
              initialData={initialData.replies}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Likes">
            <TweetList
              filters={{
                liked_by__username: username,
              }}
              initialData={initialData.likes}
            />
          </Tabs.Tab>
        </Tabs>
      </Box>
    </>
  );
};

export default Profile;
