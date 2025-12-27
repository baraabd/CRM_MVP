import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { fetchLeads } from './src/api/leads';
import type { Lead } from './src/types/lead';

export default function App() {
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

  useEffect(() => {
    void load();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    setError(null);
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
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 10 }}>Leads</Text>

      {error ? (
        <View style={{ padding: 10, borderWidth: 1, borderRadius: 8, marginBottom: 10 }}>
          <Text style={{ fontWeight: '700' }}>Error</Text>
          <Text>{error}</Text>
          <Text style={{ marginTop: 6 }}>
            Tip: On real Android phone use your PC IP (same Wi-Fi), not localhost.
          </Text>
        </View>
      ) : null}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderRadius: 10, padding: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.businessName}</Text>
            <Text>
              {item.city} - {item.area}
            </Text>
            <Text>
              {item.primaryName} • {item.primaryPhone}
            </Text>
            <Text style={{ marginTop: 6, fontWeight: '700' }}>{item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No leads yet. Create some in Swagger.</Text>}
      />
    </SafeAreaView>
  );
}
