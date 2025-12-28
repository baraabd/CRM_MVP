import axios from 'axios';
import { Platform } from 'react-native';

function isAndroidEmulator() {
  // Expo/React Native: emulator عادة يكون 10.0.2.2 (Android Studio)
  // سنعتمد على أنك ستضع IP اللابتوب للجهاز الحقيقي في ENV أو ثابت هنا.
  return Platform.OS === 'android' && !process.env.EXPO_PUBLIC_API_HOST;
}

// ضع IP اللابتوب هنا أو مرّره عبر EXPO_PUBLIC_API_HOST
const LAN_HOST = process.env.EXPO_PUBLIC_API_HOST || '192.168.1.56';
const API_PORT = process.env.EXPO_PUBLIC_API_PORT || '3000';
const USE_EMULATOR = process.env.EXPO_PUBLIC_USE_EMULATOR === 'true';

const HOST =
  Platform.OS === 'android' && USE_EMULATOR
    ? '10.0.2.2'
    : LAN_HOST;

// مهم: baseURL يحتوي /v1 مرة واحدة فقط
const BASE_URL = `http://${HOST}:${API_PORT}/v1`;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});


// Logs مفيدة للتشخيص
api.interceptors.request.use((config) => {
  const method = (config.method || 'GET').toUpperCase();
  const baseURL = config.baseURL ?? '';
  const url = config.url ?? '';
  console.log('[API REQUEST]', method, `${baseURL}${url}`);
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('[API ERROR]', err?.response?.status, err?.config?.url, err?.message);
    return Promise.reject(err);
  }
);
