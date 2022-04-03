import { apiUrl, FETCH_OPTIONS } from './api';

export const logIn = async (credentials: {
  username: string;
  password: string;
}) => {
  const url = apiUrl('/obtain-auth-token/');
  const body = JSON.stringify(credentials);
  const response = await fetch(url, {
    ...FETCH_OPTIONS(),
    body,
  });
  const response_data = await response.json();
  return response_data;
};

// TODO: write similar logic for sign up and function to get user information from username