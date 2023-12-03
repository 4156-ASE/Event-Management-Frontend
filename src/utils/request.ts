import axios from 'axios';

export function navigateUrl(url: string) {
  const element = document.createElement('a');

  if (url.startsWith('http://') || url.startsWith('https://')) {
    element.href = url;
  } else {
    element.href = `http://${url}`;
  }

  element.click();
}

export const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 12 * 10000,
});

// set every request headers with JWT Token
request.interceptors.request.use((req) => {
  const JWTToken = localStorage.getItem('ems:auth') || '';
  if (JWTToken) {
    req.headers.Authorization = `Bearer ${JWTToken}`;
  }
  return req;
});
