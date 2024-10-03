import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, Modal, FlatList, TouchableWithoutFeedback, } from 'react-native'
import { DashboardCard } from '../components/DashboardCards/DashboardCards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, icons } from '../constants';
import moment from 'moment';


const menuItems = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'Cash Transaction' },
  { id: 3, title: 'Inventory' },
  { id: 4, title: 'Purchases' },
  { id: 5, title: 'Users' },
  { id: 6, title: 'Logout' },
];
const Purchase = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

    const [purchaseData, setPurchaseData] = useState([
        { id: 1, batch: 1, cans: 500, total: '5,000.00', avgAge: '6 days' },
        { id: 2, batch: 2, cans: 300, total: '3,000.00', avgAge: '3 days' },
        // Add more purchases data if needed
    ]);
    
    const showDatePicker = () => {
      setShow(true);
  };
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  const toggleModal = () => {
    console.log('TAPPED OUTSIDE')
    setModalVisible(!isModalVisible);
};

  // Function to handle closing dropdown when pressing outside
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  
  const handleSelectMenu = async (name) => {
    toggleModal()
    navigation.navigate(name, {})
    console.log(name, "NAME")

    return
}
  
const renderMenuItem = ({ item }) => (
  <TouchableOpacity onPress={() => handleSelectMenu(item.title)} style={styles.menuItem}>
      <Text style={styles.menuItemText}>{item.title}</Text>
  </TouchableOpacity>
);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
};
    
    function renderDatePicker() {
      return (
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start',}}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '42%', padding: 12 }}>
              <TouchableOpacity
                  activeOpacity={.8}
                  onPress={showDatePicker}
                  style={{ width: '100%', borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 8, backgroundColor: COLORS.gray200, elevation: 8 }}
              >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 8, width: '100%', padding: 5 }}>
                      <Text style={{ paddingLeft: 4, fontSize: 16, color: COLORS.black, fontWeight: '500' }}>{date == undefined || '' ? '' : moment(date).format('MM/DD/YYYY')}</Text>
                      <Image
                          source={icons.calendar}
                          style={{ height: 40, width: 40, tintColor: COLORS.black }}
                      />

                  </View>
              </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '42%', padding: 12 }}>
          <TouchableOpacity
              activeOpacity={.8}
              onPress={showDatePicker}
              style={{ width: '100%', borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 8, backgroundColor: COLORS.gray200, elevation: 8 }}
          >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 8, width: '100%', padding: 5 }}>
                  <Text style={{ paddingLeft: 4, fontSize: 16, color: COLORS.black, fontWeight: '500' }}>{date == undefined || '' ? '' : moment(date).format('MM/DD/YYYY')}</Text>
                  <Image
                      source={icons.calendar}
                      style={{ height: 40, width: 40, tintColor: COLORS.black }}
                  />

              </View>
          </TouchableOpacity>
          
          {/* <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
              onPress={() => console.log('Pressed Printer!')}>
              <View style={{ padding: 10, alignItems: 'center', borderWidth: 1, justifyContent: 'center', backgroundColor: '#0a5388', borderColor: '#0a5388', borderRadius: 10, width: '100%' }}>
                  <Image
                      source={icons.printer}
                      style={{ height: 30, width: 30, tintColor: COLORS.white, }}
                  />
              </View>
          </TouchableOpacity> */}
      </View>
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '14%' }}
                  onPress={() => console.log('Pressed Printer!')}>
                  <View style={{ padding: 10, alignItems: 'center', borderWidth: 1, justifyContent: 'center', backgroundColor: '#0a5388', borderColor: '#0a5388', borderRadius: 10, width: '100%' }}>
                      <Image
                          source={icons.printer}
                          style={{ height: 30, width: 30, tintColor: COLORS.white, }}
                      />
                  </View>
              </TouchableOpacity>
      </View>

      )
  }

    const renderPurchaseItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Batch {item.batch}</Text>
            <View style={styles.stats}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Cans</Text>
                    <Text style={styles.statValue}>{item.cans}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Total</Text>
                    <Text style={styles.statValue}>${item.total}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Ave. Age</Text>
                    <Text style={styles.statValue}>{item.avgAge}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} onPress={() => navigation.goBack()} />
                <Text style={styles.headerTitle}>Purchases</Text>
                <TouchableOpacity onPress={() => toggleModal()}>
                    <Icon name="menu" size={30} />
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>            
                <View style={styles.modalOverlay}>
                    <View style={{ ...styles.modalContent, alignSelf: 'flex-end' }}>
                        <FlatList
                            data={menuItems}
                            renderItem={renderMenuItem}
                            keyExtractor={item => item.id}
                        />
                        <Text style={styles.versionText}>v1.03.14.24.02</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
            {renderDatePicker()}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    maximumDate={new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <FlatList
                data={purchaseData}
                renderItem={renderPurchaseItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.purchaseList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
    width: '50%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    height: '50%',
    // left: 30
    bottom: '20%'
    // alignItems: 'center',
},
menuItem: {
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    textAlign: 'left',
    alignItems: 'flex-start',
    width: '100%',
},
menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
},
versionText: {
    marginTop: 10,
    color: '#888',
    fontSize: 12,
},
    purchaseList: {
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Purchase;