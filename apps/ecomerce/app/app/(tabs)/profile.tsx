import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useStore } from '../store/useStore';
import { useRouter } from 'expo-router';

export default function Profile() {
  const { user, login, register, logout } = useStore();
  const router = useRouter();
  
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!username.trim() || !password.trim()) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
    }
    
    setLoading(true);
    let success = false;
    
    if (isRegister) {
      success = await register(username.trim(), password.trim());
      if (!success) {
        Alert.alert('Error', 'Registration failed. Username might be taken.');
      }
    } else {
      success = await login(username.trim(), password.trim());
      if (!success) {
        Alert.alert('Error', 'Invalid username or password.');
      }
    }
    
    setLoading(false);
  };

  if (!user) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.loginCard}>
            <Text style={styles.title}>{isRegister ? 'Create Account' : 'Welcome Back'}</Text>
            <Text style={styles.subtitle}>
                {isRegister ? 'Join our e-commerce community today.' : 'Login to view your profile and orders.'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#adb5bd"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#adb5bd"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{isRegister ? 'Register' : 'Login'}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.switchButton} 
                onPress={() => setIsRegister(!isRegister)}
            >
                <Text style={styles.switchText}>
                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.username.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/orders')}
        >
          <Text style={styles.menuItemIcon}>📦</Text>
          <Text style={styles.menuItemText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={logout}>
          <Text style={styles.menuItemIcon}>🚪</Text>
          <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  loginCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
    color: '#212529',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f1f3f5',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#495057',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#212529',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#868e96',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#fa5252',
  },
});
