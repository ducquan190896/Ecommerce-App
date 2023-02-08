import {  Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import Orders from "../DummyData/Orders.json"
import { useCallback } from 'react'
import { getOrdersByAuth, getOrdersByIdByAuth, getordersOfUserIdByAdmin, resetOrder } from '../Reducers/Actions/OrderAction'
import { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Button } from '@rneui/base'
import ItemOrder from '../Components/ItemOrder'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'
import ItemOrderAdmin from '../Components/ItemOrderAdmin'
import { useNavigation, useRoute } from '@react-navigation/native'


const OrdersScreenOfUserIDByAdmin = () => {

    const {params}= useRoute()
    const {userId, username} = params
    
    const [isLoading, setIsloading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isPastOrder, setIsPastOrder] = useState(true)
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [pastOrders, setPastOrders] = useState(null)
    const [newOrders, setNewOrders] = useState(null)
    const navigation = useNavigation()
    const tw = useTailwind()
    const dispatch = useDispatch()
    const {orders, order, updateOrderStatus, orderSuccess, orderError, message: orderMessage, orderUpdated} = useSelector(state => state.ORDERS)

    const loadOrders = useCallback( async() => {
        if(userId) {
            await dispatch(getordersOfUserIdByAdmin(userId))
        }
    }, [orders, dispatch])

    const loadPastOrders = useCallback( async () => {
     await setPastOrders(orders.filter(ord => ord.status == "CLOSE"))
     console.log("past orders")
     console.log(newOrders)
    }, [dispatch, loadOrders, orders, setPastOrders])

    const loadNewOrders = useCallback(async () => {
       await setNewOrders(orders.filter(ord => ord.status == "OPEN"))
        console.log("new orders")
        console.log(pastOrders)
      }, [dispatch, loadOrders, orders, setNewOrders])

    

    useEffect(() => {
        if(orderSuccess || orderError || updateOrderStatus) {
            dispatch(resetOrder())
        }
        if(orderError) {
            setIsError(true)
          
        }
    }, [orderSuccess, orderError, updateOrderStatus, dispatch])

    useEffect(() => {    
            setTimeout(() => {
                setIsError(false)
            }, 3000);
        
    }, [dispatch, setIsError])

    useEffect(() => {
        setIsloading(true)
        loadOrders().then(() => setIsloading(false)).catch(err => setIsError(true))
    }, [dispatch])

    useEffect(() => {
        if(orders && orders.length > 0) {
            loadPastOrders()
        }       
    }, [orders, dispatch, loadOrders, setIsPastOrder, isPastOrder])

    useEffect(() => {
        if(orders && orders.length > 0) {
            loadNewOrders()
        }       
    }, [orders, dispatch, loadOrders, setIsNewOrder, isNewOrder])

    const goBackFunction = () => {
        navigation.navigate("AdminUsers")
    }

    const openPastOrderButton = () => {
        setIsNewOrder(false)
        setIsPastOrder(true)
    }
    const openNewOrderButton = () => {
        setIsPastOrder(false)
        setIsNewOrder(true)
    }
    useEffect(() => {
        console.log( "is newOrder " + isNewOrder)
       
    }, [setIsNewOrder, isNewOrder])

    useEffect(() => {
        console.log("is pastOrder " + isPastOrder)
       
    }, [setIsPastOrder, isPastOrder])
    
  if(isError) {
    return <ErrorComponent></ErrorComponent>
  }
  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
  }

  return (
    <SafeAreaView style={tw('flex-1')}>
      <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 200}
            enabled={true} 
            style={tw('flex-1')}
            >
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
            <View style={tw('flex-1')}>
                <View style={tw('w-full relative py-2 items-center justify-center bg-[#22e3dd]')}>     
                    <Text style={tw('text-3xl font-bold text-zinc-700')}>  {username ? username.toUpperCase() : "Customer"} 's orders</Text>
                    <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-2 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={tw('flex-row w-full py-2 items-center justify-center my-2')}>
                    <Button onPress={openPastOrderButton} titleStyle={tw('text-[#22e3dd] text-lg font-bold ')}  buttonStyle={[tw(` px-10 rounded-lg bg-white   py-2 ${isPastOrder ? "  border-b-2" : "border-0"}`), {borderColor : isPastOrder ? "#22e3dd" : null}]}  title="Past Orders"></Button>
                    <Button onPress={openNewOrderButton} titleStyle={tw('text-[#22e3dd] text-lg font-bold ')}  buttonStyle={[tw(`px-10 rounded-lg bg-white   py-2 ${isNewOrder ?  "  border-b-2" : "border-0" }`), , {borderColor : isNewOrder ? "#22e3dd" : null}]}  title="New Orders"></Button>
                </View>   
                <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2 pt-4 pb-2')}>
                    {isPastOrder && pastOrders && pastOrders.length > 0 && pastOrders.map(ord => <ItemOrder key={ord.id} item={ord}></ItemOrder>) }

                    {isPastOrder && pastOrders && pastOrders.length <= 0 &&  <Text style={tw('text-2xl w-full text-center font-bold text-red-500')}>No past orders</Text>}

                    {isNewOrder && newOrders && newOrders.length > 0 && newOrders.map(ord => <ItemOrder key={ord.id} item={ord}></ItemOrder>) }

                        
                    {isPastOrder && newOrders && newOrders.length <= 0 &&  <Text style={tw('text-2xl w-full text-center font-bold text-red-500')}>No upcoming orders</Text>}
                    
                </ScrollView>
            </View>            
        </TouchableWithoutFeedback>        
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OrdersScreenOfUserIDByAdmin

const styles = StyleSheet.create({})