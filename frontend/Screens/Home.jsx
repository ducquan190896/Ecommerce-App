import { ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { useNavigation } from '@react-navigation/native'
import HeaderHomeComponent from '../Components/HeaderHomeComponent'
import HomePickerComponent from '../Components/HomePickerComponent'
import { getBrands } from '../Reducers/Actions/BrandAction'
import { getCategories } from '../Reducers/Actions/CategoryAction'
//import Categories from "../DummyData/Categories.json"
//import Brands from "../DummyData/Brands.json"
const Home = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [categoryOption, setCategoryOption] = useState(null)
  const [brandOption, setBrandOption] = useState(null)
  const [nameOption, setNameOption] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [showHome, setShowHome] = useState(false)
  const tw = useTailwind()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {products, product, productSuccess, productError, message: productMessage, updateStatus: updateProductStatus, brandStatus, nameStatus, categoryStatus } = useSelector(state => state.PRODUCTS)
  const {categories, category, categorySuccess, categoryError, message: categoryMessage} = useSelector(state => state.CATEGORIES)
  const {brands, brand, brandSuccess, brandError, message: brandMessage} = useSelector(state => state.BRANDS)
  
  const loadProducts = useCallback(async () => {
   await dispatch(getProducts())
   if(products && products.length > 0) {
    console.log(products)
   }
  }, [dispatch, getProducts])

  const loadBrands = useCallback(async () => {
    await dispatch(getBrands())
    if(brands && brands.length > 0) {
      console.log(brands)
    }
  }, [dispatch, brands])
  
  const loadCategories = useCallback(async () => {
    await dispatch(getCategories())
    if(categories && categories.length > 0) {
      console.log(categories)
    }
  }, [dispatch, categories])
  
  const loadProductsByCategory = async (categoryName) => {
    await dispatch(getProductsByCategory(categoryName))
    if(products) {
      console.log(products)
     }
  }

  const loadProductsByName = async () => {
    if(searchValue) {
      await dispatch(getProductsByName(searchValue))
      setSearchValue(null)
    } 
    
    if(products) {
      console.log(products)
     }
    
  }

  const loadProductsByBrand = async (brandName)=> {
    await dispatch(getProductsByBrand(brandName))
    if(products) {
      console.log(products)
     }
  }


  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     header: () => <HeaderHomeComponent loadProductsByName={loadProductsByName} value={searchValue} setValue={setSearchValue}></HeaderHomeComponent>
  //   })
  // }, [])

  useEffect(() => {
    setIsLoading(true)
    loadCategories().then(() => loadCategories()).then(() => loadBrands()).then(() => loadProducts()).then(() => setIsLoading(false)).catch(err => setIsError(true)) 
    if(brands && brands.length > 0) {
      console.log(brands)
    }
    if(categories && categories.length > 0) {
      console.log(categories)
    }

  }, [dispatch])



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

    <HeaderHomeComponent showHome={showHome} setShowHome={setShowHome} loadProducts={loadProducts} loadProductsByName={loadProductsByName} value={searchValue} setValue={setSearchValue}></HeaderHomeComponent>
    
    <View style={tw('flex-row mx-auto')}>
      {categories && categories.length > 0 && <HomePickerComponent setShowHome={setShowHome}  loadProduct={loadProductsByCategory}  data={categories}></HomePickerComponent>}
      {brands && brands.length > 0 && <HomePickerComponent data={brands} setShowHome={setShowHome}  loadProduct={loadProductsByBrand}  ></HomePickerComponent>}
    </View>
    <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1')}>
    {products && products.length > 0 && products.map(pro =>  <HomeProductDetail item={pro} key={pro.id}></HomeProductDetail>)}
    </ScrollView>
    
   
  
    </SafeAreaView>
  )
}

export default Home
