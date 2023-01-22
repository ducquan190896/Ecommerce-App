import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import AddMinusComponentCart from './AddMinusComponentCart'
import { useDispatch } from 'react-redux'
import { minusFromCart } from '../Reducers/Actions/CartAction'



const ItemCart = ({setIsLoading, isLoading,item}) => {
    const {id, product, quantity, orderId, ordered} = item
    const tw = useTailwind()
    const dispatch = useDispatch()
    const deleteItem = async () => {
        setIsLoading(true)
        await dispatch(minusFromCart(product.id, quantity))
        setIsLoading(false)
    }

  return (
    <View style={tw('w-full my-2 rounded-lg border border-2 border-gray-300')}>
      <View style={tw('w-full py-2 px-2 flex flex-row items-start justify-start')}>
        <Image style={tw('w-48 h-48 rounded-lg mr-4')} source={product.imageUrls && product.imageUrls.length > 0 ? {uri: product.imageUrls[0]} : require("../images/4-40004_transparent-nike-shoe-png-png-download.png")}></Image>
        <View style={tw('flex-1  items-start justify-start')}>
            <Text style={tw('text-2xl mb-2')}>{product.name}</Text>
            <Text style={tw('text-lg mb-2')}>{product.description}</Text>
            <Text style={[tw('text-lg font-bold text-red-500 my-2'), product.active ? styles.discount : null ]}> £ {product.price}</Text>
            {product.active && (                   
                      <Text style={tw('text-lg mb-2 text-green-400  font-bold')}> Disounted price: £ {product.priceDiscounted.toFixed(0)}</Text>
                )}
            {product.unitsInStock < 20 ? (
                <Text style={tw('text-red-500 text-base mb-2')}>Only {product.unitsInStock} left in stock - Order now</Text>
            ) : (
                <Text style={tw('text-green-400 font-bold  text-base mb-2')}>In Stock</Text>
            )}
        </View>
      </View>
      <View style={tw('w-full flex flex-row items-center justify-between px-2 my-2')}>
            <AddMinusComponentCart setIsLoading={setIsLoading} isLoading={isLoading} productId={product.id} quantity={quantity}></AddMinusComponentCart>
            
            <TouchableOpacity onPress={deleteItem} activeOpacity={0.5}  style={tw(' py-2 rounded-lg border border-2 bg-white px-4 border-gray-300 ')} >
                <Text style={tw('text-zinc-800 font-bold')}>Delete</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemCart

const styles = StyleSheet.create({
    discount: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "blue"
      },
})