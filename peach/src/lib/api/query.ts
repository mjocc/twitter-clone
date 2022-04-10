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
};

export type GeneralQueryKey = [string, { [key: string]: string | undefined }];
export const fetchFromApi = async ({
  queryKey,
}: QueryKeyObject<GeneralQueryKey>) => {
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
    params: cleanedParams,
    errorOnFail: true,
  });
};

// TODO: implement react-query for tweets and tweeters, etc.
