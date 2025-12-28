export type LeadStatus = 'NEW' | 'IN_PROGRESS' | 'WON' | 'LOST';

export type Lead = {
  id: string;
  businessName: string;
  sector: string;
  city: string;
  area: string;
  addressLine: string;
  primaryName: string;
  primaryPhone: string;
  primaryEmail: string;
  status: LeadStatus;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
};
