export type VisitOutcome = 'SUCCESS' | 'NO_ANSWER' | 'NOT_INTERESTED';

export type Visit = {
  id: string;
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
  createdAt: string;
};
