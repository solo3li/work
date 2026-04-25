import { Tabs } from 'expo-router';
import { MessageSquare, Camera, Users, Play } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
        },
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={80} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: '#FFFC00', // Snapchat yellow
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Camera color={color} size={size + 8} />,
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="spotlight"
        options={{
          tabBarIcon: ({ color, size }) => <Play color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}