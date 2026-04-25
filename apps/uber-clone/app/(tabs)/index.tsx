import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from '../../src/components/MapView';
import { useRouter } from 'expo-router';
import { Menu, Search, Clock, ChevronDown } from 'lucide-react-native';
import { userLocation, recentPlaces } from '../../src/data/dummyData';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        <Marker coordinate={userLocation} />
      </MapView>

      <SafeAreaView style={styles.header}>
        <View style={styles.menuButton}>
          <Menu color="#000" size={24} />
        </View>
      </SafeAreaView>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.greeting}>Good morning, Solo</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.searchBox}
          onPress={() => router.push('/search')}
        >
          <Search color="#000" size={20} />
          <Text style={styles.searchText}>Where to?</Text>
          <View style={styles.timeDropdown}>
            <Clock color="#000" size={14} />
            <Text style={styles.timeText}>Now</Text>
            <ChevronDown color="#000" size={14} />
          </View>
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.recentList}>
          {recentPlaces.map((place) => (
            <TouchableOpacity key={place.id} style={styles.recentItem} onPress={() => router.push('/search')}>
              <View style={styles.iconContainer}>
                <Clock color="#fff" size={20} />
              </View>
              <View style={styles.placeDetails}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress} numberOfLines={1}>{place.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  menuButton: {
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    maxHeight: '50%',
  },
  sheetHeader: {
    marginBottom: 15,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
  timeDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  timeText: {
    marginHorizontal: 4,
    fontWeight: '600',
    fontSize: 14,
  },
  recentList: {
    flex: 1,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  placeAddress: {
    fontSize: 14,
    color: '#666',
  },
});
