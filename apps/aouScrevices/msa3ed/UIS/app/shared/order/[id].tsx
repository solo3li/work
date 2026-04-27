import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { DUMMY_ORDERS } from '../../../constants/dummyData';
import { LinearGradient } from 'expo-linear-gradient';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const order = DUMMY_ORDERS.find(o => o.id === id) || DUMMY_ORDERS[0];

  const getStatusColor = (status: string) => {
    if (status === 'قيد التنفيذ') return Colors.warning;
    if (status === 'مكتمل') return Colors.success;
    if (status === 'ملغي') return Colors.error;
    return Colors.primary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>تفاصيل الطلب</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderId}>#{order.id}</Text>
            <View style={[styles.badge, { backgroundColor: getStatusColor(order.status) + '15' }]}>
              <Text style={[styles.badgeText, { color: getStatusColor(order.status) }]}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.serviceTitle}>{order.serviceTitle}</Text>
          <Text style={styles.date}>{order.date}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <Text style={styles.sectionTitle}>تفاصيل الدفع</Text>
          <View style={styles.row}>
            <Text style={styles.label}>المبلغ المدفوع</Text>
            <Text style={styles.value}>{order.price} ج.م</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>طريقة الدفع</Text>
            <Text style={styles.value}>البطاقة الائتمانية</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
          <Text style={styles.sectionTitle}>تتبع الطلب</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.timelineDotActive]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>تم استلام الطلب</Text>
                <Text style={styles.timelineDate}>2023-10-25 10:00 ص</Text>
              </View>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.timelineDotActive]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>قيد التنفيذ</Text>
                <Text style={styles.timelineDate}>2023-10-25 12:00 م</Text>
              </View>
            </View>
            <View style={styles.timelineLine} />
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: Colors.textSecondary }]}>بانتظار التسليم</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.chatBtn} onPress={() => router.push(`/shared/chat/new?orderId=${order.id}`)}>
          <Ionicons name="chatbubbles-outline" size={24} color={Colors.primary} />
          <Text style={styles.chatBtnText}>تواصل مع المنفذ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60,
    backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, zIndex: 10,
  },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: Colors.text },
  content: { padding: 24, paddingBottom: 100 },
  card: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: Colors.border,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  orderId: { fontSize: 16, fontWeight: 'bold', color: Colors.textSecondary },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 14, fontWeight: 'bold' },
  serviceTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text, marginBottom: 8 },
  date: { fontSize: 14, color: Colors.textSecondary },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  label: { fontSize: 16, color: Colors.textSecondary },
  value: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  timeline: { paddingLeft: 8 },
  timelineItem: { flexDirection: 'row', alignItems: 'flex-start' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.border, marginTop: 6 },
  timelineDotActive: { backgroundColor: Colors.primary },
  timelineContent: { marginLeft: 16 },
  timelineTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  timelineDate: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  timelineLine: { width: 2, height: 30, backgroundColor: Colors.border, marginLeft: 5, marginVertical: 4 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border },
  chatBtn: { flexDirection: 'row', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary + '15' },
  chatBtnText: { color: Colors.primary, fontSize: 18, fontWeight: 'bold', marginLeft: 8 },
});
