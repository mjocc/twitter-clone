import { makeApiCall } from '.';

export const followTweeter = async ({
  tweeterId,
  following,
}: {
  tweeterId: string;
  following: boolean;
}) =>
  await makeApiCall({
    path: `/follow-tweeter/${tweeterId}`,
    method: 'PATCH',
    body: { following },
    errorOnFail: true,
  });
