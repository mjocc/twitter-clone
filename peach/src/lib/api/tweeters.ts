import { api, ApiResponse } from '.';

export type Tweeter = {
  id: string;
  username: string;
  profile_name: string;
  date_joined: string;
  tweet_count: number;
  following: boolean | null;
};

export type TweeterFilters = Partial<{
  search: string;
  username: string;
  following__username: string;
  followed_by__username: string;
  page: number;
}>;

export const fetchTweeter = (id: string) => api.get<Tweeter>(`/tweeters/${id}`);

export const fetchTweeters = (filters?: TweeterFilters) =>
  api.get<ApiResponse<Tweeter>>('/tweeters', { params: filters });

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
