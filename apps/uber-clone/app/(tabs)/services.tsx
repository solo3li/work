import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { Car, Package, ShieldCheck, Box } from 'lucide-react-native';

export default function Services() {
  const services = [
    { id: 1, name: 'Ride', icon: Car },
    { id: 2, name: 'Package', icon: Package },
    { id: 3, name: 'Reserve', icon: ShieldCheck },
    { id: 4, name: 'Freight', icon: Box },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Services</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Go anywhere, get anything</Text>
        <View style={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <TouchableOpacity key={service.id} style={styles.card}>
                <Icon size={40} color="#000" />
                <Text style={styles.cardText}>{service.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  }
});
