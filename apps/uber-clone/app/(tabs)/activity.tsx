import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { driverData } from '../../src/data/dummyData';

export default function Activity() {
  const pastTrips = [
    {
      id: 1,
      date: 'Today, 2:30 PM',
      price: '$12.50',
      address: '123 Main St, San Francisco',
      car: driverData.car,
    },
    {
      id: 2,
      date: 'Yesterday, 9:15 AM',
      price: '$24.00',
      address: 'San Francisco International Airport',
      car: 'Honda Prius',
    },
    {
      id: 3,
      date: 'Apr 20, 5:45 PM',
      price: '$8.20',
      address: 'Oakland City Center',
      car: 'Tesla Model 3',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Activity</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Past</Text>
        {pastTrips.map((trip) => (
          <View key={trip.id} style={styles.tripCard}>
            <View style={styles.tripIcon}>
              <Text style={{ fontSize: 24 }}>🚗</Text>
            </View>
            <View style={styles.tripDetails}>
              <Text style={styles.tripAddress} numberOfLines={1}>{trip.address}</Text>
              <Text style={styles.tripDate}>{trip.date}</Text>
            </View>
            <Text style={styles.tripPrice}>{trip.price}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 15,
  },
  tripIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tripDetails: {
    flex: 1,
    marginRight: 10,
  },
  tripAddress: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: '600',
  }
});
