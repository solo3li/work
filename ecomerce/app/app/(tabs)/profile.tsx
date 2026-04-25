import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../../theme';
import { LuxuryButton } from '../components/LuxuryButton';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

export default function ProfileScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.email?.[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>SECURITY</Text>
          <Text style={styles.infoValue}>
            2FA is {user?.is_2fa_enabled ? 'Enabled' : 'Disabled'}
          </Text>
        </View>

        <LuxuryButton 
          title="Logout" 
          onPress={handleLogout} 
          variant="outline"
          style={styles.logoutBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.xxl,
    alignItems: 'center',
    backgroundColor: COLORS.cream,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontFamily: FONTS.playfair,
    fontSize: 32,
    color: COLORS.white,
  },
  email: {
    fontFamily: FONTS.playfair,
    fontSize: 20,
    color: COLORS.black,
  },
  username: {
    fontFamily: FONTS.montserrat,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  content: {
    padding: SPACING.lg,
  },
  infoBox: {
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    marginBottom: SPACING.xl,
  },
  infoLabel: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.gray,
    marginBottom: 8,
    fontWeight: '600',
  },
  infoValue: {
    fontFamily: FONTS.montserrat,
    fontSize: 14,
    color: COLORS.black,
  },
  logoutBtn: {
    marginTop: SPACING.xl,
  },
});
