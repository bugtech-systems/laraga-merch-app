import React, { useState, useCallback } from 'react';
import { useUser } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ActivityIndicator, Modal, TouchableWithoutFeedback, FlatList, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, icons } from './constants';
import Dashboard from './screens/Dashboard';
import CashTransaction from './screens/CashTransaction';
import Inventory from './screens/Inventory';
import Purchase from './screens/Purchase';
import UserForm from './screens/UserForm';
import Sales from './screens/Sales';
import InventoryEntry from './screens/InventoryEntry';
import SalesEntry from './screens/SalesEntry';
import { LogoutButton } from './LogoutButton';
import { OfflineModeButton } from './OfflineModeButton';

const menuItems = [
	{ id: 1, title: 'Dashboard', screen: 'Dashboard' },
	{ id: 2, title: 'Cash Transaction', screen: 'Cash Transaction' },
	{ id: 3, title: 'Inventory', screen: 'Inventory' },
	{ id: 4, title: 'Purchases', screen: 'Purchases' },
	{ id: 5, title: 'User Form', screen: 'User Form' },
	{ id: 6, title: 'Logout', screen: 'Logout' },
];

const Stack = createStackNavigator();

const headerLeft = () => {
	return <LogoutButton />;
};

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
	navigationRef.current?.navigate(name, params);
}

export const App = () => {
	const user = useUser();
	const [isModalVisible, setModalVisible] = useState(false);

	const signOut = useCallback(() => {
		user?.logOut();
	}, [user]);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const handleSelectMenu = async (screen) => {
		toggleModal();
		if (screen !== 'Logout') {
			navigate(screen);
		} else {
			signOut()
			// Handle logout functionality if needed
		}
	};

	const renderMenuItem = ({ item }) => (
		<TouchableOpacity onPress={() => handleSelectMenu(item.screen)} style={styles.menuItem}>
			<Text style={styles.menuItemText}>{item.title}</Text>
		</TouchableOpacity>
	);

	const customDrawerIcon = () => (
		<View>
			<TouchableOpacity onPress={toggleModal} style={{ paddingHorizontal: 12 }}>
				<Image source={icons.drawer} resizeMode='contain' style={{ height: 20, width: 20 }} />
			</TouchableOpacity>
			<Modal
				animationType="fade"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<TouchableWithoutFeedback onPress={toggleModal}>
					<View style={styles.modalOverlay}>
						<View style={{ ...styles.modalContent, alignSelf: 'flex-end' }}>
							<FlatList
								data={menuItems}
								renderItem={renderMenuItem}
								keyExtractor={item => item.id.toString()}
							/>
							<Text style={styles.versionText}>v1.03.14.24.02</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);

	return (
		<SafeAreaProvider>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator initialRouteName='Dashboard'>
					<Stack.Screen
						name="Dashboard"
						component={Dashboard}
						options={{
							title: 'Dashboard',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
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
						}}
					/>
					<Stack.Screen
						name="Cash Transaction"
						component={CashTransaction}
						options={{
							title: 'Cash Transaction',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },
							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="Inventory"
						component={Inventory}
						options={{
							title: 'Inventory',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="Purchases"
						component={Purchase}
						options={{
							title: 'Purchases',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="User Form"
						component={UserForm}
						options={{
							title: 'User Form',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="Sales"
						component={Sales}
						options={{
							title: 'Sales',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="Inventory Entry"
						component={InventoryEntry}
						options={{
							title: 'Inventory Entry',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
					<Stack.Screen
						name="Sales Entry"
						component={SalesEntry}
						options={{
							title: 'Sales Entry',
							headerTitleAlign: 'center',
							headerTitleStyle: { color: COLORS.black, fontWeight: 'bold' },
							// headerStyle: { backgroundColor: COLORS.secondary },
							headerStyle: { backgroundColor: '#fffff6', elevation: 6, borderBottomWidth: 1, shadowOpacity: .5, shadowColor: COLORS.black },

							headerRight: customDrawerIcon,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
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
});
