import { onlineManager } from '@tanstack/react-query';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useSyncExternalStore } from 'react';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_RAILWAY_API_URL,
  withCredentials: true,
  timeout: 40000,
});

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = await (window as any).Clerk?.session?.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // no token available
  }
  return config;
};

api.interceptors.request.use(authInterceptor);

let sessionExpiredPending = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes('/api/v1/auth') &&
      !sessionExpiredPending
    ) {
      sessionExpiredPending = true;
      window.dispatchEvent(new CustomEvent('auth:session-expired'));
    }
    return Promise.reject(error);
  },
);

onlineManager.setEventListener((setOnline) => {
  const check = async () => {
    try {
      await api.get('/server/ping', { timeout: 5000 });
      setOnline(true);
    } catch (error) {
      // Only go offline when there's no response (network down).
      // A 4xx/5xx means the server is reachable, so stay online.
      setOnline(axios.isAxiosError(error) ? !!error.response : false);
    }
  };

  check();
  const interval = setInterval(check, 15_000);
  return () => clearInterval(interval);
});

export function useServerOnline() {
  return useSyncExternalStore(
    onlineManager.subscribe.bind(onlineManager),
    onlineManager.isOnline.bind(onlineManager),
  );
}

export default api;
