import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { Button } from '@rneui/base'
import { Alert } from 'react-native'
import { LoginUser, registerUser, resetUser } from '../Reducers/Actions/UserAction'
import { useEffect } from 'react'
import LoadingComponent from '../Components/LoadingComponent'


const RegisterScreen = () => {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {users, user, userSuccess, userError, message} = useSelector(state => state.USERS)
    const tw = useTailwind()
    const submitFunction = async () => {
        if(!username || !password || !email || !confirmPassword ) {
            Alert.alert("please fill all infomation required")
        } else {
            if(password === confirmPassword) {
                Alert.alert("passwords don't match")
            } else {
                setIsLoading(true)
        
                await dispatch(registerUser({username: username, email: email, password: password, confirmPassword: confirmPassword}))
                setIsLoading(false)
                setUsername(null)
                setPassword(null)
                setEmail(null)
                setConfirmPassword(null)
                //navigation.navigate("Home")
             
            }
           
        }
       
    }
    useEffect(() => {
        if(userError) {
            Alert.alert("login failed")
        }
    }, [dispatch, registerUser, userError])

    useEffect(() => {
        if(userSuccess ||userError) {
            dispatch(resetUser())
        }
    }, [userSuccess, userError])

    useEffect(() => {
        if(user && userSuccess) {
            console.log(user)
        }
    }, [user, userSuccess, dispatch])

    if(isLoading) {
        return <LoadingComponent></LoadingComponent>
    }

  return (
    <SafeAreaView style={tw('flex-1')}>
        <TouchableWithoutFeedback style={tw('flex-1')}>
            <View style={tw("flex-1 items-center justify-center px-2")}>
                <Text style={tw('text-4xl font-bold text-[#007eb9] mt-2 mb-4')}>Sign Up</Text>
                <TextInput onChangeText={(text) => setUsername(text)} placeholder='Your Username...' value={username} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')}></TextInput>
                <TextInput onChangeText={(text) => setEmail(text)} placeholder='Your email...' value={email} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')}></TextInput>
                <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Your password...' value={password} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} ></TextInput>
                <TextInput onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} placeholder='confirm your password...' value={confirmPassword} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} onSubmitEditing={submitFunction}></TextInput>
                <Button buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')} title="Sign Up" onPress={submitFunction}></Button>
            </View>
        </TouchableWithoutFeedback>    
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})
