export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';
export type QueryParams = { [key: string]: string };
interface MakeApiCallInfo extends Omit<RequestInit, 'body'> {
  path: string;
  pathAsIs?: boolean;
  method: HttpMethod;
  params?: QueryParams;
  body?: { [key: string]: any };
}

const apiUrl = (
  path: string,
  queryParams: QueryParams = {},
) => '/api/proxy' + path + '?' + new URLSearchParams(queryParams);

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const makeApiCall = async ({
  path,
  pathAsIs = false,
  params = {},
  headers: extraHeaders = {},
  body: bodyObject,
  ...otherOptions
}: MakeApiCallInfo) => {
  const url = pathAsIs ? path : apiUrl(path, params);
  const headers = { ...defaultHeaders, ...extraHeaders };
  const body = bodyObject ? JSON.stringify(bodyObject) : undefined;

  const response = await fetch(url, { headers, body, ...otherOptions });
  const responseData = await response.json();
  return { response, responseData };
};

// TODO: write react-query getter function for tweets and tweeters, etc.
