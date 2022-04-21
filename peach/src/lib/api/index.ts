export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';
export type QueryParams = { [key: string]: string };

interface MakeApiCallInfoBase extends Omit<RequestInit, 'body'> {
  method: HttpMethod;
  params?: QueryParams;
  body?: { [key: string]: string | number | boolean | null };
  errorOnFail?: boolean;
}
type MakeApiCallInfo =
  | (MakeApiCallInfoBase & { path: string; exactPath?: never })
  | (MakeApiCallInfoBase & { path?: never; exactPath: string });

export type ApiResponse<T extends {}> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const apiUrl = (path: string, queryParams: QueryParams = {}) =>
  (typeof window === 'undefined' ? process.env.API_BASE_URL : '/api/proxy') +
  path +
  '?' +
  new URLSearchParams(queryParams);

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

//TODO: type this properly
export const makeApiCall = async ({
  path,
  exactPath,
  params = {},
  headers: extraHeaders = {},
  body: bodyObject,
  errorOnFail = false,
  ...otherOptions
}: MakeApiCallInfo) => {
  const url = path ? apiUrl(path, params) : (exactPath as string);
  if (path) {
  } else {
    exactPath;
  }
  const headers = { ...defaultHeaders, ...extraHeaders };
  const body = bodyObject ? JSON.stringify(bodyObject) : undefined;

  const response = await fetch(url, { headers, body, ...otherOptions });
  if (errorOnFail && !response.ok) throw new Error('Error in response');
  const responseData = await response.json();
  return { response, responseData };
};
