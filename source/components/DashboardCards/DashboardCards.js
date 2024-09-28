// DashboardCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardCard = ({ title, stats, onPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {onPress && (
          <TouchableOpacity onPress={onPress}>
            <Icon name="plus-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.row}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Icon name={stat.icon} size={30} color="#000" />
            <Text style={styles.statText}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#888',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardCard;