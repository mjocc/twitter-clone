import { api, ApiResponse } from '.';
import { TweetComposerValues } from '../../components/tweets/TweetComposer';
import { Tweeter } from './tweeters';

export type Tweet = {
  id: string;
  text: string;
  created: string;
  reply: boolean;
  author: Tweeter;
  replied_tweet: string | null;
  liked: boolean | null;
  like_count: number;
  reply_count: number;
};

export type TweetFilters = Partial<{
  replied_tweet: string;
  author__username: string;
  author__followed_by__username: string;
  liked_by__username: string;
  reply: string;
  page: number;
}>;

export const fetchTweet = (id: string) => api.get<Tweet>(`/tweets/${id}`);

export const fetchTweets = (filters?: TweetFilters) =>
  api.get<ApiResponse<Tweet>>('/tweets', { params: filters });

export const createTweet = (values: TweetComposerValues) =>
  api.post<Tweet>('/tweets', { ...values, replied_tweet: null });

export const likeTweet = ({
  tweetId,
  liked,
}: {
  tweetId: string;
  liked: boolean;
}) => api.patch<{ liked: boolean }>(`/like-tweet/${tweetId}`, { liked });
