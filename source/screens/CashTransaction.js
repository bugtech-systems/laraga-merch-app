import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS, icons } from '../constants';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const CashTransaction = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tabSelected, setTabSelected] = useState('');
  const [total, setTotal] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  
  const showDatePicker = () => {
    setShow(true);
  };

const cashTransactionsData = [
  {
    id: 0,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'James',
    amount: 500
  },
  {
    id: 1,
    type: 'disbursement',
    title: 'Fuel Expense',
    user: 'Pedro',
    amount: 500
  },
  {
    id: 2,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'Juan',
    amount: 500
  },
  {
    id: 3,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'Gina',
    amount: 500
  },
  {
    id: 4,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'Mark',
    amount: 500
  },
  {
    id: 5,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'Jeff',
    amount: 500
  },
  {
    id: 6,
    type: 'disbursement',
    title: 'Salary Expense',
    user: 'Dennis',
    amount: 500
  },
  {
    id: 7,
    type: 'collection',
    title: 'Payment',
    user: 'Mark',
    amount: 1200
  },
  {
    id: 8,
    type: 'collection',
    title: 'Payment',
    user: 'John',
    amount: 3500
  },
  {
    id: 7,
    type: 'collection',
    title: 'Payment',
    user: 'Raymund',
    amount: 1700
  },
]


  const menuItems = [
      { id: 1, title: 'Dashboard' },
      { id: 2, title: 'Cash Transaction' },
      { id: 3, title: 'Inventory Entries' },
      { id: 4, title: 'Payments Verification' },
      { id: 5, title: 'Summary Report' },
      { id: 6, title: 'Users' },
      { id: 7, title: 'Logout' },
  ];

  const toggleModal = () => {
      console.log('TAPPED OUTSIDE')
      setModalVisible(!isModalVisible);
  };

  const handleSelectMenu = async (name) => {
      toggleModal()
      navigation.navigate(name, {})
      console.log(name, "NAME")

      return
  }
  
  const handleSelectedTab = useCallback((selected) => {
      const filterData = cashTransactionsData.filter(item => {
        return item.type === selected;
      })
      console.log(selected, "selected")
      console.log(filterData, "filterData")
      setFilteredTransactions(filterData)
      setTabSelected(selected)
  }, [])

  const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectMenu(item.title)} style={styles.menuItem}>
        <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  function renderDatePicker() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', padding: 12 }}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={showDatePicker}
                style={{ width: '85%', borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 8, backgroundColor: COLORS.gray200, elevation: 8 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 8, width: '100%', padding: 5 }}>
                    <Text style={{ paddingLeft: 4, fontSize: 20, color: COLORS.black, fontWeight: '500' }}>{date == undefined || '' ? '' : moment(date).format('MM/DD/YYYY')}</Text>
                    <Image
                        source={icons.calendar}
                        style={{ height: 40, width: 40, tintColor: COLORS.black }}
                    />

                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
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
  
  
  function renderSelectedTabItems() {
    let total = 0
    return (
      <View style={{ height: '70%', alignSelf: 'center', width: '90%', padding: 10, borderWidth: 1.5, borderColor: COLORS.gray100, borderRadius: 8, backgroundColor: COLORS.gray200, elevation: 8, }}>
        <TouchableOpacity>
        <Icon name="close" size={24} color="#000" style={{ alignSelf: 'flex-end'}} />
        </TouchableOpacity>
        <View style={{ width: '100%', flexDirection: 'row', padding: 10}}>
        <Text style={{ width: '40%', fontSize: 16, textAlign: 'left'}}>
          Type
        </Text>
        <Text style={{ width: '30%', fontSize: 16, textAlign: 'left'}}>
          User
        </Text>
        <Text style={{ width: '30%', fontSize: 16, textAlign: 'right'}}>
          Amount
        </Text>
        </View>
        {
          filteredTransactions.map(item => {
            let amountPerItem = item?.amount
            total += amountPerItem;
          return (
            <View style={{ flexDirection: 'row',  width: '100%', padding: 10}}>
              <Text style={{ width: '40%', color: COLORS.black, fontSize: 18, fontWeight: '500'}}>
                {item?.title}
              </Text>
              <Text style={{ width: '30%', color: COLORS.black, textAlign: 'left', fontSize: 18, fontWeight: '500'}}>
                {item?.user}
              </Text>
              <Text style={{ width: '30%', color: COLORS.black, textAlign: 'right', fontSize: 18, fontWeight: '500'}}>
                {item?.amount?.toFixed(2)}
              </Text>
            </View>
          )})
        } 
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end',}}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: "center", justifyContent: 'space-between',}}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.black}}>
          Total
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.black}}>
          {total?.toFixed(2)}
        </Text>
          </View>
        </View>
      </View>
    )

  }
  
  useEffect(() => {
    handleSelectedTab('disbursement')
  }, [])
  
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: COLORS.gray400,
        // alignItems: 'center',
        justifyContent: 'space-between',
  
      }}>
      {/* <Text>CashTransaction</Text> */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
                <Text style={styles.headerText}>Cash Transaction</Text>
                <TouchableOpacity onPress={toggleModal}>
                    <Icon name="menu" size={30} color="#000" />
                </TouchableOpacity>
            </View>
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
      {renderSelectedTabItems()}
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
      <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center',}}>
        <TouchableOpacity 
          onPress={() => handleSelectedTab('disbursement')}
          style={{ width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
        >
            {tabSelected === 'disbursement' ? 
              <Icon name="check-box" size={24} color="#000" />
            : 
              <Icon name="check-box-outline-blank" size={24} color="#000" />
            }
            <Text style={{ fontSize: 22, color: "#000"}}>
              Disbursements
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelectedTab('collection')}
          style={{ width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
        >
          {tabSelected === 'collection' ? 
              <Icon name="check-box" size={24} color="#000" />
            : 
              <Icon name="check-box-outline-blank" size={24} color="#000" />
          }
          <Text style={{ fontSize: 22, color: "#000"}}>
            Collections
          </Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default CashTransaction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 10,
    backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: .5, shadowOpacity: .5, shadowColor: COLORS.black, marginBottom: 10
},
headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
},
dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EFEFEF',
},
dateText: {
    fontSize: 16,
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.208)',
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
})