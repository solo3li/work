import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.tabIconDefault}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.tabIconDefault}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: Colors.dark.tint, marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: Colors.dark.card, color: Colors.dark.text, padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: Colors.dark.border },
  button: { backgroundColor: Colors.dark.tint, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  link: { color: Colors.dark.tint, textAlign: 'center', marginTop: 20 },
});