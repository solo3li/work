import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../store/slices/authSlice';
import { Car, User, MapPin, Navigation as NavIcon } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation, route }) => {
  const role = useSelector((state) => state.auth.role);
  const availableRides = useSelector((state) => state.rides?.availableRides || []);
  const dispatch = useDispatch();
  const selectedDestination = route.params?.destination;

  const region = useMemo(() => ({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }), []);

  return (
    <View style={styles.container}>
      {/* Map View with OpenStreetMap Tiles */}
      <MapView 
        style={styles.map} 
        initialRegion={region}
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
          canReplacePrimaryLayer={true}
        />
        {Array.isArray(availableRides) && availableRides.map((ride) => (
          <Marker
            key={ride.id}
            coordinate={ride.coordinates}
            title={ride.pickup}
            description={`Offer: $${ride.offerPrice}`}
          />
        ))}
      </MapView>

      {/* Role Switcher Overlay */}
      <View style={styles.roleOverlay}>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'RIDER' && styles.activeRole]} 
          onPress={() => dispatch(setRole('RIDER'))}
        >
          <User size={20} color={role === 'RIDER' ? '#fff' : '#666'} />
          <Text style={[styles.roleText, role === 'RIDER' && styles.activeRoleText]}>Passenger</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.roleButton, role === 'DRIVER' && styles.activeRole]} 
          onPress={() => dispatch(setRole('DRIVER'))}
        >
          <Car size={20} color={role === 'DRIVER' ? '#fff' : '#666'} />
          <Text style={[styles.roleText, role === 'DRIVER' && styles.activeRoleText]}>Driver</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet UI */}
      <View style={styles.bottomSheet}>
        {role === 'RIDER' ? (
          <View style={styles.riderUI}>
            <Text style={styles.sheetTitle}>Where to?</Text>
            <TouchableOpacity style={styles.inputDummy} onPress={() => navigation.navigate('Search')}>
              <MapPin size={20} color="#007AFF" />
              <Text style={styles.inputText}>Current Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputDummy} onPress={() => navigation.navigate('Search')}>
              <NavIcon size={20} color="#666" />
              <Text style={styles.inputText}>{selectedDestination || 'Enter Destination'}</Text>
            </TouchableOpacity>
            {selectedDestination && (
              <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Request for $15.00</Text>
              </TouchableOpacity>
            )}
            {!selectedDestination && (
              <TouchableOpacity style={[styles.mainButton, { backgroundColor: '#ccc' }]} disabled>
                <Text style={styles.mainButtonText}>Request Ride</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.driverUI}>
            <Text style={styles.sheetTitle}>Available Requests</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {Array.isArray(availableRides) && availableRides.map((ride) => (
                <View key={ride.id} style={styles.rideCard}>
                  <View style={styles.rideInfo}>
                    <Text style={styles.rideRider}>{ride.rider}</Text>
                    <Text style={styles.rideRoute}>{ride.pickup} ➔ {ride.destination}</Text>
                  </View>
                  <View style={styles.rideOffer}>
                    <Text style={styles.offerText}>${ride.offerPrice}</Text>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptButtonText}>Offer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  roleOverlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 21,
    gap: 8,
  },
  activeRole: {
    backgroundColor: '#007AFF',
  },
  roleText: {
    fontWeight: '600',
    color: '#666',
  },
  activeRoleText: {
    color: '#fff',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: height * 0.4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  inputDummy: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  inputText: {
    color: '#666',
    fontSize: 16,
  },
  mainButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rideCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  rideInfo: {
    flex: 1,
  },
  rideRider: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  rideRoute: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  rideOffer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  offerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  acceptButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HomeScreen;
