import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

export default function KycStatusScreen() {
  const router = useRouter();
  const { updateUser } = useAuth();

  const handleSimulateApproval = () => {
    updateUser({ isExecutor: true });
    alert('تم قبول طلبك بنجاح في هذه النسخة التجريبية!');
    router.replace('/student/(tabs)/executor-orders');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.replace('/student/(tabs)/profile')}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>حالة طلب KYC</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="time" size={80} color={Colors.warning} />
        </View>
        <Text style={styles.title}>طلبك قيد المراجعة</Text>
        <Text style={styles.description}>
          شكراً لك، لقد تم استلام بياناتك بنجاح. يقوم فريقنا حالياً بمراجعتها وسنقوم بإعلامك بالنتيجة في أقرب وقت ممكن.
        </Text>

        {/* Dummy button to simulate approval */}
        <Pressable onPress={handleSimulateApproval} style={{ marginTop: 24, padding: 12, backgroundColor: Colors.success + '20', borderRadius: 12 }}>
          <Text style={{ color: Colors.success, fontWeight: 'bold' }}>[اختبار] محاكاة قبول الطلب</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={() => router.replace('/student/(tabs)')}>
          <LinearGradient colors={[Colors.primary, Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
            <Text style={styles.btnText}>العودة للرئيسية</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: Colors.text },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  iconContainer: { width: 140, height: 140, borderRadius: 70, backgroundColor: Colors.warning + '15', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.text, marginBottom: 12 },
  description: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', lineHeight: 26 },
  footer: { padding: 24, paddingBottom: 48 },
  btn: { height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});
