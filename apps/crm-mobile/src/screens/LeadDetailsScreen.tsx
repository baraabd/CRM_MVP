// ✅ 3) screens/LeadDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { fetchLeadById } from '../api/leads';
import { fetchVisitsByLeadId } from '../api/visits';
import type { Lead } from '../types/lead';
import type { Visit } from '../types/visit';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'LeadDetails'>;

export default function LeadDetailsScreen({ route }: any) {
  const { leadId, businessName, newVisit } = route.params ?? {};
  const navigation = useNavigation<Nav>();

  const [lead, setLead] = useState<Lead | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const l = await fetchLeadById(leadId);
      setLead(l);

      const v = await fetchVisitsByLeadId(leadId);
      setVisits(Array.isArray(v) ? v : []);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Failed to load lead');
    } finally {
      setLoading(false);
    }
  }

  // ✅ تحميل أول مرة فقط
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  // ✅ إذا رجعنا من شاشة إنشاء الزيارة ومعنا newVisit: نحدث القائمة محلياً فقط
  useEffect(() => {
    if (!newVisit) return;

    setVisits((prev) => {
      // منع التكرار لو الشاشة أعادت رندر أو رجعنا مرة ثانية
      const exists = prev.some((x) => x.id === newVisit.id);
      if (exists) return prev;

      // ضعها أول القائمة (الأحدث)
      return [newVisit, ...prev];
    });

    // مهم: احذف newVisit من params حتى لا يتكرر الإضافة عند أي re-render
    navigation.setParams({ newVisit: undefined } as any);
  }, [newVisit, navigation]);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {error ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#FCA5A5',
            borderRadius: 12,
            padding: 12,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: '800' }}>Error</Text>
          <Text>{error}</Text>
        </View>
      ) : null}

      {lead ? (
        <>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 14,
              padding: 14,
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '800' }}>{lead.businessName}</Text>
            <Text style={{ marginTop: 6, color: '#374151' }}>
              {lead.city} • {lead.area}
            </Text>

            <Text style={{ marginTop: 10, color: '#111827', fontWeight: '700' }}>
              Contact
            </Text>
            <Text style={{ color: '#374151' }}>
              {lead.primaryName} • {lead.primaryPhone}
            </Text>
            <Text style={{ color: '#374151' }}>{lead.primaryEmail}</Text>

            <Text style={{ marginTop: 10, color: '#111827', fontWeight: '700' }}>
              Address
            </Text>
            <Text style={{ color: '#374151' }}>{lead.addressLine}</Text>
          </View>

          <Pressable
            onPress={() =>
              navigation.navigate('VisitCreate', {
                leadId: lead.id,
                repUserId: lead.ownerUserId,
                businessName: businessName ?? lead.businessName,
              })
            }
            style={({ pressed }) => ({
              marginTop: 12,
              padding: 14,
              borderRadius: 12,
              alignItems: 'center',
              backgroundColor: '#0F172A',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text style={{ color: '#fff', fontWeight: '800' }}>+ New Visit</Text>
          </Pressable>

          <View style={{ marginTop: 18 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', marginBottom: 10 }}>
              Visits
            </Text>

            {visits.length === 0 ? (
              <Text style={{ color: '#6B7280' }}>No visits yet.</Text>
            ) : (
              visits.map((v) => (
                <View
                  key={v.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 14,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: '800' }}>{v.outcomeResult}</Text>
                  <Text style={{ color: '#374151', marginTop: 4 }}>
                    Check-in: {new Date(v.checkInAt).toLocaleString()}
                  </Text>
                  <Text style={{ color: '#374151' }}>
                    Duration: {v.durationMinutes} min
                  </Text>
                  {v.formData?.notes ? (
                    <Text style={{ color: '#374151', marginTop: 6 }}>
                      Notes: {v.formData.notes}
                    </Text>
                  ) : null}
                </View>
              ))
            )}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}
