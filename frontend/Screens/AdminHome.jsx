import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import { resetUser } from '../Reducers/Actions/UserAction'
import { resetProducts } from '../Reducers/Actions/ProductActions'


const AdminHome = () => {
    const tw = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {user, userSuccess, userError} = useSelector(state => state.USERS)
    const {products, productSuccess, productError} = useSelector(state => state.PRODUCTS);
    
    useEffect(() => {
      if(userSuccess ||userError) {
        dispatch(resetUser())
      }

    }, [userSuccess, userError])

      
    useEffect(() => {
      if(productSuccess ||productError) {
        dispatch(resetProducts())
      }

    }, [productSuccess, productError])
    

    const goAdminUsersScreen = () => {
        navigation.navigate("AdminUsers")
   }
   const goAdminProductsScreen = () => {
        navigation.navigate("AdminProducts")
   }
   const GoAdminOrdersScreen = () => {
        navigation.navigate("AdminOrders")
   }

  return (
    <SafeAreaView style={tw('flex-1')}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 200}
        enabled={true} 
        style={tw('flex-1')}
      >
        <TouchableWithoutFeedback style={tw('flex-1')} onPress={Keyboard.dismiss}>
        <View style={tw('flex-1')}>
           <View style={tw('w-full relative py-2 items-center justify-center bg-[#22e3dd]')}>     
                    <Text style={tw('text-2xl font-bold text-zinc-700')}>Admin</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2 pt-4 pb-6 mb-4')}>
                <TouchableOpacity onPress={goAdminUsersScreen} activeOpacity={0.5} style={[tw('w-40 h-40  items-center  mb-8 mx-auto rounded-lg bg-gray-200  items-center justify-center'), styles.boxWithShadow]}>
                    <Text style={[tw('text-2xl font-bold mb-4'), {color: "#22e3dd"}]}>Users</Text>
                    <FontAwesome5 name="users" size={40} color="#22e3dd" />
                </TouchableOpacity>
                <TouchableOpacity onPress={goAdminProductsScreen} activeOpacity={0.5} style={[tw('w-40 h-40  items-center mb-8 mx-auto rounded-lg bg-gray-200  items-center justify-center'), styles.boxWithShadow]}>
                    <Text style={[tw('text-2xl font-bold mb-4'), {color: "#22e3dd"}]}>Products</Text>
                    <AntDesign name="CodeSandbox" size={40} color="#22e3dd" />
                </TouchableOpacity>
                <TouchableOpacity onPress={GoAdminOrdersScreen} activeOpacity={0.5} style={[tw('w-40 h-40  items-center mb-4 mx-auto rounded-lg bg-gray-200  items-center justify-center'), styles.boxWithShadow]}>
                    <Text style={[tw('text-2xl font-bold mb-4'), {color: "#22e3dd"}]}>Orders</Text>
                    <AntDesign name="copy1" size={40} color="#22e3dd" />
                </TouchableOpacity>
            </ScrollView>
            
        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AdminHome

const styles = StyleSheet.create({
    boxWithShadow: {
        shadowColor: "#000",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 2,
        shadowRadius: 10,
        elevation: 4
    }
})