import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.serverBackground,
        borderTopColor: Colors.divider,
        // Hide the bottom tab bar on larger screens, as Discord uses a side navigation
        display: isMobile ? 'flex' : 'none',
      },
      tabBarActiveTintColor: Colors.white,
      tabBarInactiveTintColor: Colors.textMuted,
    }}>
      <Tabs.Screen 
        name="servers" 
        options={{
          title: 'Servers',
          tabBarIcon: ({ color }) => <Ionicons name="logo-discord" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="notifications" 
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'You',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}
