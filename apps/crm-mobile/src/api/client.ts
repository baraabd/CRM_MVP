import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://192.168.68.56:3000';

export const api = axios.create({
  baseURL: `${BASE_URL}/v1`,
  timeout: 15000,
});
