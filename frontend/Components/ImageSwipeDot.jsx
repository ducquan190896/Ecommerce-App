import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'

const ImageSwipeDot = ({activeIndex}) => {
    const tw = useTailwind()
    const dots = [1, 2, 3]

  return (
    <View style={tw('w-full my-2 flex-row items-center justify-center')}>
      
      {dots.map((dot, index) => <View key={index} style={tw(`w-4 h-4 rounded-full mx-2 ${index == activeIndex ? "bg-gray-500" : "bg-gray-200"}`)}></View>)}
    </View>
  )
}

export default ImageSwipeDot

const styles = StyleSheet.create({})