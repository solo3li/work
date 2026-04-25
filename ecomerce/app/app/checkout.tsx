import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LuxuryInput } from './components/LuxuryInput';
import { LuxuryButton } from './components/LuxuryButton';
import { COLORS, FONTS, SPACING } from '../theme';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { clearCart } from './store/cartSlice';
import { addOrder } from './store/shopSlice';

export default function CheckoutScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (!firstName || !lastName || !address || !postalCode || !city) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    // Simulating dummy order placement
    setTimeout(() => {
      dispatch(addOrder({
        first_name: firstName,
        last_name: lastName,
        address,
        postal_code: postalCode,
        city,
        items,
        total_cost: total
      }));
      
      dispatch(clearCart());
      setLoading(false);
      Alert.alert('Success', 'Your order has been placed', [
        { text: 'View Orders', onPress: () => router.replace('/(tabs)/orders') }
      ]);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shipping Details</Text>
      
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: SPACING.md }}>
          <LuxuryInput label="First Name" value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={{ flex: 1 }}>
          <LuxuryInput label="Last Name" value={lastName} onChangeText={setLastName} />
        </View>
      </View>

      <LuxuryInput label="Address" value={address} onChangeText={setAddress} />
      
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: SPACING.md }}>
          <LuxuryInput label="Postal Code" value={postalCode} onChangeText={setPostalCode} />
        </View>
        <View style={{ flex: 1 }}>
          <LuxuryInput label="City" value={city} onChangeText={setCity} />
        </View>
      </View>

      <LuxuryButton 
        title="Place Order" 
        onPress={handlePlaceOrder} 
        loading={loading}
        style={{ marginTop: SPACING.xl }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    flexGrow: 1,
  },
  title: {
    fontFamily: FONTS.playfair,
    fontSize: 24,
    color: COLORS.black,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
