import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign } from '@expo/vector-icons'; 
import { useCallback } from 'react'
import { getCountries } from '../Reducers/Actions/CountryAction'
import { getCities, getCitiesByCountry } from '../Reducers/Actions/CityAction'
import { useEffect } from 'react'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'
import { Button, Input } from '@rneui/base'
import { Picker } from '@react-native-picker/picker'
import { addBillingAddress, addShippingAddress, resetAddress, updateBillingAddress, updateShippingAddress } from '../Reducers/Actions/AddressAction'
import { Platform } from 'react-native';
import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const BillingAddressScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [street, setStreet] = useState(null)
  const [zipCode, setZipCode] = useState(null)
  const {cities, citySuccess, cityError} = useSelector(state => state.CITIES)
  const {countries, countrySucess, countryError} = useSelector(state => state.COUNTRIES)
  const { shippingAddress, billingAddress, address, addressSuccess, addressError, message, billingAddressStatus,  shippingAddressStatus} = useSelector(state => state.ADDRESSES)
  const dispatch = useDispatch()
  const tw = useTailwind()
    const navigation = useNavigation()
  const loadCountries = useCallback(async () => {
      await dispatch(getCountries())
         
       if(countries && countries.length > 0) {
          console.log(countries[0]["name"])
          setCountry(countries[0]["name"])
           await dispatch(getCitiesByCountry(countries[0]["name"]))
          }
     
  }, [dispatch, countries])

  const loadCitiesByCountry = useCallback(async() => {
      if(country) {
          await dispatch(getCitiesByCountry(country))
      }
      
  }, [country, setCountry, dispatch, cities, countries])

  useEffect(() => {
      setIsLoading(true)
      loadCountries().then(() => setIsLoading(false))
     
  }, [dispatch])

  useEffect(() => {
      setIsLoading(true)
      if(country) {
          loadCitiesByCountry(country).then(() => setIsLoading(false))
      }

  }, [country, setCountry, dispatch])
  useEffect(() => {
      if(addressError) {
          setIsError(true)
      }
  }, [addressError])

  useEffect(() => {
      if(billingAddressStatus && billingAddress) {
          setCity(billingAddress.city)
          setCountry(billingAddress.country)
          setZipCode(billingAddress.zipCode)
          setStreet(billingAddress.street)
      }
     
  }, [dispatch, billingAddress, billingAddressStatus])

  useEffect(() => {
      
      if(updateBillingAddress || updateShippingAddress || addressSuccess || addressError) {
          dispatch(resetAddress())
          setIsError(false)
      }
  }, [updateBillingAddress, updateShippingAddress, addressSuccess, addressError])

  

  const goBackFunction = () => {
       navigation.navigate("ShippingAddress")        
  }

  const submitBillingAddress = async () => {
      
      if(country && city && street && zipCode){
          const form = {
              street: street,
              city: city,
              country: country,
              zipCode: zipCode
          }
        //  console.log(form)
    //     if(updateBillingAddress && billingAddress) {
    //       setIsLoading(true)
    //       await dispatch(updateBillingAddress( billingAddress.id ,form))
    //       setIsLoading(false)   
    //       //navigation.navigate("BillingAddressScreen") 
    //    }    else {
          setIsLoading(true)
          await dispatch(addBillingAddress(form))
          setIsLoading(false)   
          navigation.navigate("PaymentScreen")
    //    }
       setStreet(null)                        
      setZipCode(null)

      } else {
          Alert.alert("please fill in all information")
      }
  }

  
if(isError) {
  return <ErrorComponent></ErrorComponent>
}
if(isLoading) {
  return <LoadingComponent></LoadingComponent>
}
if(!isLoading && countries.length <= 0) {
 return (
  <SafeAreaView style={tw('flex-1 items-center justify-center')}>
      
  <Text style={tw('text-2xl font-bold text-[#007eb9]')}>No countries</Text>
</SafeAreaView >
 )
} 
if(!isLoading && country && cities.length <= 0) {
  return (
   <SafeAreaView style={tw('flex-1 items-center justify-center')}>
       
   <Text style={tw('text-2xl font-bold text-[#007eb9]')}>No countries</Text>
 </SafeAreaView >
  )                                                                                                                                                                                                                                                                                                                                                                                                            
 } 

  
return (
  <SafeAreaView style={tw('flex-1')}>
   
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 200}
    enabled={true} 
    style={tw('flex-1')}>
      <View style={tw('w-full relative py-6 items-center justify-center bg-[#22e3dd]')}>
      
      <Text style={tw('text-2xl font-bold text-zinc-700')}>Enter a Billing Address</Text>
      <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-6 left-2')}>
          <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>
  </View>   
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
      <ScrollView 
      showsVerticalScrollIndicator={false}  
      style={tw('flex-1  px-4 mt-4 mb-2')}>
          <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Country</Text>    
          <View style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-lg  px-4 bg-gray-200 mb-4')}> 
              <Picker
              selectedValue={country}
              onValueChange={(itemValue, itemIndex) => {
                  setCountry(itemValue)
                  console.log(itemValue)
              }}
              dropdownIconColor="white"
               mode={Picker.MODE_DROPDOWN}
          
               >
                  { countries && countries.length > 0 && countries.map(item => <Picker.Item key={item.id} label={item.name} value={item.name}></Picker.Item>)}
               </Picker>
          </View>
            
          <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>City</Text>   
          <View style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-lg  px-4 bg-gray-200 mb-4')}> 
              <Picker
              placeholder='City'
              selectedValue={city}
              onValueChange={(itemValue, itemIndex) => {
                  setCity(itemValue)
                  console.log(itemValue)
              }}
              dropdownIconColor="white"
               mode={Picker.MODE_DROPDOWN}
          
               >
                  { country && cities && cities.length > 0 && cities.map(item => <Picker.Item key={item.id} label={item.name} value={item.name}></Picker.Item>)}
               </Picker>
          </View>
             
          <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Street Address</Text>   
          <TextInput placeholder='Shipping address' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-lg py-2 px-4 bg-gray-200 mb-4')} value={street} onChangeText={(text ) => setStreet(text)}></TextInput>

          <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>ZipCode</Text>   
          <TextInput placeholder='ZipCode' keyboardType='numeric' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-lg py-2 px-4 bg-gray-200 mb-4')} value={zipCode} onChangeText={(text ) => setZipCode(text)} onSubmitEditing={submitBillingAddress}></TextInput>

          <Button onPress={submitBillingAddress} titleStyle={tw('text-zinc-700  text-lg')} title="Proceed to Payment" buttonStyle={tw('w-full font-bold text-black text-lg bg-amber-300 rounded-lg py-4 my-4')}></Button>
          </ScrollView>
          </TouchableWithoutFeedback> 
    </KeyboardAvoidingView>
  </SafeAreaView>
)
}

export default BillingAddressScreen

const styles = StyleSheet.create({})