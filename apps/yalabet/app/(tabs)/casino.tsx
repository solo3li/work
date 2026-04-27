import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { CASINO_GAMES } from '../../constants/DummyData';
import { Ionicons } from '@expo/vector-icons';

export default function CasinoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Casino Lobby</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {CASINO_GAMES.map((game) => (
          <TouchableOpacity key={game.id} style={styles.gameCard}>
            <Image source={{ uri: game.image }} style={styles.gameImage} />
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameType}>{game.type}</Text>
          </TouchableOpacity>
        ))}
        {/* Duplicate for dummy scroll */}
        {CASINO_GAMES.map((game) => (
          <TouchableOpacity key={game.id + 'dup'} style={styles.gameCard}>
            <Image source={{ uri: game.image }} style={styles.gameImage} />
            <Text style={styles.gameName}>{game.name}</Text>
            <Text style={styles.gameType}>{game.type}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  title: { color: Colors.dark.text, fontSize: 24, fontWeight: 'bold' },
  searchBtn: { padding: 5 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  gameCard: { width: '48%', backgroundColor: Colors.dark.card, borderRadius: 10, padding: 10, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: Colors.dark.border },
  gameImage: { width: '100%', height: 120, borderRadius: 10, marginBottom: 10 },
  gameName: { color: Colors.dark.text, fontWeight: 'bold', textAlign: 'center', fontSize: 14 },
  gameType: { color: Colors.dark.tint, fontSize: 12, marginTop: 5 },
});