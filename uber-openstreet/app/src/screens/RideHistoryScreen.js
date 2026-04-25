import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, MapPin, ChevronRight } from 'lucide-react-native';

const MOCK_HISTORY = [
  {
    id: '1',
    date: 'Oct 24, 2023 • 10:30 AM',
    from: 'Downtown Central',
    to: 'Westside Mall',
    price: '$15.00',
    status: 'Completed',
  },
  {
    id: '2',
    date: 'Oct 22, 2023 • 08:15 PM',
    from: 'North Station',
    to: 'City Hospital',
    price: '$12.50',
    status: 'Completed',
  },
];

const RideHistoryScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Trips</Text>
      </View>

      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.dateContainer}>
                <Calendar size={14} color="#666" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.markers}>
                <View style={styles.dot} />
                <View style={styles.line} />
                <MapPin size={16} color="#007AFF" />
              </View>
              <View style={styles.locations}>
                <Text style={styles.locationText} numberOfLines={1}>{item.from}</Text>
                <Text style={styles.locationText} numberOfLines={1}>{item.to}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.statusText}>{item.status}</Text>
              <ChevronRight size={16} color="#ccc" />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  markers: {
    alignItems: 'center',
    width: 20,
    marginRight: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginTop: 4,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  locations: {
    flex: 1,
    justifyContent: 'space-between',
    height: 45,
  },
  locationText: {
    fontSize: 15,
    color: '#333',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 13,
    color: '#28a745',
    fontWeight: '600',
  },
});

export default RideHistoryScreen;
