import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import LeadsScreen from '../screens/LeadsScreen';
import LeadDetailsScreen from '../screens/LeadDetailsScreen';
import VisitCreateScreen from '../screens/VisitCreateScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="Leads" component={LeadsScreen} options={{ title: 'Leads' }} />
      <Stack.Screen
        name="LeadDetails"
        component={LeadDetailsScreen}
        options={({ route }) => ({ title: route.params.businessName })}
      />
      <Stack.Screen
        name="VisitCreate"
        component={VisitCreateScreen}
        options={{ title: 'New Visit' }}
      />
    </Stack.Navigator>
  );
}
