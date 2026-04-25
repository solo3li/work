import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="search" />
      <Stack.Screen name="ride-options" />
      <Stack.Screen name="finding-driver" />
      <Stack.Screen name="trip" />
    </Stack>
  );
}
