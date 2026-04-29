import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { submitKyc } from '../../store/slices/kycSlice';

export default function KycSubmitScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.kyc);

  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async () => {
    if (!nationalId.trim() || !phone.trim()) {
      alert('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }
    
    try {
      await dispatch(submitKyc({ nationalId, phone })).unwrap();
      router.replace('/executor/kyc-status');
    } catch (err: any) {
      alert('حدث خطأ أثناء التقديم: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>تقديم بيانات KYC</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color={Colors.info} />
          <Text style={styles.infoText}>للعمل كمنفذ، نحتاج إلى التحقق من هويتك. يرجى إدخال بياناتك بدقة ورفع المستندات المطلوبة.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>الرقم القومي</Text>
          <TextInput 
            style={styles.input} 
            placeholder="أدخل الرقم القومي المكون من 14 رقم" 
            keyboardType="numeric"
            value={nationalId}
            onChangeText={setNationalId}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>صورة البطاقة (الوجه الأمامي)</Text>
          <Pressable style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={32} color={Colors.primary} />
            <Text style={styles.uploadText}>اضغط هنا لرفع الصورة</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>صورة البطاقة (الوجه الخلفي)</Text>
          <Pressable style={styles.uploadBox}>
            <Ionicons name="cloud-upload-outline" size={32} color={Colors.primary} />
            <Text style={styles.uploadText}>اضغط هنا لرفع الصورة</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>رقم الهاتف المسجل باسمك</Text>
          <TextInput 
            style={styles.input} 
            placeholder="01X XXX XXXX" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={handleSubmit} disabled={loading}>
          <LinearGradient colors={[Colors.primary, Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitBtn}>
            {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitBtnText}>إرسال للتقييم</Text>}
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, zIndex: 10 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: Colors.text },
  content: { padding: 24, paddingBottom: 100 },
  infoBox: { flexDirection: 'row', backgroundColor: Colors.info + '15', padding: 16, borderRadius: 12, marginBottom: 24 },
  infoText: { flex: 1, marginLeft: 12, fontSize: 14, color: Colors.text, lineHeight: 22 },
  section: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  input: { height: 56, backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 16, fontSize: 16, color: Colors.text, textAlign: 'right', borderWidth: 1, borderColor: Colors.border },
  uploadBox: { height: 120, backgroundColor: Colors.white, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.border, borderStyle: 'dashed' },
  uploadText: { fontSize: 14, color: Colors.primary, marginTop: 8, fontWeight: '500' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border },
  submitBtn: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  submitBtnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});
