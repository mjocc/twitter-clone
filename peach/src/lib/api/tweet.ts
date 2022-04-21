import { makeApiCall } from '.';
import { TweetComposerValues } from '../../components/tweets/TweetComposer';
// TODO: make into react query mutations
export const createTweet = async (values: TweetComposerValues) =>
  await makeApiCall({
    path: '/tweets',
    method: 'POST',
    body: { ...values, replied_tweet: null },
  });

export const likeTweet = async ({
  tweetId,
  liked,
}: {
  tweetId: string;
  liked: boolean;
}) =>
  await makeApiCall({
    path: `/like-tweet/${tweetId}`,
    method: 'PATCH',
    body: { liked },
    errorOnFail: true,
  });
