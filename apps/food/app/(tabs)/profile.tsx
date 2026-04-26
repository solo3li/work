import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const renderOption = (icon: keyof typeof Ionicons.glyphMap, title: string, subtitle?: string) => (
    <TouchableOpacity style={styles.optionContainer}>
      <View style={styles.optionIconContainer}>
        <Ionicons name={icon} size={24} color="#333" />
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80' }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#FF5A5F" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderOption('location-outline', 'Saved Addresses', 'Home, Work')}
        {renderOption('card-outline', 'Payment Methods', 'Visa ending in 4242')}
        {renderOption('notifications-outline', 'Notifications')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offers & Promos</Text>
        {renderOption('gift-outline', 'Vouchers & Offers')}
        {renderOption('star-outline', 'Loyalty Points', '1,250 points')}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>
        {renderOption('help-circle-outline', 'Help & Support')}
        {renderOption('information-circle-outline', 'About')}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#666',
    fontSize: 14,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#fff0f0',
    borderRadius: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  logoutButton: {
    margin: 20,
    marginBottom: 40,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffcccb',
  },
  logoutButtonText: {
    color: '#FF5A5F',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
