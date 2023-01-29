import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home'
import ProductScreen from '../Screens/ProductScreen'

const stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <stack.Navigator>
        <stack.Screen options={{headerShown: false}} name="Home" component={Home}></stack.Screen>
        <stack.Screen options={{headerShown: false}} name="ProductScreen" component={ProductScreen}></stack.Screen>
    </stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})