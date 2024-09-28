import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView,  } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { COLORS, icons } from '../constants';
import DashboardCard from '../components/DashboardCards/DashboardCards';

const Dashboard = () => {
    const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());
    
    
    const showDatePicker = () => {
		setShow(true);
	};


    const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
	};
    
    function renderCards({item}) {
        
        <View>
            <DashboardCard />
        </View>
        
        return
    }

    function renderHeader() {
		return (
			<View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
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
					onPress={() => console.log('Pressed Printer!') }>
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
    
    
    
  return (
    <SafeAreaView 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: COLORS.gray400,
            padding: 12
        }}
    >
      {renderHeader()}
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
            <DashboardCard
        title="CASH"
        stats={[
          {  label: 'SALES', value: '10,900.00' },
          { label: 'DISBURSED', value: '900.00' },
          {  label: 'A/R', value: '3,000.00' },
          {  label: 'ON-HAND', value: '7,000.00' },
        ]}
        onPress={() => console.log('Add Cash')}
      />

      {/* Sales Card */}
      <DashboardCard
        title="SALES"
        stats={[
          {  label: 'NEW', value: '6,500.00' },
          {  label: 'REFILL', value: '4,400.00' },
        ]}
      />

      {/* Inventory Card */}
      <DashboardCard
        title="INVENTORY"
        stats={[
          {  label: 'OUT', value: '100' },
          {  label: 'EMPTY', value: '200' },
          { label: 'B.O.', value: '50' },
          {label: 'STOCKS', value: '150' },
        ]}
      />

      {/* Purchases Card */}
      <DashboardCard
        title="PURCHASES"
        stats={[
          {  label: 'BATCH', value: '1' },
          {  label: 'CANS', value: '500' },
          {label: 'TOTAL', value: '5,000.00' },
          {  label: 'AVE. AGE', value: '4' },
        ]}
      />
			
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})