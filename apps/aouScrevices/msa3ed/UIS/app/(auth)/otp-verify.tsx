import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { verifyOtp } from '../../store/slices/authSlice';

const { width } = Dimensions.get('window');

export default function OtpVerifyScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    const result = await dispatch(verifyOtp({ email, code }));
    if (verifyOtp.fulfilled.match(result)) {
      router.replace('/student/(tabs)');
    } else {
      alert('رمز التحقق غير صحيح');
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
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-forward" size={24} color={Colors.text} />
          </Pressable>
          <Text style={styles.title}>تأكيد الحساب</Text>
          <Text style={styles.subtitle}>أدخل رمز التحقق المرسل إلى بريدك</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={22} color={Colors.textSecondary} style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="البريد الإلكتروني للتأكيد" 
              placeholderTextColor={Colors.textSecondary}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
             <Ionicons name="keypad-outline" size={22} color={Colors.textSecondary} style={styles.icon} />
             <TextInput 
              style={styles.input} 
              placeholder="رمز التحقق (1234)" 
              placeholderTextColor={Colors.textSecondary}
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          </View>

          <Pressable onPress={handleVerify} disabled={loading}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>تأكيد</Text>}
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
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 16, paddingHorizontal: 20, height: 64, borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  icon: { marginRight: 16 },
  input: { flex: 1, fontSize: 16, color: Colors.text, textAlign: 'right' },
  button: {
    height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8,
  },
  buttonText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  resendContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  resendText: { color: Colors.textSecondary, fontSize: 16 },
  resendLink: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
