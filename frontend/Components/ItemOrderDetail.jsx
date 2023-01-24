import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

import { useDispatch } from 'react-redux'

const ItemOrderDetail = ({product}) => {
    const {productId, imageUrl, name, productCode, unitPrice, quantity} = product
    const tw = useTailwind()
    const dispatch = useDispatch()


  return (
    <View style={tw('w-full my-4 rounded-lg border border-2 border-gray-300')}>
    <View style={tw('w-full py-2 px-2 flex flex-row items-start justify-start')}>
      <Image style={tw('w-48 h-48 rounded-lg mr-4')} source={imageUrl ? {uri: imageUrl} : require("../images/4-40004_transparent-nike-shoe-png-png-download.png")}></Image>
      <View style={tw('flex-1  items-start justify-start')}>
          <Text style={tw('text-2xl mb-2')}>{name}</Text>
          
          <Text style={[tw('text-lg font-bold text-zinc-700 my-2')]}>Price:  £{unitPrice}</Text>
          <Text style={[tw('text-lg font-bold text-zinc-700 my-2')]}>Quantity:  {quantity}</Text>

      </View>
    </View>
  </View>
  )
}

export default ItemOrderDetail

const styles = StyleSheet.create({})