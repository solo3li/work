import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../theme';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Start directly with login for dummy data mode
    router.replace('/(auth)/login');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <ActivityIndicator size="large" color={COLORS.gold} />
    </View>
  );
}
