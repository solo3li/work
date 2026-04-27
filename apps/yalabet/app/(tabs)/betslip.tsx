import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function BetSlipScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bet Slip</Text>
        <TouchableOpacity>
          <Text style={styles.clearBtn}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.slipList}>
        <View style={styles.betItem}>
          <View style={styles.betInfo}>
            <Text style={styles.betTitle}>Real Madrid to Win</Text>
            <Text style={styles.betMatch}>Real Madrid vs Barcelona</Text>
            <Text style={styles.betOdds}>1.5</Text>
          </View>
          <TouchableOpacity style={styles.removeBtn}>
            <Ionicons name="close-circle" size={24} color={Colors.dark.tabIconDefault} />
          </TouchableOpacity>
        </View>

        <View style={styles.betItem}>
          <View style={styles.betInfo}>
            <Text style={styles.betTitle}>Lakers +4.5</Text>
            <Text style={styles.betMatch}>Lakers vs Warriors</Text>
            <Text style={styles.betOdds}>1.8</Text>
          </View>
          <TouchableOpacity style={styles.removeBtn}>
            <Ionicons name="close-circle" size={24} color={Colors.dark.tabIconDefault} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total Odds</Text>
          <Text style={styles.summaryValue}>2.7</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Stake</Text>
          <Text style={styles.summaryValue}>$ 50.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Potential Win</Text>
          <Text style={styles.winValue}>$ 135.00</Text>
        </View>
        <TouchableOpacity style={styles.placeBetBtn}>
          <Text style={styles.placeBetText}>Place Bet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: Colors.dark.border },
  title: { color: Colors.dark.text, fontSize: 20, fontWeight: 'bold' },
  clearBtn: { color: Colors.dark.danger, fontSize: 14 },
  slipList: { padding: 20 },
  betItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.dark.card, padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: Colors.dark.border },
  betInfo: { flex: 1 },
  betTitle: { color: Colors.dark.text, fontWeight: 'bold', fontSize: 16 },
  betMatch: { color: Colors.dark.tabIconDefault, fontSize: 12, marginTop: 5 },
  betOdds: { color: Colors.dark.tint, fontWeight: 'bold', marginTop: 10, fontSize: 16 },
  removeBtn: { padding: 5 },
  footer: { padding: 20, backgroundColor: Colors.dark.header, borderTopWidth: 1, borderTopColor: Colors.dark.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryText: { color: Colors.dark.tabIconDefault, fontSize: 16 },
  summaryValue: { color: Colors.dark.text, fontSize: 16, fontWeight: 'bold' },
  winValue: { color: Colors.dark.success, fontSize: 18, fontWeight: 'bold' },
  placeBetBtn: { backgroundColor: Colors.dark.tint, padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 15 },
  placeBetText: { color: '#000', fontWeight: 'bold', fontSize: 18 },
});