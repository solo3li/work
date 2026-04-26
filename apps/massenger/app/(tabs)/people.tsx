import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Avatar from '../../components/Avatar';
import { users } from '../../constants/DummyData';

export default function PeopleScreen() {
  const activeUsers = users.filter((u) => u.isOnline);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Now ({activeUsers.length})</Text>
      <FlatList
        data={activeUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <Avatar url={item.avatar} isOnline={item.isOnline} size={40} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.waveButton}>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 14,
    fontWeight: '600',
    color: '#65676b',
    padding: 16,
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  name: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  waveButton: {
    backgroundColor: '#f0f2f5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveEmoji: {
    fontSize: 18,
  },
});
