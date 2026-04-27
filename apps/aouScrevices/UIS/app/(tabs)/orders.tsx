import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import { DUMMY_ORDERS } from '../../constants/dummyData';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

export default function OrdersScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'قيد التنفيذ':
        return Colors.warning;
      case 'مكتمل':
        return Colors.success;
      case 'ملغي':
        return Colors.error;
      case 'بانتظار الرد':
        return Colors.primary;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'قيد التنفيذ': return 'time';
      case 'مكتمل': return 'checkmark-circle';
      case 'ملغي': return 'close-circle';
      case 'بانتظار الرد': return 'hourglass';
      default: return 'help-circle';
    }
  };

  const renderItem = ({ item, index }: any) => {
    const statusColor = getStatusColor(item.status);
    return (
      <Animated.View entering={FadeInDown.delay(index * 100)}>
        <Pressable style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <View style={styles.orderIdContainer}>
              <Ionicons name="receipt-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.orderId}>#{item.id}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
              <Ionicons name={getStatusIcon(item.status) as any} size={14} color={statusColor} style={{ marginLeft: 4 }} />
              <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
            </View>
          </View>
          
          <Text style={styles.serviceTitle}>{item.serviceTitle}</Text>
          
          <View style={styles.orderFooter}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.price}>{item.price} ج.م</Text>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>طلباتي</Text>
      </View>
      <FlatList
        data={DUMMY_ORDERS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: Colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },
  list: {
    padding: 24,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  orderId: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '700',
    marginLeft: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    lineHeight: 24,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderStyle: 'dashed',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
  },
});
