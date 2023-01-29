import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CartData from "../DummyData/Cart.json"
import { useTailwind } from 'tailwind-rn/dist'
import { Button } from '@rneui/base'
import ItemCart from '../Components/ItemCart'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import LoadingComponent from '../Components/LoadingComponent'
import { ClearCart, getAuthUserCart, resetCart } from '../Reducers/Actions/CartAction'
import { useNavigation } from '@react-navigation/native'
const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const tw = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {cart, cartSuccess, cartError, message} = useSelector(state => state.CARTS)
    const {user, userSuccess, userError} = useSelector(state => state.USERS)
     const loadCart = useCallback(async () => {
       await dispatch(getAuthUserCart())
    }, [dispatch, cart, user])

    useEffect(() => {
       if(user) {
        setIsLoading(true)
        loadCart().then(() => setIsLoading(false))
       }
    }, [dispatch, user])

    useEffect(() => {
        if(cartSuccess || cartError) {
            dispatch(resetCart())
        }
    }, [cart, dispatch, cartSuccess, cartError])

    useEffect(() => {
        if(cartError) {
            Alert.alert("cart loading failed")
        }
    }, [cart, dispatch, cartError])

    const checkoutFunction = () => {
        navigation.navigate("ShippingAddress")
    }

    const clearCartFunction = async () => {
        setIsLoading(true)
        await dispatch(ClearCart())
        setIsLoading(false)
    }

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
      }
    

  return (
    <SafeAreaView  style={tw('flex-1')}>
     {/* {!cart && (
        <View style={tw('flex-1 items-center justify-content')}>
             <Text style={tw('text-lg font-bold text-red-500 my-2')}> No items in the cart</Text>
        </View>
     )}    */}
     {user && cart ? (
         <ScrollView style={tw('flex-1 px-2 py-4')}>
         <View style={tw('flex flex-row w-full items-center justify-start')}>
             <Text style={tw('text-lg  text-black my-2')}>SubTotal ({cart.totalQuantity} items): </Text>
             <Text style={tw('text-lg font-bold text-red-500 my-2')}> £ {cart.totalPrice}</Text>
            
         </View>
         {cart.totalPrice > 0 && (
            <Button onPress={checkoutFunction} titleStyle={tw('text-zinc-700  text-lg')} title="Proceed to checkout" buttonStyle={tw('w-full font-bold text-black text-lg bg-amber-300 rounded-lg py-4 my-2')}></Button>
         )}
         {cart.orderItemReponses && cart.orderItemReponses.length > 0 && cart.orderItemReponses.map(item => <ItemCart setIsLoading={setIsLoading} isLoading={isLoading} key={item.id} item={item}></ItemCart>)}
       {cart.totalPrice > 0 && (
          <TouchableOpacity onPress={clearCartFunction} activeOpacity={0.5}  style={tw(' mx-auto mt-6 mb-4 w-1/3 py-2 rounded-lg  bg-amber-300 px-4 ')} >
          <Text style={tw('text-zinc-700  font-bold text-center')}>Clear Cart</Text>
  </TouchableOpacity>
       )}
       </ScrollView>
     ) : (
        <View style={tw('flex-1 items-center justify-center')}>
         <Text style={tw('text-2xl font-bold text-[#22e3dd]  my-2')}> No items in the cart</Text>
        </View>
     )}
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})
