// ✅ 2) screens/VisitCreateScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { createVisit } from '../api/visits';
import type { VisitOutcome, Visit } from '../types/visit';

export default function VisitCreateScreen({ route, navigation }: any) {
  const { leadId, repUserId, businessName } = route.params;

  const nowIso = useMemo(() => new Date().toISOString(), []);
  const defaultOutIso = useMemo(
    () => new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    []
  );

  const [checkInAt, setCheckInAt] = useState(nowIso);
  const [checkOutAt, setCheckOutAt] = useState(defaultOutIso);

  const [checkInLat, setCheckInLat] = useState('24.7136');
  const [checkInLng, setCheckInLng] = useState('46.6753');
  const [checkOutLat, setCheckOutLat] = useState('24.7136');
  const [checkOutLng, setCheckOutLng] = useState('46.6753');

  const [durationMinutes, setDurationMinutes] = useState('20');
  const [outcomeResult, setOutcomeResult] = useState<VisitOutcome>('SUCCESS');

  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onCreate() {
    setSubmitting(true);
    setError(null);

    try {
      // ✅ نلتقط الزيارة الجديدة من API
      const created: Visit = await createVisit({
        leadId,
        repUserId,

        checkInAt,
        checkInLat: Number(checkInLat),
        checkInLng: Number(checkInLng),

        checkOutAt,
        checkOutLat: Number(checkOutLat),
        checkOutLng: Number(checkOutLng),

        durationMinutes: Number(durationMinutes),
        outcomeResult,

        formData: {
          notes: notes.trim() ? notes.trim() : null,
          hasGBP: false,
          hasWebsite: false,
        },
      });

      // ✅ مرّر الزيارة الجديدة للشاشة السابقة بدون refetch
      navigation.navigate('LeadDetails', {
        leadId,
        repUserId,
        businessName,
        newVisit: created,
      });

      // أو إذا تحب الرجوع للأعلى بس لازم تتأكد LeadDetails تستقبلها:
      // navigation.goBack();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Create visit failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: '800', marginBottom: 6 }}>Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        textAlignVertical="top"
        style={{
          borderWidth: 1,
          borderColor: '#E5E7EB',
          padding: 12,
          borderRadius: 12,
          height: 120,
          backgroundColor: '#fff',
        }}
      />

      <View style={{ marginTop: 14 }}>
        <Text style={{ fontWeight: '800', marginBottom: 6 }}>Check-in (ISO)</Text>
        <TextInput
          value={checkInAt}
          onChangeText={setCheckInAt}
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 10,
            borderRadius: 12,
          }}
        />

        <Text style={{ fontWeight: '800', marginTop: 12, marginBottom: 6 }}>
          Check-out (ISO)
        </Text>
        <TextInput
          value={checkOutAt}
          onChangeText={setCheckOutAt}
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 10,
            borderRadius: 12,
          }}
        />

        <Text style={{ fontWeight: '800', marginTop: 12, marginBottom: 6 }}>
          Duration Minutes
        </Text>
        <TextInput
          value={durationMinutes}
          onChangeText={setDurationMinutes}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 10,
            borderRadius: 12,
          }}
        />

        <Text style={{ fontWeight: '800', marginTop: 12, marginBottom: 6 }}>
          Outcome
        </Text>
        <TextInput
          value={outcomeResult}
          onChangeText={(v) => setOutcomeResult(v as VisitOutcome)}
          placeholder="SUCCESS | NO_ANSWER | NOT_INTERESTED"
          style={{
            borderWidth: 1,
            borderColor: '#E5E7EB',
            padding: 10,
            borderRadius: 12,
          }}
        />
      </View>

      {error ? (
        <View
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#FCA5A5',
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontWeight: '800' }}>Error</Text>
          <Text>{String(error)}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={onCreate}
        disabled={submitting}
        style={({ pressed }) => ({
          marginTop: 16,
          padding: 14,
          borderRadius: 12,
          alignItems: 'center',
          backgroundColor: '#0F172A',
          opacity: submitting || pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ color: '#fff', fontWeight: '800' }}>
          {submitting ? 'Creating...' : 'Create Visit'}
        </Text>
      </Pressable>
    </View>
  );
}
