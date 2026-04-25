import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from '../src/components/MapView';
import { useRouter } from 'expo-router';
import { Phone, MessageSquare, Shield, X } from 'lucide-react-native';
import { userLocation, destinationLocation, driverData } from '../src/data/dummyData';

export default function Trip() {
  const router = useRouter();

  // Simulated driver location slightly offset from user
  const driverLocation = {
    latitude: userLocation.latitude - 0.005,
    longitude: userLocation.longitude - 0.005,
  };

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
          <Marker coordinate={destinationLocation} title="Destination" pinColor="blue" />
          <Marker coordinate={driverLocation} title="Driver">
            <View style={styles.carMarker}>
              <Text style={{fontSize: 20}}>🚗</Text>
            </View>
          </Marker>
          <Polyline
            coordinates={[driverLocation, userLocation, destinationLocation]}
            strokeColor="#000"
            strokeWidth={4}
          />
        </MapView>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.tripStatus}>
          <Text style={styles.etaText}>Arriving in 3 mins</Text>
          <Text style={styles.dropoffText}>Dropoff at 10:45 AM</Text>
        </View>

        <View style={styles.driverInfo}>
          <View style={styles.driverProfile}>
            <Image source={{ uri: driverData.image }} style={styles.driverPhoto} />
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {driverData.rating}</Text>
            </View>
          </View>
          
          <View style={styles.carInfo}>
            <Text style={styles.plateText}>{driverData.plate}</Text>
            <Text style={styles.carText}>{driverData.car}</Text>
          </View>
          
          <View style={styles.driverNameContainer}>
            <Text style={styles.driverName}>{driverData.name}</Text>
            <Text style={styles.driverSubtext}>Knows your destination</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Shield color="#000" size={24} />
          </TouchableOpacity>
          <View style={styles.mainActions}>
            <TouchableOpacity style={styles.contactButton}>
              <MessageSquare color="#000" size={20} />
              <Text style={styles.contactText}>Any pickup notes?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.phoneButton}>
              <Phone color="#000" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        
        <SafeAreaView style={styles.footerSafeArea}>
           <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/')}>
              <X color="#d32f2f" size={20} />
              <Text style={styles.cancelButtonText}>Cancel Trip</Text>
           </TouchableOpacity>
        </SafeAreaView>
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
  carMarker: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  tripStatus: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  etaText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  dropoffText: {
    fontSize: 14,
    color: '#666',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  driverProfile: {
    position: 'relative',
    marginRight: 15,
  },
  driverPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  carInfo: {
    flex: 1,
  },
  plateText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  carText: {
    fontSize: 14,
    color: '#666',
  },
  driverNameContainer: {
    alignItems: 'flex-end',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  driverSubtext: {
    fontSize: 12,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  mainActions: {
    flex: 1,
    flexDirection: 'row',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  phoneButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerSafeArea: {
     marginTop: 10,
  },
  cancelButton: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     paddingVertical: 15,
  },
  cancelButtonText: {
     color: '#d32f2f',
     fontSize: 16,
     fontWeight: '600',
     marginLeft: 5,
  }
});
