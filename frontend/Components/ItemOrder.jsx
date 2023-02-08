import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

const ItemOrder = ({item}) => {
    const tw = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {id, username, email, trackingNumber, status, totalPrice, totalQuantity, dateCreated, dateUpdated} = item


    const navigateScreenFunction = () => {
        navigation.navigate("OrderDetail", {orderId: id})
    }

  return (
    <View  style={tw('relative py-2 px-2 mb-4 rounded-lg border border-gray-300 items-start justify-start')}>
      <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
        <View style={tw('w-1/3')}>
            <Text style={tw(' text-lg font-bold text-zinc-700')}>Tracking Number : </Text>
        </View>
         <Text style={tw(' flex-1 text-base text-gray-500 ml-4')}>{trackingNumber}</Text>
      </View>
      <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
        <View style={tw('w-1/3')}>
            <Text style={tw(' text-lg font-bold text-zinc-700')}>totalPrice : </Text>
        </View>
         <Text style={tw(' flex-1 text-lg font-bold text-zinc-700 ml-4')}>£{totalPrice}</Text>
      </View>
      <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
        <View style={tw('w-1/3')}>
            <Text style={tw(' text-lg font-bold text-zinc-700')}>totalQuantity : </Text>
        </View>
         <Text style={tw(' flex-1 text-lg font-bold text-zinc-700 ml-4')}>{totalQuantity}</Text>
      </View>
      <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
        <View style={tw('w-1/3')}>
            <Text style={tw(' text-lg font-bold text-zinc-700')}>Order date : </Text>
        </View>
         <Text style={tw(' flex-1 text-lg  text-gray-500 ml-4')}>{moment(dateCreated).format("DD/MM/YYYY")}</Text>
      </View>
      <TouchableOpacity onPress={navigateScreenFunction} style={tw('absolute top-20 right-2 py-4 px-4')}>
            <AntDesign name="right" size={30} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default ItemOrder

const styles = StyleSheet.create({})