import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useStripe, CardForm, useConfirmPayment, CardField } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTailwind } from 'tailwind-rn/dist';
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { getAuthUserCart } from '../Reducers/Actions/CartAction';
import { createOrder } from '../Reducers/Actions/OrderAction';
const PaymentScreen = () => {
    const [isReady, setIsReady] = useState(false)
    const dispatch = useDispatch()
    const [totalPrice, setTotalPrice] = useState(0)
    const tw = useTailwind()
    const {confirmPayment, loading} = useConfirmPayment()
    const {cart, cartSuccess, cartError} = useSelector(state => state.CARTS)
    const {shippingAddress, billingAddress, address, addressSuccess, addressError} = useSelector(state => state.ADDRESSES)
    
    const loadCartByAuth = useCallback(async () => {
        await dispatch(getAuthUserCart())
    }, [dispatch, cart])

    useEffect(() => {
        loadCartByAuth()
    }, [dispatch])

    useEffect(() => {
        if(cart) {
            setTotalPrice(cart.totalPrice)
        }
    }, [dispatch, cart, loadCartByAuth])

    const fetchPaymentIntentClientSecret = async () => {
        const amount = totalPrice;
        if(billingAddress && shippingAddress) {
            const obj = {
                amount: Math.round(amount * 100),
                currency: "EUR"
            }
            
            // const token = await AsyncStorage.getItem("token")
            const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJxdWFuIiwiZXhwIjoxNjc0NzU1MjkzLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXX0.Xqj-r3Koo-vj8QUo49S1hFxRv-3E1YN3GVcFwxjKO4HhuSwYuR3ROvXHyOF5i7x31Na58pHJQgaoTaO5XepWfQ"
            const res = await fetch("http://10.0.2.2:8080/api/orders/createPaymentIntent", {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(obj)
            })
            const paymentIntentResposne = await res.json()
            console.log(paymentIntentResposne)
            return paymentIntentResposne;
        } else {
            Alert.alert("there are missing billing address and shipping address")
            return null;
           
        }
        
    }


    const goBackFunction = () => {
        //navigation.navigate("CartScreen")
    }

    const handlePayPress = async () => {
        
    const billingDetails = {
        email: "abc@gmail.com",
        name: "abc"
    }
    
    const paymentIntentResposne = await fetchPaymentIntentClientSecret();
    if(paymentIntentResposne) {
        const {paymentIntent, error} =   await confirmPayment(paymentIntentResposne.client_secret, {
            paymentMethodType: "Card",
            paymentMethodData: {
                billingDetails: billingDetails
            }
        }) 
        if(error) {
            console.log(error)
            Alert.alert("payment failed")
        } else if(paymentIntent) {
            console.log(paymentIntent)
            Alert.alert("paid successfully")
            dispatch(createOrder(billingAddress.id, shippingAddress.id))
        }    
    }
    };

  return (
    <SafeAreaView style={tw('flex-1 ')}>
        <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 200}
      enabled={true} 
      style={tw('flex-1')}
    >
            <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
                <View style={tw('flex-1')}>
                    <View style={tw('w-full relative py-4 items-center justify-center bg-[#22e3dd]')}>     
                        <Text style={tw('text-2xl font-bold text-white')}>Payment</Text>
                        <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-4 left-2')}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                  
     
                    <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2')}>
                        <CardForm 
                        style={[styles.cardForm, tw('mt-10 text-zinc-700')]}
                        onFormComplete={(Details) => {
                            if(Details.complete) {
                                setIsReady(true)
                            }
                        }}
                        ></CardForm>
                        {/* <CardField
                        style={tw('w-full h-20')}
                        onCardChange={details => {
                            if(details.complete) {
                                setIsReady(true)
                            }
                        }}
                        >

                        </CardField> */}


                        <Button buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#22e3dd] py-2 mt-10 px-4')} titleStyle={tw('text-2xl font-bold')} title="Pay" onPress={handlePayPress} disabled={loading || !isReady}></Button>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
    cardForm: {
        height: 250,
        width: "90%"
    }
})
