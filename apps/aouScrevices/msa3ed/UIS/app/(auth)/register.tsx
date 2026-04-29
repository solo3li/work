import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { register } from '../../store/slices/authSlice';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    setLoading(true);
    const result = await dispatch(register({ fullName, email, password }));
    setLoading(false);
    if (register.fulfilled.match(result)) {
      alert('تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.');
      router.replace('/(auth)/login');
    } else {
      alert('فشل إنشاء الحساب: ' + (result.payload || 'خطأ غير معروف'));
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
          <Text style={styles.title}>إنشاء حساب</Text>
          <Text style={styles.subtitle}>سجل الآن وابدأ رحلتك معنا</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={22} color={Colors.textSecondary} style={styles.icon} />
            <TextInput 
              style={styles.input} 
              placeholder="الاسم الكامل" 
              placeholderTextColor={Colors.textSecondary}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          <Pressable onPress={handleRegister} disabled={loading}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>تسجيل</Text>}
            </LinearGradient>
          </Pressable>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>لديك حساب بالفعل؟ </Text>
            <Pressable onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.registerLink}>تسجيل الدخول</Text>
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
  header: { marginBottom: 32 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 36, fontWeight: '900', color: Colors.text, marginBottom: 8 },
  subtitle: { fontSize: 18, color: Colors.textSecondary, fontWeight: '500' },
  form: { gap: 20 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 16, paddingHorizontal: 20, height: 64,
    borderWidth: 1, borderColor: Colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  icon: { marginRight: 16 },
  eyeIcon: { marginLeft: 16 },
  input: { flex: 1, fontSize: 16, color: Colors.text, textAlign: 'right' },
  button: {
    height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginTop: 8,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 8,
  },
  buttonText: { color: Colors.white, fontSize: 20, fontWeight: 'bold' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  registerText: { color: Colors.textSecondary, fontSize: 16 },
  registerLink: { color: Colors.primary, fontSize: 16, fontWeight: 'bold' },
});
