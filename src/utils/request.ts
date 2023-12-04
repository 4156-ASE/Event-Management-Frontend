import axios from 'axios';

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
