import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../Screens/Home'
import HomeStack from './HomeStack'
import AccountStack from './AccountStack'
import CartStack from './CartStack'

const tab = createBottomTabNavigator()
const Route = () => {
  return (
    <NavigationContainer>
        <tab.Navigator>
            <tab.Screen options={{headerShown: false}} name="HomeStack" component={HomeStack}></tab.Screen>
            <tab.Screen options={{headerShown: false}} name="AccountStack" component={AccountStack}></tab.Screen>
            <tab.Screen options={{headerShown: false}} name="CartStack" component={CartStack}></tab.Screen>
        </tab.Navigator>
    </NavigationContainer>
  )
}


export default Route

const styles = StyleSheet.create({})