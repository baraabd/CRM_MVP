export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'WON'
  | 'LOST';

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

  createdAt: string; // ISO
  updatedAt: string; // ISO
};
