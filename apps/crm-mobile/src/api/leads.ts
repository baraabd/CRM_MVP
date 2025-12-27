import { api } from './client';
import type { Lead } from '../types/lead';

export async function fetchLeads(): Promise<Lead[]> {
  const res = await api.get<Lead[]>('/leads');
  return res.data;
}
