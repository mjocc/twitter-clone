import { Tabs } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TweetList from '../../components/tweets/TweetList';

const Profile: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  // TODO: add logic that checks if the username exists and if it is valid, if not redirect to 404 or something
  const UNSAFEusername = username as string;
  //!REMOVE THIS WHEN ABOVE TODO COMPLETED
  return (
    <>
      <Head>
        <title>@{username} | Twitter</title>
      </Head>
      <Tabs>
        <Tabs.Tab label="Tweets">
          <TweetList
            filters={{
              author__username: UNSAFEusername,
              reply: 'false',
            }}
          />
        </Tabs.Tab>
        {/* // TODO: this should render replies correctly - mabye do it in tweet component? */}
        <Tabs.Tab label="Tweets & replies">
          <TweetList
            filters={{
              author__username: UNSAFEusername,
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab label="Likes">
          <TweetList
            filters={{
              liked_by__username: UNSAFEusername,
              reply: 'false',
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Profile;
