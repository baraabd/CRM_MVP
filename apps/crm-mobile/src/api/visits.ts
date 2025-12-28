import { api } from './client';
import type { Visit, VisitOutcome } from '../types/visit';

export type CreateVisitInput = {
  leadId: string;
  repUserId: string;

  checkInAt: string;
  checkInLat: number;
  checkInLng: number;

  checkOutAt: string;
  checkOutLat: number;
  checkOutLng: number;

  durationMinutes: number;
  outcomeResult: VisitOutcome;

  refusalReason?: string | null;

  formData?: {
    hasGBP?: boolean;
    hasWebsite?: boolean;
    notes?: string | null;
  };
};

export async function createVisit(input: CreateVisitInput): Promise<Visit> {
  const res = await api.post<Visit>('/visits', input);
  return res.data;
}

export async function fetchVisitsByLeadId(leadId: string): Promise<Visit[]> {
  const res = await api.get<Visit[]>('/visits', { params: { leadId } });
  return res.data;
}
