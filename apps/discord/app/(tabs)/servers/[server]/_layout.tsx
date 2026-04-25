import { Slot, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import ChannelList from '../../../../components/ChannelList';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ServerLayout() {
  const { server } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <View style={styles.container}>
      {(!isMobile || showMobileSidebar) && (
        <View style={[styles.channelSidebar, isMobile && styles.mobileSidebar]}>
          <ChannelList serverId={server as string} onClose={isMobile ? () => setShowMobileSidebar(false) : undefined} />
        </View>
      )}
      
      <View style={styles.mainContent}>
        {isMobile && !showMobileSidebar && (
          <Pressable onPress={() => setShowMobileSidebar(true)} style={styles.menuOverlayButton}>
            <View style={styles.menuIconContainer}>
               <Ionicons name="menu" size={24} color={Colors.white} />
            </View>
          </Pressable>
        )}
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  channelSidebar: {
    width: 240,
    borderRightWidth: 1,
    borderRightColor: Colors.divider,
  },
  mobileSidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  menuOverlayButton: {
    position: 'absolute',
    top: 6,
    left: 10,
    zIndex: 50,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
