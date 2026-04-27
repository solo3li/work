import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward-outline" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>تأكيد وإتمام الطلب</Text>
        <View style={styles.backBtn} /> {/* Placeholder */}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.section}>
          <Text style={styles.sectionTitle}>تفاصيل الدفع</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>اسم الخدمة</Text>
              <Text style={styles.summaryValue}>تصميم عرض تقديمي</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>السعر الأساسي</Text>
              <Text style={styles.summaryValue}>150 ج.م</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>رسوم المنصة</Text>
              <Text style={styles.summaryValue}>15 ج.م</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>الخصم</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>0 ج.م</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>الإجمالي المطلوب</Text>
              <Text style={styles.totalValue}>165 ج.م</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
          <Text style={styles.sectionTitle}>كود الخصم</Text>
          <View style={styles.couponContainer}>
            <Ionicons name="ticket-outline" size={20} color={Colors.primary} style={styles.couponIcon} />
            <TextInput 
              style={styles.couponInput} 
              placeholder="أدخل كود الخصم (إن وجد)"
              placeholderTextColor={Colors.textSecondary}
            />
            <Pressable style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>تطبيق</Text>
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
          <Text style={styles.sectionTitle}>طريقة الدفع</Text>
          <Pressable style={[styles.paymentMethod, styles.activePayment]}>
            <View style={styles.paymentMethodLeft}>
              <View style={[styles.paymentIconContainer, { backgroundColor: Colors.primary + '15' }]}>
                <Ionicons name="card" size={24} color={Colors.primary} />
              </View>
              <Text style={styles.paymentText}>البطاقة الائتمانية (فيزا/ماستركارد)</Text>
            </View>
            <Ionicons name="checkmark-circle" size={28} color={Colors.primary} />
          </Pressable>
          
          <Pressable style={styles.paymentMethod}>
            <View style={styles.paymentMethodLeft}>
              <View style={[styles.paymentIconContainer, { backgroundColor: Colors.textSecondary + '15' }]}>
                <Ionicons name="wallet" size={24} color={Colors.textSecondary} />
              </View>
              <View>
                <Text style={styles.paymentText}>محفظة رصيد UIS</Text>
                <Text style={styles.paymentSubtext}>الرصيد المتاح: 450 ج.م</Text>
              </View>
            </View>
            <Ionicons name="ellipse-outline" size={28} color={Colors.border} />
          </Pressable>
        </Animated.View>

      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalText}>المبلغ النهائي</Text>
          <Text style={styles.footerTotalValue}>165 ج.م</Text>
        </View>
        <Pressable onPress={() => router.replace('/student/payment-result')}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payBtn}
          >
            <Text style={styles.payBtnText}>تأكيد ودفع</Text>
            <Ionicons name="shield-checkmark" size={20} color={Colors.white} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 60,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
  },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderStyle: 'dashed',
    marginBottom: 0,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 8,
    height: 64,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  couponIcon: {
    marginLeft: 12,
  },
  couponInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.text,
    textAlign: 'right',
  },
  applyBtn: {
    backgroundColor: Colors.text,
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  activePayment: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '05',
    borderWidth: 2,
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: 'bold',
  },
  paymentSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerTotalText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  footerTotalValue: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
  },
  payBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  payBtnText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
});
