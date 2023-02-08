import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderDetailScreen from '../Screens/OrderDetailScreen'
import OrdersScreenOfUser from '../Screens/OrdersScreenOfUser'

const stack = createNativeStackNavigator()
const OrderStack = () => {
  return (
    <stack.Navigator initialRouteName='Orders'>
        
        <stack.Screen options={{headerShown: false}} name="Orders" component={OrdersScreenOfUser}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="OrderDetail" component={OrderDetailScreen}></stack.Screen>
    </stack.Navigator>
  )
}

export default OrderStack

const styles = StyleSheet.create({})