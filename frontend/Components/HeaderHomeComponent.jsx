import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import { getProducts } from '../Reducers/Actions/ProductActions';
const HeaderHomeComponent = ({showHome, setShowHome, value, setValue, loadProductsByName, loadProducts}) => {
    // const [showHome, setShowHome] = useState(false)
    const tw = useTailwind()
    const dispatch = useDispatch()
    const loadProductsByComponent =  () => {
      
         loadProducts()
        setShowHome(prev => !prev)
       }

  return (
    <SafeAreaView style={tw('w-full bg-[#22e3dd] py-2 px-4 flex-row items-center justify-center')}>
    {showHome && (
          <TouchableOpacity style={tw('mr-4')} onPress={loadProductsByComponent}>
          <Entypo name="home" size={36} color="white" /> 
        </TouchableOpacity>
    )}
      <View style={tw('bg-white flex-row rounded-md py-2 px-2 flex-1')}>
      
        <TouchableOpacity onPress={() => {
            setShowHome(prev => !prev)
            loadProductsByName()
            }}>
        <AntDesign name="search1" size={28} color="black" />
        </TouchableOpacity>
        <TextInput style={tw('flex-1 ml-4 text-base')} placeholder="search your products...." value={value} onChangeText={(text) => setValue(text)}></TextInput>
      </View>
    </SafeAreaView>
  )
}

export default HeaderHomeComponent

const styles = StyleSheet.create({})