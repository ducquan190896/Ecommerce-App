import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useTailwind } from 'tailwind-rn/dist';

const RatingComponent = ({rating}) => {
    const tw = useTailwind()
    const arr = [1, 2, 3, 4, 5]
  return (
    <View style={tw('w-full flex flex-row mb-2')}>
      {arr.map((rate, index) => {
        if(rating >= rate) {
            return <AntDesign key={index} name="star" size={24} color="#e47911"  style={tw('mr-2')}/>
        }
      })}
    </View>
  )
}

export default RatingComponent

const styles = StyleSheet.create({})