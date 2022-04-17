import { GetServerSidePropsContext, PreviewData } from 'next';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { QueryFunctionContext } from 'react-query';
import { makeApiCall } from '.';
import { UserInfoCookie } from '../../pages/_app';

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

const cleanParams = (params: GeneralQueryKey[1]) => {
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete params[key];
    }
  });
  const cleanedParams = params as { [key: string]: string };
  return cleanedParams;
};

export const fetchForQuery = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<GeneralQueryKey, number | string>) => {
  const [path, params] = queryKey;
  const cleanedParams = cleanParams(params);

  const { responseData } = await makeApiCall({
    method: 'GET',
    path,
    params: { ...cleanedParams, page: pageParam.toString() },
    errorOnFail: true,
  });

  return responseData;
};

export const fetchInitialQueryData = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  path: string,
  getFilters?: (userInfo: UserInfoCookie | null) => GeneralQueryKey[1]
) => {
  const userInfoCookie: UserInfoCookie | null = JSON.parse(
    context.req.cookies?.['auth-token'] ?? null
  );
  const filters = getFilters ? getFilters(userInfoCookie) : {};
  const params = cleanParams(filters);

  const { responseData } = await makeApiCall({
    method: 'GET',
    path,
    params,
  });

  return responseData;
};
