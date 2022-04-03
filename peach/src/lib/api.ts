export const API_BASE_URL = 'http://localhost:8000/api';
export const apiUrl = (path: string) => API_BASE_URL + path;

// TODO: make it so requests sent onced logged in are automatically authenticated (use fetch options)
// - must be passed from component for jotai - create hook to help with calling api functions (could auto get token etc.)?
export const FETCH_OPTIONS = () => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// TODO: write react-query getter function for tweets and tweeters, etc.
