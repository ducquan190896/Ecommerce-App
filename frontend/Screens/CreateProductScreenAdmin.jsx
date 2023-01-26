import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { AntDesign } from '@expo/vector-icons'
import { useEffect } from 'react'
import { Button, Switch } from '@rneui/base'
import { createProduct, resetProducts, updateProduct } from '../Reducers/Actions/ProductActions'
import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateProductScreenAdmin = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [active, setActive] = useState(false)
    const [unitsInStock, setUnitsInStock] = useState("0")
    const [price, setPrice] = useState("0")
    const [description, setDescription] = useState(null)
    const [name, setName] = useState(null)
    const [brand, setBrand] = useState(null)
    const [category, setCategory] = useState(null)
    const [images, setImages] = useState([])

    const tw = useTailwind()
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const {products, updateStatus, updatedProduct, product, productSuccess, productError, message: productMessage, updateStatus: updateProductStatus, brandStatus, nameStatus, categoryStatus } = useSelector(state => state.PRODUCTS)

  

    const goBackFunction = () => {
        //navigation.navigate("")
    }

    useEffect(() => {
        if(productSuccess) {
            Alert.alert("updated successfully")
        }
        if(productError) {
            setIsError(true)
            Alert.alert("updating failed")
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

    useEffect(() => {
        if(images && images.length > 0) {
            console.log(images)
        }
    }, [images, setImages])

    const uploadImages = async () => {
        const images = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            allowsMultipleSelection: true,
            selectionLimit: 3,
            aspect: [4, 3],
            quality: 1,
          })
          console.log(images)
          const token = await AsyncStorage.getItem("token")
        // const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY3NDc3NjI1MSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.6BaJXyrg4JwjRv4KLt-ALaobpfdvBDmHwUpsc6np7CzgT_aOHVqzDjpfXwrs47r0mEPSKGWqeNjtO51_lDFICg"

        const formdata = new FormData()
        let n = 0;

        if(!images.canceled) {
            while(n < images.assets.length) {
                const split = images.assets[n].uri.split('/')
                const fileNameDot = split[split.length - 1].split(".")
                const fileName = fileNameDot[0]
                const imageFile = {
                    uri: images.assets[n].uri,
                    type: images.assets[0].type + "/" + fileNameDot[1],
                    name: fileName
                }
                console.log(n)
                console.log(imageFile)
              await  formdata.append("file", imageFile)
              n++;
            }
        }

        const res = await fetch("http://10.0.2.2:8080/api/images/uploadImages", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            },
            body: formdata
        })
        const listResponse = await res.json()
        setImages(listResponse)
          

    }

    const submitFunction = async () => {
        const form = { 
            unitsInStock: +unitsInStock,
            price: +price,
            description: description,
            name: name,
            brandName: brand,
            categoryName: category
        }
        if(images && images.length > 0) {
            form.imageUrls = images
        }
        setIsLoading(true)
        await dispatch(createProduct(form))
        setIsLoading(false)
        setName(null)
        setDescription(null)
        setCategory(null)
        setBrand(null)
        setPrice("0")
        setUnitsInStock("0")
        setImages([])
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
                    <Text style={tw('text-2xl font-bold text-zinc-700')}>Create Product</Text>
                    <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-8 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    
                </View>
                
 
                <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1')}>
                    <View style={tw("flex-1 items-center justify-center px-2 my-4")}>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}> Name</Text>   
                            <TextInput placeholder='name' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={name} onChangeText={(text ) => setName(text)}></TextInput>
                        </View>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Description</Text>   
                            <TextInput placeholder='Description' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={description} onChangeText={(text ) => setDescription(text)}></TextInput>
                        </View>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Price</Text>   
                            <TextInput keyboardType='numeric' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={price} onChangeText={(text ) => setPrice(text)}></TextInput>
                        </View>
                       
 
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}>Units In Stock</Text>   
                            <TextInput keyboardType='numeric' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={unitsInStock} onChangeText={(text ) => setUnitsInStock(text)} onSubmitEditing={submitFunction}></TextInput>
                        </View>
                        
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}> Brand</Text>   
                            <TextInput placeholder='Brand' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={brand} onChangeText={(text ) => setBrand(text)}></TextInput>
                        </View>

                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}> Category</Text>   
                            <TextInput placeholder='Category' style={tw('w-full rounded-md border border-gray-300 text-zinc-700 font-bold text-base py-2 px-4 bg-gray-200 mb-4')} value={category} onChangeText={(text ) => setCategory(text)}></TextInput>
                        </View>
                        <View style={tw('flex w-full items-start justify-center')}>
                            <Text style={tw('ml-2 mb-2 font-bold text-lg text-zinc-700')}> Images</Text>
                            <Button onPress={uploadImages} buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')} containerStyle={tw('w-full')} title="Add images"></Button> 
                        </View>

                        <Button buttonStyle={tw(' mt-10 rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')}  containerStyle={tw('w-full')} title="Create Product" onPress={submitFunction}></Button>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default CreateProductScreenAdmin

const styles = StyleSheet.create({})

