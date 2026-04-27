import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { SPORTS_CATEGORIES, UPCOMING_MATCHES } from '../../constants/DummyData';
import { Ionicons } from '@expo/vector-icons';

export default function SportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {SPORTS_CATEGORIES.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryBtn}>
            <Ionicons name={cat.icon as any} size={24} color={Colors.dark.tint} />
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Matches</Text>
        {UPCOMING_MATCHES.map((match) => (
          <View key={match.id} style={styles.matchRow}>
            <View style={styles.matchInfo}>
              <Text style={styles.matchTeams}>{match.homeTeam} vs {match.awayTeam}</Text>
              <Text style={styles.matchDate}>{match.date}</Text>
            </View>
            <View style={styles.oddsContainer}>
              <TouchableOpacity style={styles.oddBtn}><Text style={styles.oddText}>{match.odds.home}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.oddBtn}><Text style={styles.oddText}>{match.odds.draw || '-'}</Text></TouchableOpacity>
              <TouchableOpacity style={styles.oddBtn}><Text style={styles.oddText}>{match.odds.away}</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  categories: { padding: 20 },
  categoryBtn: { backgroundColor: Colors.dark.card, padding: 15, borderRadius: 10, marginRight: 15, alignItems: 'center', width: 100, borderWidth: 1, borderColor: Colors.dark.border },
  categoryText: { color: Colors.dark.text, marginTop: 10, fontWeight: 'bold' },
  section: { paddingHorizontal: 20, paddingBottom: 50 },
  sectionTitle: { color: Colors.dark.text, fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  matchRow: { backgroundColor: Colors.dark.card, padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: Colors.dark.border },
  matchInfo: { marginBottom: 15 },
  matchTeams: { color: Colors.dark.text, fontSize: 16, fontWeight: 'bold' },
  matchDate: { color: Colors.dark.tabIconDefault, fontSize: 12, marginTop: 5 },
  oddsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  oddBtn: { backgroundColor: Colors.dark.background, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  oddText: { color: Colors.dark.tint, fontWeight: 'bold' },
});