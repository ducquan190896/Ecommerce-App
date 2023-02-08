import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react'
import { Button } from '@rneui/base'
import { useCallback } from 'react'
import { getCloseOrdersByAdmin, getOpenOrdersByAdmin } from '../Reducers/Actions/OrderAction'
import { useEffect } from 'react'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'
import ItemOrder from '../Components/ItemOrder'
import ItemOrderAdmin from '../Components/ItemOrderAdmin'
import { useNavigation } from '@react-navigation/native'

const OrdersScreenOfAdmin = () => {
    const [isPastOrder, setIsPastOrder] = useState(true)
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
  
    const tw = useTailwind()
    const dispatch = useDispatch()
    const {orders, closeOrders, openOrders, order, updateOrderStatus, orderSuccess, orderError, message: orderMessage, orderUpdated} = useSelector(state => state.ORDERS)
    const navigation = useNavigation()

    const loadCloseOrders = useCallback(async () => {
        await dispatch(getCloseOrdersByAdmin())
    }, [dispatch, setIsPastOrder, isPastOrder, closeOrders])

    useEffect(() => {
        setIsLoading(true)
        loadCloseOrders().then(() => setIsLoading(false)).catch((err) => setIsError(true))
    }, [dispatch, setIsPastOrder])

    const loadOpenOrders = useCallback(async () => {
        await dispatch(getOpenOrdersByAdmin())
    }, [dispatch, setIsNewOrder, isNewOrder, openOrders])

    useEffect(() => {
        setIsLoading(true)
        loadOpenOrders().then(() => setIsLoading(false)).catch((err) => setIsError(true))
    }, [dispatch, setIsNewOrder])

    useEffect(() => {
        if(isError) {
            setTimeout(() => {
                setIsError(false)
            }, 3000);
        }
    }, [setIsError])

    useEffect(() => {
        if(openOrders && openOrders.length > 0) {
            console.log(openOrders)
        }
        if(closeOrders && closeOrders.length > 0) {
            console.log(closeOrders)
        }
    }, [dispatch])


    const goBackFunction = () => {
        navigation.navigate("AdminHome")
    }
    const openPastOrderButton =  () => {
       setIsNewOrder(false)
       setIsPastOrder(true)
       
    }
    const openNewOrderButton =  () => {
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
            <Text style={tw('text-2xl font-bold text-zinc-700')}>Manage Orders</Text>
            <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-2 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>

          </View>
          <View style={tw('flex-row w-full py-2 items-center justify-center mb-4')}>
                    <Button onPress={openPastOrderButton} titleStyle={tw('text-[#22e3dd] text-lg font-bold ')}  buttonStyle={[tw(` px-10 rounded-lg bg-white   py-2 ${isPastOrder ? "  border-b-2" : "border-0"}`), {borderColor : isPastOrder ? "#22e3dd" : null}]}  title="Past Orders"></Button>
                    <Button onPress={openNewOrderButton} titleStyle={tw('text-[#22e3dd] text-lg font-bold ')}  buttonStyle={[tw(`px-10 rounded-lg bg-white   py-2 ${isNewOrder ?  "  border-b-2" : "border-0" }`), , {borderColor : isNewOrder ? "#22e3dd" : null}]}  title="New Orders"></Button>
            </View>   
          <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2 pt-4 pb-2')}>
            {isPastOrder && closeOrders && closeOrders.length > 0 && closeOrders.map(ord => <ItemOrderAdmin key={ord.id} item={ord}></ItemOrderAdmin>) }

            {isPastOrder && closeOrders && closeOrders.length <= 0 &&  <Text style={tw('text-2xl w-full text-center font-bold text-red-500')}>No past orders</Text>}

            {isNewOrder && openOrders && openOrders.length > 0 && openOrders.map(ord => <ItemOrderAdmin key={ord.id} item={ord}></ItemOrderAdmin>) }

            {isPastOrder && openOrders && openOrders.length <= 0 &&  <Text style={tw('text-2xl w-full text-center font-bold text-red-500')}>No upcoming orders</Text>}

          </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default OrdersScreenOfAdmin

const styles = StyleSheet.create({})