import axios from 'axios';

// Android emulator -> host machine
const BASE_URL = 'http://10.0.2.2:3000';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});
