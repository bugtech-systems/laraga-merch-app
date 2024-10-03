import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
// import SelectDropdown from 'react-native-picker-select';
import SelectDropdown from 'react-native-select-dropdown';
import { COLORS } from '../constants';


const InventoryEntry = ({ navigation }) => {
  
  
  return (
    <SafeAreaView style={styles.container}>
      

      <View style={{...styles.formContainer}}>
        <TouchableOpacity style={styles.closeButton}>
          <Icon name="close" size={24} />
        </TouchableOpacity>

        <Text style={styles.label}>Transaction type:</Text>
        <SelectDropdown
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Type 1', value: 'type1' },
            { label: 'Type 2', value: 'type2' },
          ]}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Transaction Description:</Text>
        <SelectDropdown
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Description 1', value: 'description1' },
            { label: 'Description 2', value: 'description2' },
          ]}
          style={pickerSelectStyles}
        />

        <Text style={styles.label}>Quantity:</Text>
        <TextInput style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Amount:</Text>
        <TextInput style={styles.input} keyboardType="numeric" />

        <Text style={styles.label}>Tags:</Text>
        <TextInput style={styles.input} />
        <View style={{ marginTop: 100, flex: 1, justifyContent: 'flex-end',}}>

        <Button
          title="SAVE"
          buttonStyle={styles.saveButton}
        />

        <Button
          title="SAVE & GENERATE REPORT"
          buttonStyle={styles.generateButton}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.lightGray1,
    justifyContent: 'space-between',
    
  },
  headerContainer: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFBE0',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    marginLeft: 10,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    height: 260 * 3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#003c8f',
    marginTop: 20,
    borderRadius: 5,
  },
  generateButton: {
    backgroundColor: '#ff8c00',
    marginTop: 10,
    borderRadius: 5,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    marginTop: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    color: 'black',
    backgroundColor: '#fff',
    marginTop: 5,
  },
};

export default InventoryEntry;