import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import { callsData } from '../../constants/DummyData';

export default function CallsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={callsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.callItem}>
            <Avatar url={item.user.avatar} isOnline={item.user.isOnline} size={50} />
            <View style={styles.callInfo}>
              <Text style={[styles.name, item.missed && styles.missedCall]}>{item.user.name}</Text>
              <View style={styles.typeRow}>
                <Ionicons
                  name={item.type === 'incoming' ? 'arrow-down' : 'arrow-up'}
                  size={14}
                  color={item.missed ? '#ff3b30' : '#65676b'}
                />
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.actionButtons}>
              <Ionicons name="call" size={24} color="#000" style={styles.actionIcon} />
              <Ionicons name="videocam" size={24} color="#000" />
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
  callItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  callInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  missedCall: {
    color: '#ff3b30',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 14,
    color: '#65676b',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 16,
  },
});
