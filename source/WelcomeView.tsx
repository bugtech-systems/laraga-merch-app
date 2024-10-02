import React, {useCallback, useState} from 'react';
import Realm from 'realm';
import {useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Input, Button} from '@rneui/base';
import { COLORS, icons } from './constants';

export function WelcomeView(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = useCallback(async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  }, [app, email, password]);

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = useCallback(async () => {
    setLoading(true);

    try {
    const authenticate = await signIn();
    return authenticate
    } catch (error: any) {
      Alert.alert(`Failed to sign in: ${error?.message}`);
    }
  }, [signIn]);
  
  const handleSignIn = useCallback(async () => {
    await onPressSignIn()
    .then(res => {
      console.log(res, "Success")
      return;
    })
    .catch(err => {
      Alert.alert('Something went wrong.')
      console.log(err, "Error")
      return
    })
    setLoading(false)
  }, [])

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = useCallback(async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      await signIn();
    } catch (error: any) {
      Alert.alert(`Failed to sign up: ${error?.message}`);
    }
  }, [signIn, app, email, password]);

  const LoadingIndicator = () => {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  
  
  return (
    <SafeAreaProvider>
      <View style={{...styles.viewWrapper}}>
        
        <View style={{  alignItems: 'center', flexDirection: 'column', justifyContent: 'space-evenly', width: '80%', borderWidth: 1, height: 330, borderRadius: 22, borderColor: COLORS.gray900}}>
        <Text style={{...styles.title, color: 'rgb(8, 83, 136)', fontWeight: 'bold'}}>LARAGA MERCHANDISE</Text>
        
        <View style={{ height: 50, borderWidth: 1, borderColor: COLORS.gray900, borderRadius: 12, alignItems: 'flex-start', padding: 6, width: '80%'}}>
        {/* <Input
          onChangeText={setEmail}
          autoCapitalize="none"
          inputStyle={{ borderColor: 'white'}}
          containerStyle={{ flex: 1, borderBottomColor: 'white'}}
          /> */}
          <TextInput 
          placeholder="Email"
          onChangeText={setEmail}
          autoCapitalize="none"
          style={{ color: COLORS.black900, width: '100%' }}
          />

        </View>
        <View style={{ height: 50, borderWidth: 1, borderRadius: 12,  borderColor: COLORS.gray900, alignItems: 'flex-start', padding: 6, width: '80%'}}>

        <TextInput 
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          autoCapitalize="none"
          style={{ color: COLORS.black900, width: '100%' }}
          />
              </View>
              <TouchableOpacity onPress={handleSignIn} disabled={!email || !password ? true : false} style={{ alignItems: 'center',  borderRadius: 6, width: '80%', borderWidth: 1, opacity: loading ? .7 : 1, elevation: 8,  backgroundColor: !email || !password ? COLORS.gray800 : 'rgb(8, 83, 136)', borderColor: !email || !password ? COLORS.gray800 : 'rgb(8, 83, 136)', padding: 10, height: 50}}>
                {
                  loading && 
                  (
                    <View style={{ height: 50, position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
                      {LoadingIndicator()}
                    </View>
                  )
                }
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: COLORS.white, letterSpacing: 8}}>
                  LOGIN
                </Text>
              </TouchableOpacity>
          </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    padding: 10,
    color: 'gray',
    textAlign: 'center',
  },
  mainButton: {
    width: 350,
    backgroundColor: 'rgb(8, 83, 136)',
  },
  secondaryButton: {
    color: 'rgb(8, 83, 136)',
  },
});
