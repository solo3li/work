import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Clock, ArrowLeft } from 'lucide-react-native';

const PREDICTIONS = [
  { id: '1', name: 'Westside Mall', address: '123 Fashion Ave' },
  { id: '2', name: 'City Hospital', address: '456 Healthcare St' },
  { id: '3', name: 'Downtown Central', address: '789 Business Blvd' },
];

const SearchDestinationScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Destination</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Search destination..."
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      <FlatList
        data={PREDICTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.predictionItem}
            onPress={() => navigation.navigate('Main', { screen: 'HomeTab', params: { destination: item.name } })}
          >
            <View style={styles.iconCircle}>
              <MapPin size={20} color="#666" />
            </View>
            <View style={styles.itemText}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemAddress}>{item.address}</Text>
            </View>
            <Clock size={16} color="#ccc" />
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.listTitle}>Recent Places</Text>}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginHorizontal: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemText: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  itemAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default SearchDestinationScreen;
