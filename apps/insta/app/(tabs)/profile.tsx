import { View, Text, StyleSheet, Image, FlatList, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { POSTS, USERS } from '../../data/dummy';

const { width } = Dimensions.get('window');
const itemSize = width / 3;

const currentUser = USERS[0];
const myPosts = POSTS.filter(p => p.user.id === currentUser.id);

export default function ProfileScreen() {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <Ionicons name="lock-closed-outline" size={16} color="#000" />
          <Text style={styles.usernameHeader}>{currentUser.username}</Text>
          <Ionicons name="chevron-down" size={16} color="#000" />
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="add-square-outline" size={28} color="#000" style={styles.iconRight} />
          <Ionicons name="menu-outline" size={32} color="#000" />
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>845</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.name}>{currentUser.name}</Text>
        <Text style={styles.bio}>Photography & Travel 🌍📸{'\n'}Living my best life ✨</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <View style={[styles.tab, styles.activeTab]}>
          <Ionicons name="grid-outline" size={24} color="#000" />
        </View>
        <View style={styles.tab}>
          <Ionicons name="person-outline" size={24} color="#ccc" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[...myPosts, ...myPosts, ...myPosts, ...myPosts]} // Duplicate for grid visual
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.gridImage} />
        )}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRight: {
    marginRight: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#000',
  },
  bioContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  bio: {
    marginTop: 2,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 15,
    gap: 10,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  editBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  gridImage: {
    width: itemSize,
    height: itemSize,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
});
