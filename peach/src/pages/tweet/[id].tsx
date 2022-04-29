import { Alert, Box } from '@mantine/core';
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import Tweet from '../../components/tweets/Tweet';
import { fetchTweet, Tweet as TweetType } from '../../lib/api/tweets';

export const getServerSideProps: GetServerSideProps<{
  initialData: TweetType;
}> = async (context) => {
  const { id } = context.params as { id?: string };
  if (!id) return { notFound: true };

  let data;
  try {
    ({ data } = await fetchTweet(id));
  } catch (error) {
    return { notFound: true };
  }

  return {
    props: { initialData: data },
  };
};

type TweetPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// TODO: render replies

const TweetPage: NextPage<TweetPageProps> = ({ initialData }) => {
  const { id } = initialData;
  const {
    data: tweet,
    isSuccess,
    isError,
  } = useQuery(['tweets', { id }], async () => (await fetchTweet(id)).data, {
    initialData,
  });

  return (
    <>
      <Head>
        <title>
          {isSuccess
            ? `${tweet.author.profile_name} on Twitter: "${tweet.text}" | Twitter`
            : 'Twitter'}
        </title>
      </Head>
      <Box mx="auto" sx={{ maxWidth: 550 }}>
        {isSuccess && <Tweet {...tweet} noLink />}
        {isError && (
          <Alert
            icon={<AlertCircle size={16} />}
            title="Something went wrong"
            color="red"
            mt="md"
          >
            Tweets could not be fetched. Please try again later.
          </Alert>
        )}
      </Box>
    </>
  );
};

export default TweetPage;
