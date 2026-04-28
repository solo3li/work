import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

export default function OtpVerifyScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const handleVerify = () => {
    login({ id: '2', name: 'مستخدم جديد', email: 'new@uis.com', isExecutor: false });
    router.replace('/student/(tabs)');
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
          <Text style={styles.subtitle}>أدخل رمز التحقق المرسل إلى بريدك</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.form}>
          <View style={styles.otpContainer}>
            {[1, 2, 3, 4].map((_, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <Pressable onPress={handleVerify}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>تأكيد</Text>
            </LinearGradient>
          </Pressable>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>لم تستلم الرمز؟ </Text>
            <Pressable>
              <Text style={styles.resendLink}>إعادة إرسال</Text>
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
  subtitle: { fontSize: 16, color: Colors.textSecondary, fontWeight: '500' },
  form: { gap: 32 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  otpInput: {
    width: 60, height: 60, backgroundColor: Colors.white, borderRadius: 16, fontSize: 24, fontWeight: 'bold', color: Colors.text,
    borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
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
