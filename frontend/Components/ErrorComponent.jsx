import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'

const ErrorComponent = () => {
    const tw = useTailwind()
  return (
    <SafeAreaView style={tw('flex-1 items-center justify-center')}>
        
      <Text style={tw('text-2xl font-bold text-[#007eb9]')}>Errors</Text>
    </SafeAreaView >
  )
}

export default ErrorComponent

const styles = StyleSheet.create({})