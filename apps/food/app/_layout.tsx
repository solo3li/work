import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="restaurant/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: 'modal', title: 'Cart' }} />
      </Stack>
    </CartProvider>
  );
}
