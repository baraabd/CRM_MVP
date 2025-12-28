// ✅ 1) navigation/types.ts
export type RootStackParamList = {
  Leads: undefined;
  LeadDetails: {
    leadId: string;
    businessName: string;
    // ✅ نضيف باراميتر اختياري لاستقبال الزيارة الجديدة
    newVisit?: import('../types/visit').Visit;
  };
  VisitCreate: { leadId: string; repUserId: string; businessName: string };
};
