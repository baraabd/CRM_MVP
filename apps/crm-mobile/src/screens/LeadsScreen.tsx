import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { fetchLeads } from '../api/leads';
import type { Lead } from '../types/lead';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Leads'>;

function LeadCard({ item, onPress }: { item: Lead; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 14,
        padding: 14,
        backgroundColor: '#fff',
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={{ fontSize: 16, fontWeight: '800', marginBottom: 6 }}>{item.businessName}</Text>
      <Text style={{ color: '#374151' }}>{item.city} • {item.area}</Text>
      <Text style={{ color: '#374151', marginTop: 4 }}>{item.primaryName} • {item.primaryPhone}</Text>

      {/* تم حذف status من قائمة Leads حسب طلبك */}
    </Pressable>
  );
}

export default function LeadsScreen() {
  const navigation = useNavigation<Nav>();

  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const leads = await fetchLeads();
      setData(leads);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function onRefresh() {
    setRefreshing(true);
    try {
      const leads = await fetchLeads();
      setData(leads);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to refresh leads');
    } finally {
      setRefreshing(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading leads...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      {error ? (
        <View style={{ padding: 12, borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: '800', marginBottom: 4 }}>Error</Text>
          <Text>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <LeadCard
            item={item}
            onPress={() =>
              navigation.navigate('LeadDetails', { leadId: item.id, businessName: item.businessName })
            }
          />
        )}
        ListEmptyComponent={<Text>No leads yet. Create some in Swagger.</Text>}
      />
    </SafeAreaView>
  );
}
