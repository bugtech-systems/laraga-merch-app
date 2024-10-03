import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Linking, Text, View, ActivityIndicator} from 'react-native';
import {NavigationContainer, createNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {dataExplorerLink} from '../atlasConfig.json';
import {LogoutButton} from './LogoutButton';
import {ItemListView} from './ItemListView';
import {OfflineModeButton} from './OfflineModeButton';
import { WelcomeView } from './WelcomeView';
import CashTransaction from './screens/CashTransaction';
import { COLORS, icons } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Dashboard from './screens/Dashboard';
import PaymentVerification from './screens/PaymentVerification';
import Sales from './screens/Sales';
import Inventory from './screens/Inventory';
import Purchase from './screens/Purchase';
import SalesEntry from './screens/SalesEntry';
import InventoryEntry from './screens/InventoryEntry';
import UserForm from './screens/UserForm';


// If you're getting this app code by cloning the repository at
// https://github.com/mongodb/ template-app-react-native-todo,
// it does not contain the data explorer link. Download the
// app template from the Atlas UI to view a link to your data
const dataExplorerMessage = `View your data in MongoDB Atlas: ${dataExplorerLink}.`;

console.log(dataExplorerMessage);


const Stack = createStackNavigator();

const headerRight = () => {
  return <OfflineModeButton />;
};

const headerLeft = () => {
  return <LogoutButton />;
};

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const customDrawerIcon = () => {
  
  return (
    <TouchableOpacity style={{ paddingHorizontal: 12 }}>
      <Image source={icons.drawer} resizeMode='contain' style={{height: 20, width: 20,}}/>
    </TouchableOpacity>
  )
}

const realmFileBehavior = {
  type: 'downloadBeforeOpen',
  timeOut: 5000,
  timeOutBehavior: 'openLocalRealm',
}


export const navigationRef = createNavigationContainerRef();


export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const App = () => {
  return (
    <>
      {/* All screens nested in RealmProvider have access
            to the configured realm's hooks. */}

<SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Dashboard'> 
          <Stack.Screen
              name="Dashboard"
              component={Dashboard}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Dashboard',
					headerTitleAlign: 'center',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							// onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.POS}
								style={{
									height: 30,
									width: 30,
									tintColor: COLORS.black,
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
          <Stack.Screen
              name="Cash Transaction"
              component={CashTransaction}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Cash Transaction',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
            <Stack.Screen
              name="Inventory Entry"
              component={InventoryEntry}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Inventory Entry',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
            <Stack.Screen
              name="User Form"
              component={UserForm}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'User Form',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
            <Stack.Screen
              name="Sales"
              component={Sales}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Sales',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
                        <Stack.Screen
              name="Inventory"
              component={Inventory}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Inventory',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
                        <Stack.Screen
              name="Purchases"
              component={Purchase}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Purchases',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
            <Stack.Screen
              name="Sales Entry"
              component={SalesEntry}
				options={({ navigation }) => ({
          headerShown: false,
					title: 'Sales Entry',
					headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
					// headerStyle: { backgroundColor: COLORS.secondary },
					headerStyle: { backgroundColor: '#fffff1', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

					headerLeft: () => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}
						>
							<Image
								source={icons.back}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.black
								}} />
						</TouchableOpacity>),
						headerRight: () => (customDrawerIcon())
				})}
            />
            
            <Stack.Screen
              name="Your To-Do List"
              component={ItemListView}
              options={{
                headerTitleAlign: 'center',
                headerLeft,
                headerRight,
              }}
            />
            <Stack.Screen
              name="Login"
              component={WelcomeView}
              options={{
                headerTitleAlign: 'center',
                headerLeft,
                headerRight,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>

        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>
            Log in with the same account on another device or simulator to see
            your list sync in real time.
          </Text>

          {dataExplorerLink && (
            <View>
              <Text style={styles.footerText}>
                You can view your data in MongoDB Atlas:
              </Text>
              <Text
                style={[styles.footerText, styles.hyperlink]}
                onPress={() => Linking.openURL(dataExplorerLink)}>
                {dataExplorerLink}.
              </Text>
            </View>
          )}
        </View> */}
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  hyperlink: {
    color: 'blue',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
