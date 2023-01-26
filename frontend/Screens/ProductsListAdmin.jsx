import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getProductsByBrand, getProductsByCategory, getProductsByName } from '../Reducers/Actions/ProductActions'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'
import { useTailwind } from 'tailwind-rn/dist'
import HomeProductDetail from '../Components/HomeProductDetail'
import { Image } from '@rneui/base'
import DummyProducts from "../DummyData/Products.json"
// import { useNavigation } from '@react-navigation/native'
import HeaderHomeComponent from '../Components/HeaderHomeComponent'
import HomePickerComponent from '../Components/HomePickerComponent'
import { getBrands } from '../Reducers/Actions/BrandAction'
import { getCategories } from '../Reducers/Actions/CategoryAction'
import { Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import ProductListCardAdmin from '../Components/ProductListCardAdmin'
//import Categories from "../DummyData/Categories.json"
//import Brands from "../DummyData/Brands.json"

const ProductsListAdmin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [nameOption, setNameOption] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [showHome, setShowHome] = useState(false)
    const tw = useTailwind()
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const {products, product, productSuccess, productError, message: productMessage, updateStatus: updateProductStatus, brandStatus, nameStatus, categoryStatus } = useSelector(state => state.PRODUCTS)
  
    
    const loadProducts = useCallback(async () => {
     await dispatch(getProducts())
     if(products && products.length > 0) {
      console.log(products)
     }
    }, [dispatch, getProducts])
  

   
   
  
    const loadProductsByName = async () => {
      if(searchValue) {
        await dispatch(getProductsByName(searchValue))
        setSearchValue(null)
      } 
      
      if(products) {
        console.log(products)
       }
      
    }
  
  
  
  
    useEffect(() => {
      setIsLoading(true)
      loadProducts().then(() => setIsLoading(false)).catch(err => setIsError(true)) 
      
    }, [dispatch])
  
    
    const goBackFunction = () => {
        //navigation.navigate("")
    }

  
    if(isError) {
      return <ErrorComponent></ErrorComponent>
    }
    if(isLoading) {
      return <LoadingComponent></LoadingComponent>
    }
    if(!isLoading && products.length <= 0) {
     return (
      <SafeAreaView style={tw('flex-1 items-center justify-center')}>
          
      <Text style={tw('text-2xl font-bold text-[#007eb9]')}>No Products</Text>
    </SafeAreaView >
     )
    } 
    
   
    
    return (
      <SafeAreaView style={tw('flex-1 ')}>
        <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 200}
      enabled={true} 
      style={tw('flex-1')}
    >
            <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
                <View style={tw('flex-1')}>
                    <View style={tw('w-full relative py-4 items-center justify-center bg-[#22e3dd]')}>     
                        <Text style={tw('text-2xl font-bold text-zinc-700')}>Manage Products</Text>
                        <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-4 left-2')}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-4 right-4')}>
                            <AntDesign name="addfolder" size={40} color="black" />
                        </TouchableOpacity>

                    </View>
                    <HeaderHomeComponent showHome={showHome} setShowHome={setShowHome} loadProducts={loadProducts} loadProductsByName={loadProductsByName} value={searchValue} setValue={setSearchValue}></HeaderHomeComponent>
      
     
                    <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1')}>
                    {products && products.length > 0 && products.map(pro =>  <ProductListCardAdmin item={pro} key={pro.id}></ProductListCardAdmin>)}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default ProductsListAdmin

const styles = StyleSheet.create({})