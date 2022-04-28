import { api } from '.';

export type Tweeter = {
  id: string;
  username: string;
  profile_name: string;
  date_joined: string;
  tweet_count: number;
  following: boolean | null;
};

export type TweeterFilters = Partial<{
  username: string;
  following__username: string;
  followed_by__username: string;
}>;

export const followTweeter = async ({
  tweeterId,
  following,
}: {
  tweeterId: string;
  following: boolean;
}) =>
  api.patch<{ following: boolean }>(`/follow-tweeter/${tweeterId}`, {
    following,
  });
