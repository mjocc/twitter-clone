import axios from 'axios';

export type ApiResponse<T extends {}> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export const api = axios.create({
  baseURL:
    typeof window === 'undefined' ? process.env.API_BASE_URL : '/api/proxy',
});
