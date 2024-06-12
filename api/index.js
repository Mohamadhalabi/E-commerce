import axios from 'axios';
import store from 'vuex';
import { state } from '/store/currency'
import config from '~/configs';

// Check if localStorage is available (client-side)
const isLocalStorageAvailable = process.client && typeof localStorage !== 'undefined';

// If localStorage is available, use it to get the state
const localStorageState = isLocalStorageAvailable ? JSON.parse(localStorage.getItem('tlkeys')) : null;
const token = localStorageState ? localStorageState.auth.token : null;

// Set default currency if not present in localStorage
// if (isLocalStorageAvailable && !localStorage.getItem('currency')) {
//   localStorage.setItem('currency', 'USD');
// }

const api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
    'currency': state().currency,
    'Accept': 'application/json',
    'secret-key': process.env.SECRET_KEY,
    'api-key': process.env.API_KEY,
  },
});

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  if (error.response.status === 401) {
    // Remove token and handle the redirection on the client side
    if (isLocalStorageAvailable) {
      localStorage.removeItem('tlkeys');
      localStorage.setItem('tokenEnded', 1);
      // window.location.href = '/auth/login';
    }
  }
  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
