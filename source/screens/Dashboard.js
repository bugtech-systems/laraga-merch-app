import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, Modal, FlatList, TouchableWithoutFeedback, } from 'react-native'
import React, { useState, useRef } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { COLORS, icons } from '../constants';
import DashboardCard from '../components/DashboardCards/DashboardCards';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({navigation}) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const data = [{ id: 0, title: "Disbursement",}, { id: 1, title: "Collection"}];

  
    const [isCashModalVisible, setCashModalVisible] = useState(false);
    const [transaction, setTransaction] = useState('');

      // Function to handle dropdown open/close
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Function to handle closing dropdown when pressing outside
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  
  const handleTransaction = (val) => {
    setTransaction(val)
    closeDropdown()
  }


    
    const toggleCashModal = () => {
        console.log('TAPPED OUTSIDE')
        setCashModalVisible(!isCashModalVisible);
    };





    const showDatePicker = () => {
        setShow(true);
    };

    const toggleSave = () => {
        toggleCashModal()
        setTransaction('')
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    function renderDatePicker() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', padding: 12 }}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={showDatePicker}
                    style={{ width: '100%', borderWidth: 1.5, borderColor: COLORS.gray200, borderRadius: 8, backgroundColor: COLORS.gray200, elevation: 8 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 8, width: '100%', padding: 5 }}>
                        <Text style={{ paddingLeft: 4, fontSize: 20, color: COLORS.black, fontWeight: '500' }}>{date == undefined || '' ? '' : moment(date).format('MM/DD/YYYY')}</Text>
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
        )
    }



    return (
        <SafeAreaView
            style={{
                flex: 1,
                // alignItems: 'center',
                // justifyContent: 'flex-start',
                backgroundColor: COLORS.lightGray1,
                padding: 12
            }}
        >

           
            <Modal
                animationType="fade"
                transparent={true}
                visible={isCashModalVisible}
                onRequestClose={toggleCashModal}
            >
            {/* <TouchableWithoutFeedback onPress={() => setCashModalVisible(false)}>             */}
                <View style={styles.modalOverlay}>
                    <View style={{ ...styles.modalCashContent, alignSelf: 'flex-end' }}>
                        <Icon onPress={toggleCashModal} name="close" size={25} style={{ alignSelf: 'flex-end'}}/>
                        <View style={{ flexDirection: 'column', width: "100%", padding: 10}}>
                            <Text style={{ fontSize: 18, color: COLORS.black}}>
                                Transaction:
                            </Text>
                            <TouchableOpacity onPress={toggleDropdown} style={{ borderWidth: 1, height: 40, borderRadius: 12}}>
                                <Text style={{ fontSize: 18, color: COLORS.black, textAlign: 'left', padding: 6}}>
                                    {transaction !== '' ? transaction : null}
                                </Text>
                            </TouchableOpacity>
                                
                            {
                                isDropdownOpen ? 
                                <FlatList 
                                    data={data}
                                    renderItem={({item}) => 
                                        <TouchableOpacity onPress={() => handleTransaction(item.title)} style={{  padding: 8, backgroundColor: COLORS.white, width: "100%", borderWidth: .5}}>
                                            <Text style={{ fontSize: 16, color: COLORS.black, padding: 4}}>
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
                                        // backgroundColor: COLORS.transparent,
                                        // borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 22, }}
                                />
                                :
                                null
                            }
                                
                           
                            <Text style={{ fontSize: 18, color: COLORS.black, marginTop: 10}}>
                                Description:
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, height: 40, borderRadius: 12}}>
                                
                            </TouchableOpacity>
                            
                            <Text style={{ fontSize: 18, color: COLORS.black, marginTop: 10}}>
                                Amount:
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, height: 40, borderRadius: 12}}>
                                
                            </TouchableOpacity>
                            
                            <Text style={{ fontSize: 18, color: COLORS.black, marginTop: 10}}>
                                Attachment:
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, height: 40, borderRadius: 12}}>
                                
                            </TouchableOpacity>
                            
                            <Text style={{ fontSize: 18, color: COLORS.black, marginTop: 10}}>
                                Payor / Payee:
                            </Text>
                            <TouchableOpacity style={{ borderWidth: 1, height: 40, borderRadius: 12}}>
                                
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={styles.versionText}>v1.03.14.24.02</Text> */}
                        <View style={{ height: '50%', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <TouchableOpacity onPress={toggleSave} style={{ borderWidth: 1, borderColor: COLORS.primary, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 20, width: '80%', alignItems: 'center'}}>
                            <Text style={{ padding: 10, color: COLORS.white, fontWeight: 'bold', fontSize: 16}}>
                                SAVE
                            </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            {/* </TouchableWithoutFeedback> */}
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
            <View style={{ flex: 1, flexDirection: 'column', padding: 12 }}>
                <DashboardCard
                    title="SALES"
                    stats={[
                        // { label: 'SALES', value: '10,900.00' },
                        { label: 'CASH', value: '900.00' },
                        { label: 'RECEIVABLES', value: '3,000.00' },
                        { label: 'EXPENSES', value: '7,000.00' },
                    ]}
                    onPress={() => setCashModalVisible(true)} // Transaction Entry
                    onPressCard={() => navigation.navigate('Cash Transaction')}
                />

                {/* Sales Card */}
                <DashboardCard
                    title="CAN SOLD"
                    stats={[
                        { label: 'NEW', value: '6,500.00' },
                        { label: 'REFILL', value: '4,400.00' },
                    ]}
                    onPress={() => navigation.navigate('Sales Entry')}
                    onPressCard={() => navigation.navigate('Sales')}

                />

                {/* Inventory Card */}
                <DashboardCard
                    title="INVENTORY"
                    stats={[
                        { label: 'NEW CANS', value: '100' },
                        { label: 'REFILL', value: '200' },
                        { label: 'B.O.', value: '50' },
                    ]}
                    onPress={() => navigation.navigate('Inventory Entry')}
                    onPressCard={() => navigation.navigate('Inventory')}
                />

                {/* Purchases Card */}
               {/*  <DashboardCard
                    title="PURCHASES"
                    stats={[
                        { label: 'BATCH', value: '1' },
                        { label: 'CANS', value: '500' },
                        { label: 'TOTAL', value: '5,000.00' },
                        { label: 'AVE. AGE', value: '4' },
                    ]}
                    onPressCard={() => navigation.navigate('Purchase')}
                /> */}
            </View>
        </SafeAreaView>
    )
}

export default Dashboard

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
        fontSize: 18,
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
    modalCashContent: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        height: '90%',
        // left: 30
        // bottom: '20%'
        // alignItems: 'center',
    },
    
})