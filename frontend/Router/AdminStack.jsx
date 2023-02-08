import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminHome from '../Screens/AdminHome'
import OrdersScreenOfAdmin from '../Screens/OrdersScreenOfAdmin'
import OrderDetailScreenAdmin from '../Screens/OrderDetailScreenAdmin'
import UsersScreenAdmin from '../Screens/UsersScreenAdmin'
import OrdersScreenOfUserIDByAdmin from '../Screens/OrdersScreenOfUserIDByAdmin'
import ProductsListAdmin from '../Screens/ProductsListAdmin'
import UpdateProductScreenAdmin from '../Screens/UpdateProductScreenAdmin'
import CreateProductScreenAdmin from '../Screens/CreateProductScreenAdmin'

const stack = createNativeStackNavigator()
const AdminStack = () => {
  return (
    <stack.Navigator>
        <stack.Screen name="AdminHome" options={{headerShown: false}} component={AdminHome}></stack.Screen>
        <stack.Screen name="AdminOrders" options={{headerShown: false}} component={OrdersScreenOfAdmin}></stack.Screen>
        <stack.Screen name="AdminOrderDetail" options={{headerShown: false}} component={OrderDetailScreenAdmin}></stack.Screen>
        <stack.Screen name="AdminUsers" options={{headerShown: false}} component={UsersScreenAdmin}></stack.Screen>
        <stack.Screen name="AdminOrdersOfUser" options={{headerShown: false}} component={OrdersScreenOfUserIDByAdmin}></stack.Screen>
        <stack.Screen name="AdminProducts" options={{headerShown: false}} component={ProductsListAdmin}></stack.Screen>
        <stack.Screen name="AdminProductUpdate" options={{headerShown: false}} component={UpdateProductScreenAdmin}></stack.Screen>
        <stack.Screen name="AdminProductCreate" options={{headerShown: false}} component={CreateProductScreenAdmin}></stack.Screen>
    </stack.Navigator>
  )
}

export default AdminStack

const styles = StyleSheet.create({})