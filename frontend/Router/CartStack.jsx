import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../Screens/CartScreen'
import BillingAddressScreen from '../Screens/BillingAddressScreen'
import ShippingAddress from '../Screens/ShippingAddress'
import PaymentScreen from '../Screens/PaymentScreen'
import OrderDetailScreen from '../Screens/OrderDetailScreen'

const stack = createNativeStackNavigator()
const CartStack = () => {
  return (
    <stack.Navigator>
        <stack.Screen options={{headerShown: false}} name="Cart" component={CartScreen}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="BillingAddress" component={BillingAddressScreen}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="ShippingAddress" component={ShippingAddress}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="PaymentScreen" component={PaymentScreen}></stack.Screen>
        
    </stack.Navigator>
  )
}

export default CartStack

const styles = StyleSheet.create({})