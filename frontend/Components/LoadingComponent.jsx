import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoadingComponent = () => {
    const tw = useTailwind()
    return (
      <SafeAreaView style={tw('flex-1 items-center justify-center')}>
          
      
        <ActivityIndicator size={"large"}  color="#007eb9"></ActivityIndicator>
      </SafeAreaView >
    )
}

export default LoadingComponent

const styles = StyleSheet.create({})