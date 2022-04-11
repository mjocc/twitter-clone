import { QueryFunctionContext } from 'react-query';
import { makeApiCall } from '.';

export type QueryKeyObject<T extends {}> = {
  queryKey: T;
};

type TweetAuthor = {
  id: string;
  username: string;
  profile_name: string;
  date_joined: string;
};
export type Tweet = {
  id: string;
  text: string;
  created: string;
  reply: boolean;
  author: TweetAuthor;
  replied_tweet: string | null;
  liked: boolean | null;
  like_count: number;
  reply_count: number;
};

export type GeneralQueryKey = [string, { [key: string]: string | undefined }];
export const fetchFromApi = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<GeneralQueryKey, number | string>) => {
  const [path, params] = queryKey;

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });
  const cleanedParams = params as { [key: string]: string };

  return await makeApiCall({
    method: 'GET',
    path,
    params: { ...cleanedParams, page: pageParam.toString() },
    errorOnFail: true,
  });
};

// TODO: implement react-query for tweets and tweeters, etc.
