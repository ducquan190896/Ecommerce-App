import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign } from '@expo/vector-icons'
import { useEffect } from 'react'
import { Button, Switch } from '@rneui/base'
import { resetProducts, updateProduct } from '../Reducers/Actions/ProductActions'
import { Alert } from 'react-native'

const UpdateProductScreenAdmin = () => {
    // const params = useRoute()
    // const {item} = params
    const item = {
        active: false, 
        brandName: "new balance", 
        categoryName: "glove", 
        description: "football glove for goalkeeper", 
        id: 6, 
        imageUrls: null, 
        name: "goalkeeper gloves Neuer", 
        price: 200, 
        priceDiscounted: 0, 
        productCode: "000116", 
        rating: null, 
        unitsInStock: 100
        }
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [active, setActive] = useState(item.active)
    const [unitsInStock, setUnitsInStock] = useState(item.unitsInStock.toString())
    const [price, setPrice] = useState(item.price.toString())
    const [description, setDescription] = useState(item.description)
    const [priceDiscounted, setPriceDiscounted] = useState(item.priceDiscounted.toString()) 
    const [name, setName] = useState(item.name)

    const tw = useTailwind()
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const {products, updateStatus, updatedProduct, product, productSuccess, productError, message: productMessage, updateStatus: updateProductStatus, brandStatus, nameStatus, categoryStatus } = useSelector(state => state.PRODUCTS)

    // useEffect(() => {
    //     if(item) {
    //         setActive(item.active)
    //         setUnitsInStock(item.unitsInStock.toString())
    //         setPrice(item.price.toString())
    //         setPriceDiscounted(item.priceDiscounted.toString())
    //         setName(item.name)
    //         setDescription(item.description)
    //     }
    // }, [ item])

    const goBackFunction = () => {
        //navigation.navigate("")
    }

    const changeDiscountedStatus = (value) => {
        setActive(value)
    }
    useEffect(() => {
        if(productSuccess) {
            Alert.alert("updated successfully")
        }
        if(productError) {
            setIsError(true)
            alert.alert("updating failed")
        }
        if(productSuccess || productError) {
            setTimeout(() => {
                dispatch(resetProducts())
            }, 3000);
        }

    }, [productSuccess, productError])

    useEffect(() => {
        if(isError) {
            setTimeout(() => {
                setIsError(false)
            }, 3000);
        }
    }, [isError, setIsError])

    const submitFunction = async () => {
        const form = {
            active: active,
            unitsInStock: +unitsInStock,
            price: +price,
            description: description,
            name: name,
            priceDiscounted: +priceDiscounted

        }
        setIsLoading(true)
        await dispatch(updateProduct(item.id, form))
        setIsLoading(false)

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
                <View style={tw('w-full relative  py-4 pt-8 items-center justify-center bg-[#22e3dd]')}>     
                    <Text style={tw('text-2xl font-bold text-zinc-700')}>Update Product</Text>
                    <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-8 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    
                </View>
                
 
                <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1')}>
                    <View style={tw("flex-1 items-center justify-center px-2 my-4")}>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}> Name</Text>   
                            <TextInput placeholder='Shipping address' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={name} onChangeText={(text ) => setName(text)}></TextInput>
                        </View>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Description</Text>   
                            <TextInput placeholder='Shipping address' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={description} onChangeText={(text ) => setDescription(text)}></TextInput>
                        </View>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Price</Text>   
                            <TextInput keyboardType='numeric' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={price} onChangeText={(text ) => setPrice(text)}></TextInput>
                        </View>
                        <View style={tw('flex px-2 w-full flex-row items-center')}>
                            <Text style={tw(' mr-10 font-bold text-lg text-zinc-700')}>Discounted status</Text>   
                            <Switch value={active} onValueChange={(value) => setActive(!active)}></Switch>
                        </View>

                      
                         
                       {active && (
                         <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Discounted Price</Text>   
                             <TextInput keyboardType='numeric'  style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={priceDiscounted} onChangeText={(text) => setPriceDiscounted(text)}></TextInput>
                        </View>
                       )}
                        
                    
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Units In Stock</Text>   
                            <TextInput keyboardType='numeric' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={unitsInStock} onChangeText={(text ) => setUnitsInStock(text)} onSubmitEditing={submitFunction}></TextInput>
                        </View>
                        
                        
                        
                        <Button buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')} title="update" onPress={submitFunction}></Button>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default UpdateProductScreenAdmin

const styles = StyleSheet.create({})