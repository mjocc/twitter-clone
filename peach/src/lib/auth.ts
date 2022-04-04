import { apiUrl, FETCH_OPTIONS } from './api';

export interface UserInfo {
  id: string;
  username: string;
  profile_name: string;
  date_joined: string;
}

export const logIn = async (credentials: {
  username: string;
  password: string;
}) => {
  const url = apiUrl('/obtain-auth-token/');
  const body = JSON.stringify(credentials);
  const response = await fetch(url, {
    ...FETCH_OPTIONS(),
    method: 'POST',
    body,
  });
  const response_data = await response.json();
  return response_data;
};

export const getUserInfo = async (username: string) => {
  const url = apiUrl(`/tweeters/?username=${username}`);
  const response = await fetch(url, {
    ...FETCH_OPTIONS(),
    method: 'GET',
  });
  const response_data: { results?: UserInfo[] } = await response.json();
  return response_data;
};

// TODO: write similar logic for sign up and function to get user information from username
