import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EarningsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color={Colors.white} />
        </Pressable>
        <Text style={styles.headerTitle}>أرباحي</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <LinearGradient colors={[Colors.primary, Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>الرصيد المتاح للسحب</Text>
          <Text style={styles.balanceValue}>1,250.00 ج.م</Text>
          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.balanceSubLabel}>قيد الانتظار</Text>
              <Text style={styles.balanceSubValue}>300.00 ج.م</Text>
            </View>
            <Pressable style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>سحب الأرباح</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.sectionTitle}>آخر العمليات</Text>
        
        <View style={styles.transactionList}>
          {[
            { id: 1, title: 'إتمام طلب ORD-2023-001', amount: '+150.00', date: '25 أكتوبر 2023', type: 'in' },
            { id: 2, title: 'إتمام طلب ORD-2023-005', amount: '+120.00', date: '10 أكتوبر 2023', type: 'in' },
            { id: 3, title: 'سحب أرباح بنكي', amount: '-500.00', date: '01 أكتوبر 2023', type: 'out' },
          ].map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Ionicons name={item.type === 'in' ? 'arrow-down' : 'arrow-up'} size={20} color={item.type === 'in' ? Colors.success : Colors.error} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: item.type === 'in' ? Colors.success : Colors.text }]}>
                {item.amount} ج.م
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60, backgroundColor: Colors.primary },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: Colors.white },
  content: { padding: 24 },
  balanceCard: { borderRadius: 24, padding: 24, marginBottom: 32, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 8 },
  balanceValue: { color: Colors.white, fontSize: 36, fontWeight: '900', marginBottom: 24 },
  balanceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)', paddingTop: 16 },
  balanceSubLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  balanceSubValue: { color: Colors.white, fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  withdrawBtn: { backgroundColor: Colors.white, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  withdrawBtnText: { color: Colors.primary, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 16 },
  transactionList: { backgroundColor: Colors.white, borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  transactionIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  transactionInfo: { flex: 1 },
  transactionTitle: { fontSize: 15, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  transactionDate: { fontSize: 12, color: Colors.textSecondary },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
});
