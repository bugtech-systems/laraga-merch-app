// DashboardCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants';

const DashboardCard = ({ title, stats, onPress, onPressCard }) => {
  return (
    <TouchableOpacity onPress={() => onPressCard()} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title + ':' + ' ' } {300}</Text>
        {(title && onPress) && (
          <TouchableOpacity onPress={onPress}>
            <Icon name="add" size={20} color='#06416c' />
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    elevation: 10
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
  },
  statBox: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    // color: '#888',
    // borderWidth: 1,
    // width: '30%'
    color: COLORS.black,
    
  },
  statValue: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.black,

  },
});

export default DashboardCard;