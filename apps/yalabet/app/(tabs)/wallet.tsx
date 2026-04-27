import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { TRANSACTIONS, USER_PROFILE } from '../../constants/DummyData';
import { Ionicons } from '@expo/vector-icons';

export default function WalletScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceValue}>$ {USER_PROFILE.balance.toFixed(2)}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.dark.success }]}>
            <Ionicons name="arrow-down-circle" size={20} color="#fff" />
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: Colors.dark.danger }]}>
            <Ionicons name="arrow-up-circle" size={20} color="#fff" />
            <Text style={styles.actionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {TRANSACTIONS.map((tx) => (
          <View key={tx.id} style={styles.txItem}>
            <View style={styles.txIconContainer}>
              <Ionicons 
                name={tx.amount > 0 ? "arrow-down" : "arrow-up"} 
                size={20} 
                color={tx.amount > 0 ? Colors.dark.success : Colors.dark.danger} 
              />
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txType}>{tx.type}</Text>
              <Text style={styles.txDate}>{tx.date} • {tx.status}</Text>
            </View>
            <Text style={[styles.txAmount, { color: tx.amount > 0 ? Colors.dark.success : Colors.dark.text }]}>
              {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.currency}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  balanceCard: { backgroundColor: Colors.dark.card, margin: 20, padding: 20, borderRadius: 15, alignItems: 'center', borderWidth: 1, borderColor: Colors.dark.tint },
  balanceLabel: { color: Colors.dark.tabIconDefault, fontSize: 16 },
  balanceValue: { color: Colors.dark.tint, fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  actionButtons: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-between', width: '100%' },
  actionBtn: { flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, marginHorizontal: 5 },
  actionText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  section: { padding: 20 },
  sectionTitle: { color: Colors.dark.text, fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  txItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.dark.card, padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: Colors.dark.border },
  txIconContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.dark.background, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  txInfo: { flex: 1 },
  txType: { color: Colors.dark.text, fontWeight: 'bold', fontSize: 16 },
  txDate: { color: Colors.dark.tabIconDefault, fontSize: 12, marginTop: 5 },
  txAmount: { fontWeight: 'bold', fontSize: 16 },
});