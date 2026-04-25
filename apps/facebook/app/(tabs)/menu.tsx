import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CURRENT_USER } from '../../data/dummy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();

  const MenuItem = ({ icon, color, title }: { icon: any, color: string, title: string }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={[styles.menuIconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="white" />
      </View>
      <Text style={styles.menuItemTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Menu</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.profileSection}>
          <Image source={{ uri: CURRENT_USER.avatar }} style={styles.profileAvatar} />
          <View>
            <Text style={styles.profileName}>{CURRENT_USER.name}</Text>
            <Text style={styles.profileSubtitle}>See your profile</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <MenuItem icon="people" color="#1877F2" title="Groups" />
            <MenuItem icon="time" color="#42B72A" title="Memories" />
          </View>
          <View style={styles.gridRow}>
            <MenuItem icon="bookmark" color="#A334E6" title="Saved" />
            <MenuItem icon="flag" color="#F5533D" title="Pages" />
          </View>
          <View style={styles.gridRow}>
            <MenuItem icon="calendar" color="#F02849" title="Events" />
            <MenuItem icon="briefcase" color="#E68523" title="Jobs" />
          </View>
        </View>

        <TouchableOpacity style={styles.seeMoreBtn}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.accordionItem}>
          <Ionicons name="help-circle" size={28} color="#65676B" />
          <Text style={styles.accordionText}>Help & Support</Text>
          <Ionicons name="chevron-down" size={24} color="#65676B" style={styles.accordionIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.accordionItem}>
          <Ionicons name="settings" size={28} color="#65676B" />
          <Text style={styles.accordionText}>Settings & Privacy</Text>
          <Ionicons name="chevron-down" size={24} color="#65676B" style={styles.accordionIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f1f2f6',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e4e6eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f1f2f6',
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#65676B',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E6EB',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  gridContainer: {
    paddingHorizontal: 10,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuItem: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  seeMoreBtn: {
    backgroundColor: '#e4e6eb',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  seeMoreText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  accordionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  accordionText: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 15,
    flex: 1,
  },
  accordionIcon: {
    marginLeft: 'auto',
  },
  logoutBtn: {
    backgroundColor: '#e4e6eb',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 15,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
