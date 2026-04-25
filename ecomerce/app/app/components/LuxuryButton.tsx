import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../../theme';

interface LuxuryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  style?: any;
}

export const LuxuryButton = ({ title, onPress, variant = 'primary', loading, style }: LuxuryButtonProps) => {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primary : styles.outline,
        style
      ]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.black} />
      ) : (
        <Text style={[styles.text, { color: isPrimary ? COLORS.white : COLORS.black }]}>
          {title.toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: 2,
  },
  primary: {
    backgroundColor: COLORS.black,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  text: {
    fontFamily: FONTS.montserrat,
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 2,
  },
});
