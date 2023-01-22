import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderHomeComponent from '../Components/HeaderHomeComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getProductsByName } from '../Reducers/Actions/ProductActions'
import DummyProducts from "../DummyData/Products.json"
import { useNavigation, useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'; 
import { useTailwind } from 'tailwind-rn/dist'
import ImageSwipeDot from '../Components/ImageSwipeDot'
import { Button } from '@rneui/base'
import RatingComponent from '../Components/RatingComponent'
import { getReviewByProduct } from '../Reducers/Actions/ReviewAction'
import LoadingComponent from '../Components/LoadingComponent'
import ReviewComponent from '../Components/ReviewComponent'
import { Picker } from '@react-native-picker/picker'




const ProductScreen = () => {
    const [searchValue, setSearchValue] = useState(null)
    const [showHome, setShowHome] = useState(true);
    // const navigation = useNavigation()
    //const params = useRoute()
    const [dot, setDot] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [addingReview, setAddingReview] = useState(false)
    const [reviewDescription, setReviewDescription] = useState(null)
    const [reviewRating, setReviewRating] = useState(5)

    const tw = useTailwind()
    const dispatch = useDispatch()
    const {reviews, review, reviewSuccess, reviewError} = useSelector(state => state.REVIEWS)
    const {products, productSuccess, productError, message: productMessage, updateStatus: updateProductStatus, brandStatus, nameStatus, categoryStatus } = useSelector(state => state.PRODUCTS)
    const images = [
       require( "../images/shoes-wasatch-running-3.png"),
        require("../images/4-40004_transparent-nike-shoe-png-png-download.png"),
        require("../images/airpods.jpg")
    ]

    // replace route params right here
    const testProducts = DummyProducts;
    const product = testProducts[0]

    const loadReviews = useCallback(async () => {
     
        await dispatch(getReviewByProduct(product.id))
    }, [product, dispatch, reviews])

    useEffect(() => {
        console.log(product)
        setIsLoading(true)
        loadReviews().then(() => setIsLoading(false)).catch(() => setIsError(true))
      
    }, [dispatch, product])
  
    const loadProducts = async () => {
        await dispatch(getProducts())
        if(products && products.length > 0) {
         console.log(products)
        }
       }



    const onBackFunction = () => {
          //loadProducts()  
            // navigation.navigate("Home")
      }
      const windowwith = useWindowDimensions().width 

    const onViewableItemsChanged = useCallback(({viewableItems}) => {
        console.log("Visible items are", viewableItems);
       setDot(viewableItems[0].index)
      }, [])

    const addToCart = () => {
        console.log("addToCart")
    }
    const BuyNow = () => {
        console.log("Buy Now")
    }
    const showReviewForm = () => {
        setAddingReview(prev => !prev)
    }
    const addReviewToServer = () => {
   // need auth user token      
        if(!reviewDescription) {
            Alert.alert("please type your description")
        } else {
            const obj ={
                rating: reviewRating,
                description: reviewDescription,
                productId: product.id
            }
            console.log(obj)
            setReviewDescription(null)
            setReviewRating(5)
            setAddingReview(false)
        }
       
    }

    
  if(isError) {
    return <ErrorComponent></ErrorComponent>
  }
  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
  }
  if(!isLoading && reviews.length <= 0) {
   return (
    <SafeAreaView style={tw('flex-1 items-center justify-center')}>
        
    <Text style={tw('text-2xl font-bold text-[#007eb9]')}>No Products</Text>
  </SafeAreaView >
   )
  } 

    
  return (
   <SafeAreaView  style={tw('flex-1')} >
    
     <View style={tw('w-full bg-[#22e3dd] py-2 px-4 flex-row items-center justify-between')}>
         <TouchableOpacity activeOpacity={0.5} onPress={onBackFunction}>
            <AntDesign name="arrowleft" size={40} color="white" />
         </TouchableOpacity>
     </View>
    
     <ScrollView style={tw('flex-1 px-2')} showsVerticalScrollIndicator={false}>
        {product && (
            <View >
                <Text style={tw('text-2xl text-gray-500 font-bold mx-auto my-4')}>{product.name}</Text>
                <FlatList
                data={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="center"
                decelerationRate="fast"
                snapToInterval={windowwith}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 50
                }}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={({item}) => (
                   <Image source={product.imageUrls ? {uri: "http://10.0.2.2:8080/api/images" + item} : item} style={[tw(' rounded-lg'), {width: windowwith, height: 300, resizeMode: "contain"}]}></Image>
                )}
                >
                   
                </FlatList >
                <ImageSwipeDot activeIndex={dot}></ImageSwipeDot>
                <View style={tw('my-2 mb-4 flex-row ml-4 items-start')}>
                    <Text style={tw('text-lg text-black mr-2')}>£</Text>
                    <Text style={[tw('text-4xl text-black font-bold'), product.active ? styles.discount : null]}>{product.price.toFixed(0)}</Text>
                </View>
                {product.active && (
                    <View style={tw('my-2 mb-4 flex-row ml-4 items-center')}>
                      <Text style={tw('text-lg text-black mr-2')}>Disounted price: £</Text>
                      <Text style={tw('text-4xl text-[#22e3dd] font-bold')}>{product.priceDiscounted.toFixed(0)}</Text>
                  </View>
                )}
                <View style={tw('ml-2')}>
                  <RatingComponent rating={product.rating ? product.rating : 5}></RatingComponent>
                </View>
              
                <Text style={tw('text-lg my-2 text-black ml-2')}>{product.description}
                </Text>
                <Text style={tw('text-lg my-2 text-black ml-2')}>Brand: {product.brandName}
                </Text>
                {product.unitsInStock < 20 && <Text style={tw('text-red-500 text-lg my-2 ml-2')}>Only {product.unitsInStock} left in stock - Order soon</Text>}
                <Button onPress={addToCart} title="Add To Cart" buttonStyle={tw('w-full font-bold text-lg bg-amber-300 rounded-lg py-4 my-2')}></Button>
                <Button onPress={BuyNow} title="Buy Now" buttonStyle={tw('w-full font-bold text-lg bg-amber-500 rounded-lg py-4 my-2')}></Button>
                <Text style={tw('text-2xl mt-4 mb-2 text-[#22e3dd] font-bold')}>Reviews</Text>
                <TouchableOpacity onPress={showReviewForm} style={tw('my-2')}>
                  <Text style={tw('text-lg font-bold my-2 text-red-500 ml-2')}>Leave your review
                    </Text>
                </TouchableOpacity>
                {addingReview && (
                    <TouchableWithoutFeedback>
                    <View style={tw('w-full my-2')}>
                        <TextInput style={tw('w-full mb-2 rounded-full bg-gray-200 border-2 border border-gray-400 px-4 py-2')}  onChangeText={(text) => setReviewDescription(text)} placeholder='Your review...' value={reviewDescription}></TextInput>
                        <TextInput ></TextInput>
                        <View style={tw('bg-gray-200 mb-2 w-full rounded-full')}>
                            <Picker
                            selectedValue={reviewRating}
                            onValueChange={(itemValue) => {
                                setReviewRating(itemValue)
                            }}
                            dropdownIconColor="white"
                            mode={Picker.MODE_DROPDOWN}
                            style={tw('text-center font-bold text-lg')}
                            >
                            {[1, 2, 3, 4, 5].map(rate => <Picker.Item key={rate} label={rate.toString()} value={rate}></Picker.Item>)}
                            </Picker>
                        </View>
                        <Button onPress={addReviewToServer} title="Add Review" buttonStyle={tw('w-full font-bold text-lg bg-amber-500 rounded-full py-4 my-2')}></Button>
                    </View>
                    </TouchableWithoutFeedback>
                )}
                {reviews && reviews.length >  0 && reviews.map(rev => <ReviewComponent review={rev}></ReviewComponent>)}
            </View>
        )}
     
    </ScrollView >
   </SafeAreaView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
    discount: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "blue"
      },
    image: {
    
        resizeMode: 'contain',
      },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 40,  
        elevation: 5
    }
})