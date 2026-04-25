import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar, Image } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from '../src/components/MapView';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard } from 'lucide-react-native';
import { userLocation, destinationLocation, rideOptions } from '../src/data/dummyData';

export default function RideOptions() {
  const router = useRouter();
  const [selectedRide, setSelectedRide] = useState(rideOptions[0].id);

  const selectedRideData = rideOptions.find(r => r.id === selectedRide);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={{
            latitude: (userLocation.latitude + destinationLocation.latitude) / 2,
            longitude: (userLocation.longitude + destinationLocation.longitude) / 2,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          <Marker coordinate={userLocation} title="Origin" />
          <Marker coordinate={destinationLocation} title="Destination" pinColor="blue" />
          <Polyline
            coordinates={[userLocation, destinationLocation]}
            strokeColor="#000"
            strokeWidth={3}
            lineDashPattern={[5, 5]}
          />
        </MapView>

        <SafeAreaView style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#000" size={24} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>Choose a ride, or swipe up for more</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.rideList}>
          {rideOptions.map((ride) => (
            <TouchableOpacity 
              key={ride.id} 
              style={[
                styles.rideItem, 
                selectedRide === ride.id && styles.rideItemActive
              ]}
              onPress={() => setSelectedRide(ride.id)}
            >
              <Image source={{ uri: ride.image }} style={styles.rideImage} />
              <View style={styles.rideDetails}>
                <Text style={styles.rideTitle}>{ride.title}</Text>
                <Text style={styles.rideEta}>{ride.eta}</Text>
              </View>
              <Text style={styles.ridePrice}>${(25.50 * ride.multiplier).toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.paymentRow}>
            <CreditCard color="#000" size={20} />
            <Text style={styles.paymentText}>Personal •••• 1234</Text>
          </View>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => router.push('/finding-driver')}
          >
            <Text style={styles.confirmButtonText}>Choose {selectedRideData?.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  sheetHeader: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  rideList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  rideItemActive: {
    backgroundColor: '#f8f8f8',
    borderColor: '#000',
    borderWidth: 2,
  },
  rideImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  rideDetails: {
    flex: 1,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  rideEta: {
    fontSize: 14,
    color: '#666',
  },
  ridePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
