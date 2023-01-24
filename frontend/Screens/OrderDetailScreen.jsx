import {  Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import Orders from "../DummyData/Orders.json"
import { useCallback } from 'react'
import {  getOrdersByIdByAuth, resetOrder } from '../Reducers/Actions/OrderAction'
import { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Button } from '@rneui/base'
import ItemOrder from '../Components/ItemOrder'
import moment from 'moment'
import ItemOrderDetail from '../Components/ItemOrderDetail'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'


const OrderDetailScreen = () => {
    const [isLoading, setIsloading] = useState(false)
    const [isError, setIsError] = useState(false)
    
    const {orders, order, updateOrderStatus, orderSuccess, orderError, message: orderMessage, orderUpdated} = useSelector(state => state.ORDERS)
    //const navigation = useNavigation()
    const tw = useTailwind()
    const dispatch = useDispatch()

    // const params = useRoute()
    // const {orderId} = params
    const orderId = 2
    const loadOder = useCallback( async() => {
        await dispatch(getOrdersByIdByAuth(orderId))
    }, [orderId, dispatch])

    useEffect(() => {
        setIsloading(true)
        loadOder().then(() => setIsloading(false))
    }, [dispatch, orderId])

    useEffect(() => {
        if(orderSuccess || orderError ) {
            dispatch(resetOrder())
        }
        if(orderError) {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 3000);
        }
    }, [orderSuccess, orderError, dispatch])

    useEffect(() => {    
        setTimeout(() => {
            setIsError(false)
        }, 3000);
    
    }, [dispatch, setIsError])

    const goBackFunction = () => {
         //navigation.goBack()
    }

    if(isError) {
        return <ErrorComponent></ErrorComponent>
      }
      if(isLoading) {
        return <LoadingComponent></LoadingComponent>
      }
      if(!isLoading && order == null) {
       return (
        <SafeAreaView style={tw('flex-1 items-center justify-center')}>
            
        <Text style={tw('text-2xl font-bold text-[#007eb9]')}>No order</Text>
      </SafeAreaView >
       )
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
                    <Text style={tw('text-2xl font-bold text-zinc-700')}>Order Detail</Text>
                    <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-2 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            {order && (
                <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2 pt-4 pb-4')}>
                     <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Tracking Number : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-gray-500 ml-4')}>{order.trackingNumber}</Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-center justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Total Price : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 font-bold ml-4')}>£{order.totalPrice}</Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-center justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Total Quantity : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 font-bold ml-4')}>{order.totalQuantity}</Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-center justify-between')}>
                        <View style={tw('')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Delivery Status : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-gray-500 ml-4')}>{order.status == "OPEN" ? "is Delivering" : "is Delivered"}</Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Order date : </Text>
                        </View>
                        <Text style={tw(' flex-1 text-lg  text-gray-500 ml-4')}>{moment(order.dateCreated).format("DD/MM/YYYY")}</Text>
                    </View>
                    {order.status == "CLOSE" && (
                    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Deliveried date : </Text>
                        </View>
                        <Text style={tw(' flex-1 text-lg  text-gray-500 ml-4')}>{moment(order.dateUpdated).format("DD/MM/YYYY")}</Text>
                    </View>
                    )}
                     <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Name : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 ml-4')}>{order.username.toUpperCase()} </Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('w-1/3')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>email : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 ml-4')}>{order.email.toUpperCase()} </Text>
                    </View>
                    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Shipping Address : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 ml-4')}>{order.shippingAddress.street.toUpperCase()}, {order.shippingAddress.city.toUpperCase()} city {order.shippingAddress.zipCode}, {order.shippingAddress.country.toUpperCase()} </Text>
                    </View>
                   
                    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
                        <View style={tw('')}>
                            <Text style={tw(' text-lg font-bold text-zinc-700')}>Billing Address : </Text>
                        </View>
                         <Text style={tw(' flex-1 text-base text-zinc-700 ml-4')}>{order.billingAddress.street.toUpperCase()}, {order.billingAddress.city.toUpperCase()} city {order.billingAddress.zipCode}, {order.billingAddress.country.toUpperCase()} </Text>
                    </View>
                    {order.orderedProducts && order.orderedProducts.length > 0 && order.orderedProducts.map((pro, index) => <ItemOrderDetail key={index} product={pro}></ItemOrderDetail>)}
                    <View style={tw('h-10 w-full')}></View>
                </ScrollView>
            )}
            
        </View>  
         </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default OrderDetailScreen

const styles = StyleSheet.create({})