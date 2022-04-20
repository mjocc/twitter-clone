import { makeApiCall } from '.';
import { TweetComposerValues } from '../../components/tweets/TweetComposer';

export const createTweet = async (values: TweetComposerValues) =>
  await makeApiCall({
    path: '/tweets',
    method: 'POST',
    body: { ...values, replied_tweet: null },
  });
