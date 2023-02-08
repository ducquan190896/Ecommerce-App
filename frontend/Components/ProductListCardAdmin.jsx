import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityComponent, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

import RatingComponent from './RatingComponent'
import { Foundation } from '@expo/vector-icons'; 
import { Button } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { openUpdateStatus } from '../Reducers/Actions/ProductActions';
import { useNavigation } from '@react-navigation/native';


const ProductListCardAdmin = ({item}) => {
    const tw = useTailwind()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const navigateToProductFunction = () => {
      // navigation.navigate("ProductScreen", {productId : item.id})
    }

    const updatefunction = () => {
        dispatch(openUpdateStatus(item))
        console.log(item)
        navigation.navigate("AdminProductUpdate", {item: item})
    }

  return (
     <TouchableOpacity onPress={navigateToProductFunction} activeOpacity={0.5} style={[tw('w-full  my-2 rounded-lg flex-row border border-gray-200 border-2 items-center justify-between'), styles.boxWithShadow]}>
   
        <Image source={item && item.imageUrls && item.imageUrls.lenght > 0 ? {uri: item.imageUrls[0]} : require("../images/shoes-wasatch-running-3.png")} style={[tw('w-1/2 h-48 rounded-lg'), styles.image]}></Image> 
       
        
        <View style={tw('pl-4 py-2 flex-1 items-start justify-center')}>
            <Text style={tw('text-lg font-bold text-[#111111] mb-2')}>{item.name}</Text>
            {item.rating != null ? <RatingComponent rating={item.rating}></RatingComponent> : <RatingComponent rating={5}></RatingComponent>}

            <View style={tw('mb-2 flex flex-row items-center justify-center')}>
                <Text style={[tw('text-base ')]} >Price:  </Text>  
                {!item.active ?  <Text style={[tw('text-2xl font-bold')]}>{item.price} </Text> : <Text style={[tw('text-2xl font-bold'), styles.discount]}>£ {item.price} </Text>}           
              
             </View>
           
             {item.active && (
              <View style={tw('flex-row items-center justify-end')}>
                <Foundation name="burst-sale" size={60} color='#92DE59'  />
                <View style={tw('bg-[#92DE59] px-2 py-2 rounded-lg ml-4')}>
                  <Text style={tw('text-2xl font-bold text-white text-center')}>£{item.priceDiscounted}</Text>
                </View>
              </View>
             )}
              <Button onPress={updatefunction} titleStyle={tw('text-zinc-700  text-lg ')} title="update" buttonStyle={tw(' bg-amber-300 text-center rounded-lg py-2 my-2 px-4 text-center')} containerStyle={tw('')}></Button>
         </View>
     </TouchableOpacity>
   
  )
}

export default ProductListCardAdmin

const styles = StyleSheet.create({
    discount: {
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      textDecorationColor: "#007eb9"
    },
    image: {
      
      resizeMode: 'contain',
    },
    boxWithShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0.5, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 40,  
      elevation: 5
  }
  })
