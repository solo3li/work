import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import Animated, { FadeInDown, BounceIn } from 'react-native-reanimated';
import { Laugh } from 'lucide-react-native';

export default function Login() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (name.trim()) {
      dispatch(login(name));
    } else {
      alert("Hey! You need a funny name to enter!");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={BounceIn.delay(300)} style={styles.logoContainer}>
        <Laugh size={80} color="#FFD700" />
        <Text style={styles.title}>TO-DO-LA-LA</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500)} style={styles.card}>
        <Text style={styles.label}>What&apos;s your Secret Funny Name?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Sir Fluffernutter"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LET ME IN!</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF1493', // Deep Pink
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#00FFFF', // Cyan
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    borderWidth: 5,
    borderColor: '#000',
    elevation: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#32CD32', // Lime Green
    padding: 20,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#000',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
  },
});
