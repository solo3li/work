import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const success = await login({ email, password });
    setLoading(false);
    if (success) {
      router.replace('/(auth)/otp-verify');
    } else {
      alert('فشل تسجيل الدخول. يرجى التأكد من البيانات.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.topDecoration}>
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCircle}
        />
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(800)} style={styles.header}>
          <Text style={styles.title}>تسجيل الدخول</Text>
          <Text style={styles.subtitle}>أهلاً بك مجدداً في UIS</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color={Colors.textSecondary} style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="البريد الإلكتروني" 
              placeholderTextColor={Colors.textSecondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={22} color={Colors.textSecondary} style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="كلمة المرور" 
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Ionicons name="eye-off-outline" size={22} color={Colors.textSecondary} style={styles.eyeIcon} />
          </View>

          <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
            <Text style={styles.forgotPassword}>نسيت كلمة المرور؟</Text>
          </Pressable>

          <Pressable onPress={handleLogin} style={{ marginTop: 8 }} disabled={loading}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.buttonText}>تسجيل الدخول</Text>
              )}
            </LinearGradient>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>أو سجل عبر</Text>
            <View style={styles.divider} />
          </View>

          <Pressable style={styles.googleButton}>
            <Ionicons name="logo-google" size={22} color={Colors.error} style={{ marginRight: 12 }} />
            <Text style={styles.googleButtonText}>حساب Google</Text>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>ليس لديك حساب؟ </Text>
            <Pressable onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>أنشئ حساباً جديداً</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topDecoration: { position: 'absolute', top: -width * 0.4, left: -width * 0.2, width: width * 1.4, height: width * 1.4, opacity: 0.1 },
  gradientCircle: { flex: 1, borderRadius: width * 0.7 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 48 },
  title: { fontSize: 40, fontWeight: '900', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 18, color: Colors.textSecondary, fontWeight: '500' },
  form: { gap: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 16, paddingHorizontal: 20, height: 64, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  icon: { marginRight: 16 },
  eyeIcon: { marginLeft: 16 },
  input: { flex: 1, fontSize: 16, color: Colors.text, textAlign: 'right' },
  forgotPassword: { color: Colors.primary, fontSize: 15, fontWeight: '700', textAlign: 'left' },
  rowButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
  button: { height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8 },
  buttonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  divider: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { marginHorizontal: 16, color: Colors.textSecondary, fontWeight: '500' },
  googleButton: { flexDirection: 'row', backgroundColor: Colors.white, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  googleButtonText: { color: Colors.text, fontSize: 18, fontWeight: '700' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  registerText: { color: Colors.textSecondary, fontSize: 16 },
  registerLink: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
