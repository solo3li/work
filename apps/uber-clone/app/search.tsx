import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock } from 'lucide-react-native';
import { recentPlaces } from '../src/data/dummyData';

export default function Search() {
  const router = useRouter();
  const [destination, setDestination] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your ride</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.timeline}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.square} />
        </View>

        <View style={styles.inputs}>
          <View style={styles.inputBox}>
            <TextInput 
              style={styles.input} 
              placeholder="Current Location" 
              value="Current Location"
              editable={false}
            />
          </View>
          <View style={[styles.inputBox, styles.destinationBox]}>
            <TextInput 
              style={styles.input} 
              placeholder="Where to?" 
              autoFocus={true}
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.recentList}>
        <TouchableOpacity style={styles.recentItem} onPress={() => router.push('/ride-options')}>
          <View style={styles.iconContainerActive}>
            <MapPin color="#fff" size={20} />
          </View>
          <View style={styles.placeDetails}>
            <Text style={styles.placeName}>Set location on map</Text>
          </View>
        </TouchableOpacity>

        {recentPlaces.map((place) => (
          <TouchableOpacity key={place.id} style={styles.recentItem} onPress={() => router.push('/ride-options')}>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeline: {
    alignItems: 'center',
    marginRight: 15,
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: '#ccc',
    marginVertical: 4,
  },
  square: {
    width: 8,
    height: 8,
    backgroundColor: '#000',
  },
  inputs: {
    flex: 1,
  },
  inputBox: {
    backgroundColor: '#eee',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  destinationBox: {
    backgroundColor: '#e8f0fe',
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000',
  },
  recentList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconContainerActive: {
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
