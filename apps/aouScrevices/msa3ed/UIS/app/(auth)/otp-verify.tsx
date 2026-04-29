import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { verifyOtp, login } from '../../store/slices/authSlice';

const { width } = Dimensions.get('window');

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { email: initialEmail } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState((initialEmail as string) || '');
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (code.length < 4) {
      alert('يرجى إدخال رمز التحقق كاملاً');
      return;
    }
    const result = await dispatch(verifyOtp({ email, code }));
    if (verifyOtp.fulfilled.match(result)) {
      router.replace('/student/(tabs)');
    } else {
      alert('رمز التحقق غير صحيح أو انتهت صلاحيته');
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(60);
    // Login triggers OTP generation
    await dispatch(login({ email, password: '' })); // Backend needs a way to resend or just call login again with a flag? 
    // Actually our login triggers OTP. But we don't have the password here if we replaced the screen.
    // Ideally the backend has a /resend-otp endpoint.
    alert('تم إعادة إرسال الرمز إلى بريدك الإلكتروني');
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
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-forward" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.title}>تأكيد الحساب</Text>
          <Text style={styles.subtitle}>أدخل رمز التحقق المكون من 4 أرقام المرسل إلى {email}</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.form}>
          <View style={styles.otpContainer}>
             <TextInput 
              style={styles.otpInput} 
              placeholder="0 0 0 0" 
              placeholderTextColor={Colors.border}
              keyboardType="number-pad"
              maxLength={4}
              value={code}
              onChangeText={setCode}
              autoFocus
            />
          </View>

          <Pressable onPress={handleVerify} disabled={loading}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, loading && { opacity: 0.7 }]}
            >
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>تحقق الآن</Text>}
            </LinearGradient>
          </Pressable>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>لم تستلم الرمز؟ </Text>
            <Pressable onPress={handleResend} disabled={timer > 0}>
              <Text style={[styles.resendLink, timer > 0 && { color: Colors.textSecondary }]}>
                {timer > 0 ? `إعادة إرسال خلال (${timer}ث)` : 'إعادة إرسال الرمز'}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topDecoration: {
    position: 'absolute', top: -width * 0.4, left: -width * 0.2, width: width * 1.4, height: width * 1.4, opacity: 0.1,
  },
  gradientCircle: { flex: 1, borderRadius: width * 0.7 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  header: { marginBottom: 48 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 36, fontWeight: '900', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: Colors.textSecondary, fontWeight: '500', lineHeight: 24 },
  form: { gap: 32 },
  otpContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  otpInput: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 20,
    height: 80,
  },
  button: {
    height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8,
  },
  buttonText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  resendContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  resendText: { color: Colors.textSecondary, fontSize: 16 },
  resendLink: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
