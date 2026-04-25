import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LuxuryInput } from '../components/LuxuryInput';
import { LuxuryButton } from '../components/LuxuryButton';
import { COLORS, FONTS, SPACING } from '../../theme';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    
    // Simulating dummy login
    setTimeout(async () => {
      dispatch(login({ email }));
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Enter your details to continue</Text>
      </View>

      <View style={styles.form}>
        <LuxuryInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="example@luxury.com"
          keyboardType="email-address"
        />
        <LuxuryInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
        />
        
        <LuxuryButton 
          title="Login" 
          onPress={handleLogin} 
          loading={loading}
          style={{ marginTop: SPACING.lg }}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to LCwiki? </Text>
          <Text 
            style={styles.link} 
            onPress={() => router.push('/(auth)/register')}
          >
            Create account
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    marginBottom: SPACING.xxl,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.playfair,
    fontSize: 32,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.gray,
    letterSpacing: 1,
  },
  form: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.gray,
  },
  link: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: '600',
  },
});
