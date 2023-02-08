import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { Button } from '@rneui/base'
import { Alert } from 'react-native'
import { LoginUser, resetUser } from '../Reducers/Actions/UserAction'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import LoadingComponent from '../Components/LoadingComponent'


const LoginScreen = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const {users, user, userSuccess, userError, message} = useSelector(state => state.USERS)
    const tw = useTailwind()
    const submitFunction = async () => {
        if(!username || !password ) {
            Alert.alert("please fill all infomation required")
        } else {
          
            setIsLoading(true)
        
            await dispatch(LoginUser({username: username, password: password}))
            setIsLoading(false)
            setUsername(null)
            setPassword(null)
            
         
        }
       
    }
    useEffect(() => {
        if(userError) {
            Alert.alert("login failed")
            dispatch(resetUser())
        }
        if(userSuccess) {
            navigation.navigate("AccountScreen")
            dispatch(resetUser())
        }
        
    }, [dispatch,  userError, userSuccess])
    
    // useEffect(() => {
       
    //     if(userSuccess ||userError) {
    //         dispatch(resetUser())
    //     }
    // }, [dispatch ,userSuccess, userError])

   

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
    }
  return (
    <SafeAreaView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')}>
            <View style={tw("flex-1 items-center justify-center px-2")}>
                <Text style={tw('text-4xl font-bold text-[#007eb9] mt-2 mb-4')}>Sign In</Text>
                <TextInput onChangeText={(text) => setUsername(text)} placeholder='Your Username...' value={username} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')}></TextInput>
                <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Your password...' value={password} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} onSubmitEditing={submitFunction}></TextInput>
                <Button buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')} title="Sign In" onPress={submitFunction}></Button>
                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={tw('mt-8')}>
                    <Text style={tw('text-lg font-bold my-2 text-[#007eb9] ml-2')}>don't have an account
                      </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>    
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})