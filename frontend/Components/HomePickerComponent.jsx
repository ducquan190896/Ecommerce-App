import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useTailwind } from 'tailwind-rn/dist'

const HomePickerComponent = ({data, loadProduct, setShowHome}) => {
    const [value, setValue] = useState(data[0].name)
    const tw = useTailwind()
    useEffect(() => {
        
      
    }, [setValue])
    

  return (
    <View style={tw('w-40 bg-white border border-gray-300 border-2 rounded-lg my-2 mx-2')}>
    <Picker
    selectedValue={value}
    onValueChange={ (itemValue, itemIndex) =>
      {
    setValue(itemValue)
    setShowHome(true)
    loadProduct(itemValue)
    }
    }
    dropdownIconColor="white"
    mode={Picker.MODE_DROPDOWN}
    style={tw('text-center font-bold text-lg')}  
    >
        {data && data.length > 0 && data.map(item =>  <Picker.Item key={item.id} label={item.name} style={tw('w-full')} value={item.name} />)}
        </Picker>
     </View>
  )
}

export default HomePickerComponent

const styles = StyleSheet.create({})