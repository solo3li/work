import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useEffect } from 'react';
import { fetchMyTickets } from '../../../store/slices/ticketsSlice';

export default function TicketsScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { myTickets, loading } = useSelector((state: RootState) => state.tickets);

  useEffect(() => {
    dispatch(fetchMyTickets());
  }, [dispatch]);

  const getStatusColor = (status: string) => {
    return status === 'مفتوحة' || status === 'Open' ? Colors.success : Colors.textSecondary;
  };

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInDown.delay(index * 100)}>
      <Pressable style={styles.card} onPress={() => router.push(`/shared/support/ticket/${item.id}`)}>
        <View style={styles.cardHeader}>
          <Text style={styles.ticketId}>#{item.id}</Text>
          <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
            <Text style={[styles.badgeText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.subject}>{item.subject}</Text>
        
        <View style={styles.footer}>
          <View style={styles.dateInfo}>
            <Ionicons name="calendar-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.dateText}>{item.createdAt || item.date}</Text>
          </View>
          <Text style={styles.lastUpdate}>آخر تحديث: {item.updatedAt || item.lastUpdate || item.createdAt || item.date}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-forward" size={24} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>الدعم الفني والنزاعات</Text>
        <Pressable style={styles.addBtn} onPress={() => router.push('/shared/support/new-ticket')}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </Pressable>
      </View>

      {loading && myTickets.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={myTickets}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: Colors.textSecondary }}>لا توجد تذاكر حالياً</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60, backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2, zIndex: 10 },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-end' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: Colors.text },
  addBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start' },
  list: { padding: 24 },
  card: { backgroundColor: Colors.white, borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 2, borderWidth: 1, borderColor: Colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ticketId: { fontSize: 14, fontWeight: 'bold', color: Colors.textSecondary },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: 'bold' },
  subject: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 16, lineHeight: 24 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.border, borderStyle: 'dashed' },
  dateInfo: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 13, color: Colors.textSecondary, marginLeft: 4 },
  lastUpdate: { fontSize: 13, color: Colors.textSecondary },
});
