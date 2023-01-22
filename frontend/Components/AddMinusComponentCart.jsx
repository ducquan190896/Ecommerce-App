import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign } from '@expo/vector-icons'; 
import { useState } from 'react';
import { addToCart, minusFromCart } from '../Reducers/Actions/CartAction';
const AddMinusComponentCart = ({setIsLoading, isLoading, productId, quantity}) => {
   
    const dispatch = useDispatch()
    const tw = useTailwind()

    const addCartFunction = async () => {
        setIsLoading(true)
        await dispatch(addToCart(productId, 1))
        console.log(" plus 1")
        setIsLoading(false)
    }

    const minusCartFunction = async () => {
        setIsLoading(true)
        await dispatch(minusFromCart(productId, 1))
        console.log(" minus 1")
        setIsLoading(false)
    }

  return (
    <View style={tw('flex flex-row w-1/3 border  border-gray-300 rounded-lg items-center justify-center')}>
      <TouchableOpacity activeOpacity={0.5} onPress={minusCartFunction}>
       <AntDesign name="minus" size={24} color="black" style={tw('p-2 rounded-lg bg-gray-200')}/>
      </TouchableOpacity>
      <Text style={tw('text-2xl font-bold text-zinc-700 text-center flex-1')}>{quantity}</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={addCartFunction}>
        <AntDesign name="plus" size={24} color="black" style={tw('p-2 rounded-lg bg-gray-200')}/>
      </TouchableOpacity>
    </View>
  )
}

export default AddMinusComponentCart

const styles = StyleSheet.create({})