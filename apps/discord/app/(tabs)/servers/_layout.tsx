import { Slot } from 'expo-router';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Colors } from '../../../constants/Colors';
import ServerList from '../../../components/ServerList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? insets.top : 0 }]}>
      <View style={[styles.serverSidebar, isMobile && styles.serverSidebarMobile]}>
        <ServerList />
      </View>
      <View style={styles.mainContent}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  serverSidebar: {
    width: 72,
    backgroundColor: Colors.serverBackground,
    borderRightWidth: 1,
    borderRightColor: Colors.divider,
    zIndex: 10,
  },
  serverSidebarMobile: {
    // If we want to hide it completely on mobile, we could. 
    // But Discord mobile shows server list when drawer is open.
    // For simplicity, we keep it visible, creating a compact layout.
    width: 72,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
});
