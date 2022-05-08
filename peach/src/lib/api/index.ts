import axios from 'axios';

export type ApiResponse<T extends {}> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ApiErrorResponse<T extends { [key: string]: string }> = {
  [key in keyof T]?: string[];
} & {
  non_field_errors?: string[];
};

export const api = axios.create({
  baseURL:
    typeof window === 'undefined' ? process.env.API_BASE_URL : '/api/proxy',
});
