import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, FlatList, Modal, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { COLORS, icons } from '../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';


const paymentStatus = [
  {
    id: 0, 
    title: 'Paid'
  },
  {
    id: 1, 
    title: 'Unpaid'
  },
]

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


const SalesEntry = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [peddler, setPeddler] = useState('');
  const [paymentVal, setPaymentVal] = useState('');
  // const [paymentStatus, setPaymentStatus] = useState('');
  const [isPeddlerDropdownOpen, setPeddlerDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [newCansCount, setNewCansCount] = useState(0);
  const [refillOwnBrandCount, setRefillOwnBrandCount] = useState(0);
  const [refillOtherBrandCount, setRefillOtherBrandCount] = useState(0);
  
  const showDatePicker = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  
  const handlePeddler = (val) => {
    if (val == 'Add new +') {
      Alert.alert('Create Modal for New Peddler with fields \n Peddler Name: \n Description')
    }
    setPeddler(val)
    closePeddlerDropdown()
  }
  
  const handlePayment = (val) => {
    if (val == 'Add new +') {
      Alert.alert('Create Modal for New Peddler with fields \n Peddler Name: \n Description')
    }
    setPaymentVal(val)
    closePaymentDropdown()
  }

  const togglePeddlerDropdown = () => {
    setPeddlerDropdownOpen(!isPeddlerDropdownOpen);
  };
  
  const togglePaymentStatus = (val) => {
    setPaymentDropdownOpen(!isPaymentDropdownOpen);
  };
  
  const closePeddlerDropdown = () => {
    setPeddlerDropdownOpen(false);
  };
  
  const closePaymentDropdown = () => {
    setPaymentDropdownOpen(false);
  };

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
      <View style={{ elevation: 10, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.success700, backgroundColor: COLORS.success700, marginLeft: 10, marginRight: 10, marginTop: 10, padding: 10 }}>
        <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10 }}>
            SALES
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10 }}>
            300
          </Text>


        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20 }}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>
              NEW
            </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
              100
            </Text>
          </View>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: '400' }}>
            6,500.00
          </Text>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>
              REFILL
            </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: '400' }}>
              200
            </Text>
          </View>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: '400' }}>
            4,400.00
          </Text>
        </View>
      </View>
    )

  }

  function renderAccountsReport({ item, index }) {

    return (
      <View style={{ elevation: 4, shadowOpacity: 1, shadowColor: COLORS.black, flexDirection: 'column', borderWidth: 1, borderRadius: 22, borderColor: COLORS.white3, backgroundColor: COLORS.white3, margin: 10, padding: 10 }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16, padding: 10, width: '60%' }}>
            {item.id + 1} - {item.name}
          </Text>
          <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 14, padding: 10, width: '30%' }}>
            TOTAL: {Number(item.total).toFixed(2)}
          </Text>
          <View style={{ backgroundColor: item.status == 'paid' ? null : COLORS.orange, width: '10%', borderRadius: 10 }}>
            <Text style={{ textAlign: 'center', color: item.status == 'paid' ? COLORS.success700 : COLORS.white, fontWeight: 'bold' }}>
              {item.status == 'paid' ? '(PAID)' : 'PAY'}
            </Text>
          </View>


        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: COLORS.white, justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 20 }}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>
              NEW
            </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: 'normal' }}>
              100
            </Text>
          </View>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: 'normal' }}>
            6,500.00
          </Text>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: COLORS.black, fontWeight: 'bold', fontSize: 16 }}>
              REFILL
            </Text>
            <Text style={{ color: COLORS.black, textAlign: 'center', fontSize: 14, fontWeight: 'normal' }}>
              200
            </Text>
          </View>
          <View style={{ borderWidth: .5, height: '100%', borderColor: COLORS.white, backgroundColor: COLORS.white, opacity: .7 }} />
          <Text style={{ color: COLORS.black, textAlign: 'right', fontSize: 14, fontWeight: 'normal' }}>
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
        backgroundColor: COLORS.lightGray1,
        justifyContent: 'flex-start',
      }}
    >
      <View style={{ padding: 16, backgroundColor: COLORS.white, height: '90%', margin: 10, borderRadius: 22, flexDirection: 'column', alignItems: 'flex-start' }}>
        <View style={{ alignItems: 'flex-end', width: '100%' }}>
          <Icon onPress={() => navigation.goBack()} name="close" size={26} color="#000" />
        </View>
        <View style={{ flexDirection: 'column', width: "100%", padding: 10, justifyContent: 'space-around'}}>
        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: '600' }}>
          Peddler:
        </Text>
        <TouchableOpacity onPress={togglePeddlerDropdown} style={{ borderWidth: 1, height: 40, borderRadius: 12 }}>
          <Text style={{ fontSize: 18, color: COLORS.black, textAlign: 'left', padding: 6 }}>
            {peddler !== '' ? peddler : null}
          </Text>
        </TouchableOpacity>

        {
          isPeddlerDropdownOpen ?
            <FlatList
              data={[...accounts, {title: 'new', name: 'Add new +'}]}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => handlePeddler(item.name)} style={{ padding: 8, backgroundColor: COLORS.transparent, width: "100%", borderBottomWidth: accounts.length - index ?  .3 : 0}}>
                  <Text style={{ fontSize: 16, color: item.title === 'new' ? COLORS.darkgray : COLORS.black, padding: 4 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.id}
              style={{
                position: 'absolute',
                marginBottom: 5,
                width: '100%',
                left: 10,
                zIndex: 2,
                top: 70,
                maxHeight: 200, // Limits the dropdown height
                backgroundColor: COLORS.white,
                // borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 22,
              }}
            />
            :
            null
        }
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', marginTop: 40}}>
        <Text style={{ fontSize: 18, padding: 10, color: COLORS.black, fontWeight: '600', textAlign: 'left', width: '50%' }}>
          Item type:
        </Text>
        <Text style={{ fontSize: 18, padding: 10, color: COLORS.black, fontWeight: '600', textAlign: 'right', width: '50%'}}>
          Quantity:
        </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
        <View style={{ justifyContent: 'center',  width: '60%', left: 30 }}>
          <Text style={{ color: COLORS.black, fontWeight: '400', padding: 10, fontSize: 16, textAlign: 'left',}}>New Cans:</Text>
          <Text style={{ color: COLORS.black, fontWeight: '400', padding: 10, fontSize: 16, textAlign: 'left'}}>Refill - Own Brand:</Text>
          <Text style={{ color: COLORS.black, fontWeight: '400', padding: 10, fontSize: 16, textAlign: 'left'}}>Refill - Other Brand:</Text>

        </View>
        <View style={{ width: '30%', justifyContent: 'center', alignItems: 'flex-end'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 6}}>
          <TouchableOpacity onPress={() => setNewCansCount(newCansCount -1)}>
            <Text style={{ fontSize: 22, color: COLORS.black}}>
            -
            </Text>
          </TouchableOpacity>
            {/* {count} */}
           <View style={{ borderWidth: 1,  borderRadius: 6, height: 30, marginRight: 10, marginLeft: 10, width: 50, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{ color: COLORS.black900, fontSize: 12}}>
            {newCansCount}
            </Text>
           </View>
          <TouchableOpacity onPress={() => setNewCansCount(newCansCount +1)}>
            <Text style={{ fontSize: 22, color: COLORS.black}}>
              +
            </Text>
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 6}}>
          <TouchableOpacity onPress={() => setRefillOwnBrandCount(refillOwnBrandCount -1)}>
            <Text style={{ fontSize: 22, color: COLORS.black}}>
            -
            </Text>
          </TouchableOpacity>
            {/* {count} */}
           <View style={{ borderWidth: 1,  borderRadius: 6, height: 30, marginRight: 10, marginLeft: 10, width: 50, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{ color: COLORS.black900, fontSize: 12}}>
            {refillOwnBrandCount}
            </Text>
           </View>
          <TouchableOpacity onPress={() => setRefillOwnBrandCount(refillOwnBrandCount +1)}>
            <Text style={{ fontSize: 22, color: COLORS.black}}>
              +
            </Text>
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 6}}>
          <TouchableOpacity onPress={() => setRefillOtherBrandCount(refillOtherBrandCount -1)}>
          <Text style={{ fontSize: 22, color: COLORS.black}}>
          -
          </Text>
          </TouchableOpacity>
            {/* {count} */}
           <View style={{ borderWidth: 1,  borderRadius: 6, height: 30, marginRight: 10, marginLeft: 10, width: 50, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{ color: COLORS.black900, fontSize: 12}}>
           {refillOtherBrandCount}
            </Text>
           </View>
          <TouchableOpacity onPress={() => setRefillOtherBrandCount(refillOtherBrandCount +1)}>
            <Text style={{ fontSize: 22, color: COLORS.black}}>
              +
            </Text>
          </TouchableOpacity>
          </View>

        </View>
        </View>
        </View>
        <View style={{ flexDirection: 'column', width: "100%", padding: 10, justifyContent: 'space-around'}}>
<Text style={{ fontSize: 18, color: COLORS.black, fontWeight: '600' }}>
          Payment Status:
        </Text>
        <TouchableOpacity onPress={togglePaymentStatus} style={{ borderWidth: 1, height: 40, borderRadius: 12 }}>
          <Text style={{ fontSize: 18, color: COLORS.black, textAlign: 'left', padding: 6 }}>
            {paymentVal !== '' ? paymentVal : null}
          </Text>
        </TouchableOpacity>

        {
          isPaymentDropdownOpen ?
            <FlatList
              data={paymentStatus}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={() => handlePayment(item.title)} style={{ padding: 8, backgroundColor: COLORS.transparent, width: "100%", borderBottomWidth: paymentStatus.length - index ?  .3 : 0}}>
                  <Text style={{ fontSize: 16, color: COLORS.black, padding: 4 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.id}
              style={{
                position: 'absolute',
                marginBottom: 5,
                width: '100%',
                left: 10,
                zIndex: 2,
                top: 70,
                maxHeight: 200, // Limits the dropdown height
                backgroundColor: COLORS.white,
                // borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 22,
              }}
            />
            :
            null
        }
        <Text style={{ fontSize: 18, color: COLORS.black, fontWeight: '600', marginTop: 10 }}>
          Reference:
        </Text>
        <View style={{ alignItems: 'flex-start', padding: 10, borderWidth: 1, height: 40, borderRadius: 12 }}>
          <Text>
          ####
          </Text>
        </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
          <TouchableOpacity style={{ width: '80%', borderWidth: .5, borderColor: '#06416c', backgroundColor: '#06416c', padding: 8, alignItems: 'center', borderRadius: 8}}>
            <Text style={{ fontSize: 16, color: COLORS.white, fontWeight: 'bold', textAlign: 'center'}}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SalesEntry

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