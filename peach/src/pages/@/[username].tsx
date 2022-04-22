import { Box, Tabs } from '@mantine/core';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import ProfileBanner from '../../components/other/ProfileBanner';
import TweetList from '../../components/tweets/TweetList';
import { getUserInfo } from '../../lib/api/auth';
import { fetchInitialQueryData, Tweeter } from '../../lib/api/query';

export const getServerSideProps: GetServerSideProps<{
  userInfo: Tweeter;
  initialData: {
    tweets: any;
    replies: any;
    likes: any;
  };
}> = async (context) => {
  const { username } = context.params as { username?: string };
  if (!username) return { notFound: true };

  const { response, responseData } = await getUserInfo(username);
  if (!response.ok) return { notFound: true };
  if ((responseData?.count ?? 0) === 0) return { notFound: true };
  const userInfo: Tweeter = responseData?.results?.[0];

  const initialData = {
    tweets: await fetchInitialQueryData('/tweets', {
      author__username: username,
      reply: 'false',
    }),
    replies: await fetchInitialQueryData('/tweets', {
      author__username: username,
    }),
    likes: await fetchInitialQueryData('/tweets', {
      liked_by__username: username,
      reply: 'false',
    }),
  };
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
        <title>@{username} | Twitter</title>
      </Head>
      <ProfileBanner {...userInfo} />
      <Box>
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
