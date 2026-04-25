import { Tabs } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import TabBarIcon from '../../components/TabBarIcon';

export default function TabLayout() {
  const activeColor = '#1877F2';
  const inactiveColor = '#65676B';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#e4e6eb',
          backgroundColor: '#ffffff',
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <MaterialIcons name={focused ? 'ondemand-video' : 'ondemand-video'} size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <Ionicons name={focused ? 'people' : 'people-outline'} size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <Ionicons name={focused ? 'storefront' : 'storefront-outline'} size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={28} color={color} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} color={color}>
              <Ionicons name={focused ? 'menu' : 'menu-outline'} size={32} color={color} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}