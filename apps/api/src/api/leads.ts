import { api } from '../client';

export type Lead = {
  id: string;
  businessName: string;
  sector: string;
  city: string;
  area: string;
  addressLine: string;
  primaryName: string;
  primaryPhone: string;
  primaryEmail?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchLeads(): Promise<Lead[]> {
  const res = await api.get<Lead[]>('/v1/leads');
  return res.data;
}
