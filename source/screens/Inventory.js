import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Modal, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS, icons } from '../constants';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Inventory = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
//   const [tabSelected, setTabSelected] = useState('');
//   const [total, setTotal] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  
  const showDatePicker = () => {
    setShow(true);
  };

const inventoryEntriesData = [
  {
    id: 0,
    title: 'Bad Order',
    qty: 60,
    type: 'cans',
    amount: 3250
  },
  {
    id: 1,
    title: 'Available Stocks',
    type: 'cans',
    qty: 50,
    amount: 3250
  },
]

const summaryCards = [
  {
    id: 0, 
    title: "SOLD NEW CANS",
    OUT: 100,
  },
  {
    id: 1, 
    title: "EMPTY CANS",
    OWN: 150,
    OTHER: 50
  },
  {
    id: 2, 
    title: "BAD ORDERS (B.O)",
    QTY: 50,
  },
  {
    id: 3, 
    title: "AVAILABLE STOCKS",
    QTY: 150,
  },
]


  const menuItems = [
      { id: 1, title: 'Dashboard' },
      { id: 2, title: 'Cash Transaction' },
      { id: 3, title: 'Inventory' },
      { id: 4, title: 'Purchases' },
      { id: 5, title: 'Users' },
      { id: 6, title: 'Logout' },
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
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', padding: 10 }}>
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
                    <Icon name="print" size={30} color={COLORS.white}/>
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
          Qty
        </Text>
        <Text style={{ width: '30%', fontSize: 16, textAlign: 'right'}}>
          Amount
        </Text>
        </View>
        {
          inventoryEntriesData.map(item => {
            let amountPerItem = item?.amount
            total += amountPerItem;
          return (
            <View style={{ flexDirection: 'row',  width: '100%', padding: 10}}>
              <Text style={{ width: '40%', color: COLORS.black, fontSize: 18, fontWeight: '500'}}>
                {item?.title}
              </Text>
              <Text style={{ width: '30%', color: COLORS.black, textAlign: 'left', fontSize: 18, fontWeight: '500'}}>
                {`${item?.qty + " " + item.type}`}
              </Text>
              <Text style={{ width: '30%', color: COLORS.black, textAlign: 'right', fontSize: 18, fontWeight: '500'}}>
                {item?.amount?.toFixed(2)}
              </Text>
            </View>
          )})
        } 
        {/* <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end',}}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: "center", justifyContent: 'space-between',}}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.black}}>
          Total
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLORS.black}}>
          {total?.toFixed(2)}
        </Text>
          </View>
        </View> */}
      </View>
    )

  }
  
  function renderInventoryReport() {
    
    return (
      <View style={{ elevation: 10, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.success700, backgroundColor: COLORS.success700, marginLeft: 10, marginRight: 10, marginTop: 10, padding: 10}}>
        <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10}}>
            Inventory
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10}}>
            Total Crates: 14
          </Text>


        </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20}}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                OUT
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
                100
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                EMPTY
              </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
              200
            </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                B.O
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
                50
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                STOCKS
              </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
              150
            </Text>
            </View>
          </View>
      </View>
    )
    
  }
  
  function renderSummaryReport({item, index}) {
    
    return (
      <View style={{ elevation: 4, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderRadius: 22, borderColor: COLORS.white3, backgroundColor: COLORS.white3, margin: 10, maxHeight: 160}}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10, width: '60%'}}>
            {item.title}
          </Text>


        </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20}}>
            <View style={{ flexDirection: 'column', height: 50, justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                {item.title !== 'SOLD NEW CANS' ? null :  'OUT' }
              </Text>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
                {item.title !== 'SOLD NEW CANS' ? null :  item.OUT }
              </Text>
              
            </View>
            {/* </View> */}
          </View>
      </View>
      
    )
  }
  
  useEffect(() => {
    // handleSelectedTab('disbursement')
  }, [])
  
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: COLORS.gray400,
        // alignItems: 'center',
        justifyContent: 'flex-start',
  
      }}>
      {/* <Text>CashTransaction</Text> */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
                <Text style={styles.headerText}>Inventory</Text>
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
      {/* {renderSelectedTabItems()} */}
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
            {renderInventoryReport()}
            <FlatList 
              data={summaryCards}
              renderItem={renderSummaryReport}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              style={{ marginTop: 10}}
              />
      {/* <View style={{ flex: 1, flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center',}}>
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
      </View> */}
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', margin: 10, width: '100%'}}>
        <TouchableOpacity style={{ width: '80%', alignItems: 'center', padding: 10, height: 46, borderWidth: .5, borderColor: '#0a5388', backgroundColor: '#0a5388', borderRadius: 10 }}>
          <Text style={{ fontSize: 16, color: COLORS.white, fontWeight: 'bold'}}>GENERATE DAILY SUMMARY REPORT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Inventory

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