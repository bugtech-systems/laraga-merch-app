import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

const UserForm = () => {
    const [name, setName] = useState('Raymund Ogsimer');
    const [role, setRole] = useState('Cashier');
    const [username, setUsername] = useState('rogsimer01');
    const [password, setPassword] = useState('********');
    const [branch, setBranch] = useState('Palo');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    editable={false}
                />
                <Text style={styles.label}>Role:</Text>
                <TextInput
                    style={styles.input}
                    value={role}
                    editable={false}
                />
                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    editable={false}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                    editable={false}
                />
                <Text style={styles.label}>Branch:</Text>
                <TextInput
                    style={styles.input}
                    value={branch}
                    editable={false}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.doneButton}>
                        <Text style={styles.buttonText}>DONE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    form: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        backgroundColor: '#f0f0f0',
        color: '#555',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    doneButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserForm;