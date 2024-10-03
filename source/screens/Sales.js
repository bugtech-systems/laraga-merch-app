import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, FlatList, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS, icons } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const menuItems = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'Cash Transaction' },
  { id: 3, title: 'Inventory' },
  { id: 4, title: 'Purchases' },
  { id: 5, title: 'Users' },
  { id: 6, title: 'Logout' },
];

const accounts = [
  {
    id: 0,
    name: "Juan",
    total: 870,
    status: 'pay'
  },
  {
    id: 1,
    name: "Mark",
    total: 1200,
    status: 'pay'
  },
  {
    id: 2,
    name: "James",
    total: 5299,
    status: 'paid'
  },
  {
    id: 3,
    name: "Randy",
    total: 499,
    status: 'paid'
  },
]


const Sales = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  
  const showDatePicker = () => {
    setShow(true);
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

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

  function renderDatePicker() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', paddingLeft: 12, paddingRight: 12 }}>
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
                    {/* <Image
                        source={icons.printer}
                        style={{ height: 30, width: 30, tintColor: COLORS.white, }}
                    /> */}
                <Icon name="add" size={30} color={COLORS.white} />
                </View>
            </TouchableOpacity>
        </View>
    )
  }
  
  function renderSalesReport() {
    
    return (
      <View style={{ elevation: 10, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.success700, backgroundColor: COLORS.success700, marginLeft: 10, marginRight: 10, marginTop: 10, padding: 10}}>
        <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10}}>
            SALES
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10}}>
            300
          </Text>


        </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20}}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                NEW
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
                100
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: '400'}}>
              6,500.00
            </Text>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                REFILL
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400'}}>
                200
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: '400'}}>
              4,400.00
            </Text>
          </View>
      </View>
    )
    
  }
  
  function renderAccountsReport({item, index}) {
    
    return (
      <View style={{ elevation: 4, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.white3, backgroundColor: COLORS.white3, margin: 10, padding: 10}}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10, width: '60%'}}>
            {item.id + 1} - {item.name}
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10, width: '30%'}}>
            TOTAL: {Number(item.total).toFixed(2)} 
          </Text>
          <View style={{ backgroundColor: item.status == 'paid' ? null : COLORS.orange, width: '10%', borderRadius: 10}}>
          <Text style={{  textAlign: 'center', color: item.status == 'paid' ? COLORS.success700 : COLORS.white, fontWeight: 'bold'}}>
          {item.status == 'paid' ? '(PAID)' : 'PAY'}
          </Text>
          </View>


        </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20}}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                NEW
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: 'normal'}}>
                100
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: 'normal'}}>
              6,500.00
            </Text>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16}}>
                REFILL
              </Text>
              <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: 'normal'}}>
                200
              </Text>
            </View>
            <View style={{borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7}}/>
            <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: 'normal'}}>
              4,400.00
            </Text>
          </View>
      </View>
      
    )
  }
  
  const renderMenuItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectMenu(item.title)} style={styles.menuItem}>
        <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
);
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.gray400,
        justifyContent: 'flex-start',
      }}
    >
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
      <View style={styles.header}>
      <TouchableOpacity onPress={() =>       navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
                <Text style={styles.headerText}>Sales</Text>
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
            {renderSalesReport()}
            <FlatList 
              data={accounts}
              renderItem={renderAccountsReport}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              style={{ marginTop: 10}}
              />
              <View 
                style={{  
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: 10, 
                  backgroundColor: COLORS.transparent
                }}>
              <TouchableOpacity activeOpacity={.9} style={{ backgroundColor: 'rgb(8, 83, 136)', borderWidth: 1, borderRadius: 12, borderColor: 'rgb(8, 83, 136)',}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', padding: 10}}>
                  GENERATE DAILY INVENTORY REPORT
                </Text>
              </TouchableOpacity>
              </View>
            
    </SafeAreaView>
  )
}

export default Sales

const styles = StyleSheet.create({
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
  fontSize: 18,
  fontWeight: 'bold',
  color: COLORS.black,
},
dateText: {
  fontSize: 16,
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
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