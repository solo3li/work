import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CURRENT_USER } from '../data/dummy';

export default function CreatePost() {
  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Image source={{ uri: CURRENT_USER.avatar }} style={styles.avatar} />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="What's on your mind?"
            style={styles.input}
            placeholderTextColor="#8F9296"
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="videocam" size={20} color="#F02849" />
          <Text style={styles.actionText}>Live</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="images" size={20} color="#45BD62" />
          <Text style={styles.actionText}>Photo</Text>
        </TouchableOpacity>
        <View style={styles.verticalDivider} />
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="location" size={20} color="#F5533D" />
          <Text style={styles.actionText}>Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E6EB',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginHorizontal: 15,
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#65676B',
    fontWeight: '500',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E4E6EB',
  },
});
