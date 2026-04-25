import { Tabs } from 'expo-router';
import { ShoppingBag, House, User, ClipboardList } from 'lucide-react-native';
import { COLORS, FONTS } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.gold,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.grayLight,
        height: 60,
        paddingBottom: 8,
      },
      tabBarLabelStyle: {
        fontFamily: FONTS.montserrat,
        fontSize: 10,
        fontWeight: '600',
      },
      headerStyle: {
        backgroundColor: COLORS.white,
      },
      headerTitleStyle: {
        fontFamily: FONTS.playfair,
        fontSize: 18,
        letterSpacing: 2,
      },
      headerTitleAlign: 'center',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'COLLECTION',
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
          headerTitle: 'LCWIKI',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'BAG',
          tabBarIcon: ({ color }) => <ShoppingBag size={24} color={color} />,
          headerTitle: 'YOUR BAG',
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'ORDERS',
          tabBarIcon: ({ color }) => <ClipboardList size={24} color={color} />,
          headerTitle: 'MY ORDERS',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          headerTitle: 'PROFILE',
        }}
      />
    </Tabs>
  );
}
