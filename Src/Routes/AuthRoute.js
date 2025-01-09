import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens //
import Splash from '../Screens/AuthScreens/Splash';
import LoginOption from '../Screens/AuthScreens/LoginOption';
import MobileLogin from '../Screens/AuthScreens/MobileLogin';
import LoginEmail from '../Screens/AuthScreens/LoginEmail';
import Create from '../Screens/AuthScreens/Create';
import OtpLogin from '../Screens/AuthScreens/OtpLogin';
import Create1 from '../Screens/AuthScreens/Create1';
import ForgetPass from '../Screens/AuthScreens/ForgetPass';
import DocumentUpload from '../Screens/AuthScreens/DocumentUpload';
// end screens //


const Stack = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="LoginOption" component={LoginOption} />
      <Stack.Screen name="MobileLogin" component={MobileLogin} />
      <Stack.Screen name="LoginEmail" component={LoginEmail} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="OtpLogin" component={OtpLogin} />
      <Stack.Screen name="Create1" component={Create1} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
    </Stack.Navigator>
  );
}

export default AuthRoute

const styles = StyleSheet.create({})