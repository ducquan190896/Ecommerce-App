import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../Screens/Home'
import HomeStack from './HomeStack'
import AccountStack from './AccountStack'
import CartStack from './CartStack'
import OrderStack from './OrderStack'
import { useSelector } from 'react-redux'
import AdminStack from './AdminStack'
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const tab = createBottomTabNavigator()
const Route = () => {
  const {users, user, userSuccess, userError, message} = useSelector(state => state.USERS)

  return (
    <NavigationContainer>
        <tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#c7c9c9',
          tabBarActiveTintColor: '#22e3dd'
        }}
        >
            <tab.Screen 
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <AntDesign name="home" size={28} color={color} />
              )
            }} 
            name="HomeStack" 
            component={HomeStack}
            ></tab.Screen>

            <tab.Screen
             options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Ionicons name="person" size={28} color={color} />
              )
            }} 
             name="AccountStack"
              component={AccountStack}
              ></tab.Screen>

         {!user && (
             <tab.Screen 
             options={{
               headerShown: false,
               tabBarIcon: ({color}) => (
                 <AntDesign name="shoppingcart" size={28} color={color} />
               )
             }} 
             name="CartStack" 
             component={CartStack}
             ></tab.Screen>
         )}

            {user && user.role == "USER" && (
              <>
               <tab.Screen 
             options={{
               headerShown: false,
               tabBarIcon: ({color}) => (
                 <AntDesign name="shoppingcart" size={28} color={color} />
               )
             }} 
             name="CartStack" 
             component={CartStack}
             ></tab.Screen>
              <tab.Screen
               options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                  <Ionicons name="document" size={28} color={color} />
                )
              }}
                name="OrderStack"
                 component={OrderStack}
                 ></tab.Screen>
              </>
             
            )}
            {user && user.role == "ADMIN" && (
              <tab.Screen 
              options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                  <FontAwesome5 name="database" size={28} color={color} />
                )
              }}
               name="AdminStack"
                component={AdminStack}
                ></tab.Screen>
            )}
        </tab.Navigator>
    </NavigationContainer>
  )
}


export default Route

const styles = StyleSheet.create({})