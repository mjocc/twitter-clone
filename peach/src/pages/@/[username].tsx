import { Box, Tabs } from '@mantine/core';
import axios from 'axios';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import ProfileBanner from '../../components/other/ProfileBanner';
import TweetList from '../../components/tweets/TweetList';
import { ApiResponse } from '../../lib/api';
import { getUserInfo } from '../../lib/api/auth';
import { fetchTweets, Tweet } from '../../lib/api/tweet';
import { Tweeter } from '../../lib/api/tweeters';

export const getServerSideProps: GetServerSideProps<{
  userInfo: Tweeter;
  initialData: {
    tweets: ApiResponse<Tweet>;
    replies: ApiResponse<Tweet>;
    likes: ApiResponse<Tweet>;
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
      reply: 'false',
    }),
    fetchTweets({
      author__username: username,
    }),
    fetchTweets({
      liked_by__username: username,
      reply: 'false',
    }),
  ]);
  const [tweets, replies, likes] = initialResponses.map((res) => res.data);
  const initialData = { tweets, replies, likes };
  return {
    props: { userInfo, initialData },
  };
};

type ProfileProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Profile: NextPage<ProfileProps> = ({ userInfo, initialData }) => {
  const username = userInfo.username;

  return (
    <>
      <Head>
        <title>{userInfo.profile_name} (@{username}) | Twitter</title>
      </Head>
      <ProfileBanner {...userInfo} />
      <Box my={5} >
        <Tabs tabPadding="lg">
          <Tabs.Tab label="Tweets">
            <TweetList
              filters={{
                author__username: username,
                reply: 'false',
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
                reply: 'false',
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
