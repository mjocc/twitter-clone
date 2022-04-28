import { api, ApiResponse } from '.';
import { LogInFormValues } from '../../components/authentication/LogInForm';
import { SignUpFormValues } from '../../components/authentication/SignUpForm';
import { Tweeter } from './tweeters';

export interface UserInfo {
  token?: null;
  loggedIn: boolean;
  username: string;
  profile_name: string;
}

type LogInResponse = {
  username: string;
  profile_name: string;
  loggedIn: boolean;
};

export const logIn = (credentials: LogInFormValues) =>
  api.post<LogInResponse>('/obtain-auth-token', credentials);

export const signUp = (credentials: SignUpFormValues) =>
  api.post<Tweeter>('/tweeters', credentials);

export const logOut = () =>
  api.post<{ loggedIn: false }>('/api/log-out', null, { baseURL: '' });

export const getUserInfo = (username: string) =>
  api.get<ApiResponse<Tweeter>>('/tweeters', { params: { username } });
