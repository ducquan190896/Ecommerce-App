import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen'
import AccountScreen from '../Screens/AccountScreen'
import ChangePasswordScreen from '../Screens/ChangePasswordScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const stack = createNativeStackNavigator()
const AccountStack = () => {
  return (
    <stack.Navigator>
        <stack.Screen options={{headerShown: false}} name="AccountScreen" component={AccountScreen}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="ChangePassWord" component={ChangePasswordScreen}></stack.Screen>
</stack.Navigator>
  )
}

export default AccountStack

const styles = StyleSheet.create({})