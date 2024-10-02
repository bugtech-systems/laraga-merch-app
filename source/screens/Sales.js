import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS, icons } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';


const accounts = [
  {
    id: 0,
    name: "Juan",
    total: 870,
    status: 'unpaid'
  },
  {
    id: 1,
    name: "Mark",
    total: 1200,
    status: 'unpaid'
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
  
  function renderAccountsReport({item}) {
    
    return (
      <View style={{ elevation: 10, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.white3, backgroundColor: COLORS.white3, margin: 10, padding: 10}}>
        <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10}}>
            {item.name}
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10}}>
            {item.total} {String(item.status).toUpperCase()}
          </Text>


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
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.gray400,
        justifyContent: 'flex-start',
      }}
    >
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
              />
            
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
dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EFEFEF',
},
dateText: {
    fontSize: 16,
},
})