import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { LIVE_MATCHES, PROMOTIONS, CASINO_GAMES, UPCOMING_MATCHES } from '../../constants/DummyData';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Profile Summary */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/profile' as any)}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>@ahmedsolo</Text>
        </TouchableOpacity>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>$1,250.50</Text>
          <TouchableOpacity style={styles.depositBtn}>
            <Text style={styles.depositText}>Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promotions Banner */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
        {PROMOTIONS.map((promo) => (
          <View key={promo.id} style={styles.promoCard}>
            <Text style={styles.promoTitle}>{promo.title}</Text>
            <Text style={styles.promoDesc}>{promo.description}</Text>
            <Text style={styles.promoCode}>Code: {promo.code}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Live Matches */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Matches</Text>
          <Ionicons name="ellipse" size={12} color={Colors.dark.danger} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {LIVE_MATCHES.map((match) => (
            <View key={match.id} style={styles.matchCard}>
              <View style={styles.matchTeams}>
                <Text style={styles.teamText}>{match.homeTeam}</Text>
                <Text style={styles.scoreText}>{match.score}</Text>
                <Text style={styles.teamText}>{match.awayTeam}</Text>
              </View>
              <Text style={styles.timeText}>{match.time}</Text>
              <View style={styles.oddsContainer}>
                <View style={styles.oddBox}><Text style={styles.oddText}>1: {match.odds.home}</Text></View>
                <View style={styles.oddBox}><Text style={styles.oddText}>X: {match.odds.draw || '-'}</Text></View>
                <View style={styles.oddBox}><Text style={styles.oddText}>2: {match.odds.away}</Text></View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recommended Casino Games */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Casino</Text>
        <View style={styles.casinoGrid}>
          {CASINO_GAMES.map((game) => (
            <View key={game.id} style={styles.casinoCard}>
              <Image source={{ uri: game.image }} style={styles.casinoImage} />
              <Text style={styles.casinoName}>{game.name}</Text>
              <Text style={styles.casinoType}>{game.type}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: Colors.dark.header },
  greeting: { color: Colors.dark.tabIconDefault, fontSize: 14 },
  username: { color: Colors.dark.text, fontSize: 18, fontWeight: 'bold' },
  balanceContainer: { alignItems: 'flex-end' },
  balance: { color: Colors.dark.tint, fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  depositBtn: { backgroundColor: Colors.dark.success, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 5 },
  depositText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  promoScroll: { padding: 20 },
  promoCard: { backgroundColor: Colors.dark.tint, padding: 20, borderRadius: 10, marginRight: 15, width: 280 },
  promoTitle: { color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  promoDesc: { color: '#000', fontSize: 14, opacity: 0.8, marginBottom: 10 },
  promoCode: { color: '#000', fontSize: 12, fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.3)', padding: 5, borderRadius: 4, alignSelf: 'flex-start' },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: Colors.dark.text, fontSize: 20, fontWeight: 'bold', marginRight: 10 },
  matchCard: { backgroundColor: Colors.dark.card, padding: 15, borderRadius: 10, marginRight: 15, width: 250, borderWidth: 1, borderColor: Colors.dark.border },
  matchTeams: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  teamText: { color: Colors.dark.text, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  scoreText: { color: Colors.dark.tint, fontWeight: 'bold', fontSize: 16, marginHorizontal: 10 },
  timeText: { color: Colors.dark.danger, textAlign: 'center', marginBottom: 10, fontSize: 12 },
  oddsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  oddBox: { backgroundColor: Colors.dark.background, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, flex: 1, marginHorizontal: 2, alignItems: 'center' },
  oddText: { color: Colors.dark.text, fontSize: 12 },
  casinoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  casinoCard: { width: '48%', backgroundColor: Colors.dark.card, borderRadius: 10, padding: 10, marginBottom: 15, alignItems: 'center' },
  casinoImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 10 },
  casinoName: { color: Colors.dark.text, fontWeight: 'bold', textAlign: 'center', fontSize: 14 },
  casinoType: { color: Colors.dark.tabIconDefault, fontSize: 12, marginTop: 5 },
});