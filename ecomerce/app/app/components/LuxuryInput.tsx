import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../theme';

interface LuxuryInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  error?: string;
}

export const LuxuryInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, error }: LuxuryInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.gray}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontFamily: FONTS.montserrat,
    fontSize: 10,
    letterSpacing: 1.5,
    color: COLORS.gray,
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
    paddingVertical: SPACING.sm,
    fontFamily: FONTS.montserrat,
    fontSize: 16,
    color: COLORS.black,
  },
  inputError: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.montserrat,
  },
});
