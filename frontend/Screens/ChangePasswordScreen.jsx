import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTailwind } from 'tailwind-rn/dist'
import { Button } from '@rneui/base'
import { Alert } from 'react-native'
import { ChangePasswordUser, LoginUser, resetUser } from '../Reducers/Actions/UserAction'
import { useEffect } from 'react'


const ChangePasswordScreen = () => {
  
    const [currentPassword, setCurrentPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const {users, user, userSuccess, userError, message} = useSelector(state => state.USERS)
    const tw = useTailwind()
    const submitFunction = async () => {
        if( !currentPassword ) {
            Alert.alert("please fill all infomation required")
        } else {
            console.log("login successfully")
            setIsLoading(true)
            // must sign in before invoke th method change password because needs the token from auth user
            // await dispatch(ChangePasswordUser({ currentPassword: currentPassword, newPassword: newPassword, confirmPassword: confirmPassword}))
            setIsLoading(false)
            setNewPassword(null)
            setCurrentPassword(null)
            setConfirmPassword(null)
            //navigation.navigate("Home")
         
        }
       
    }
    useEffect(() => {
        if(userError) {
            Alert.alert("login failed")
        }
    }, [dispatch, ChangePasswordUser, userError])
    
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
                <Text style={tw('text-4xl font-bold text-[#007eb9] mt-2 mb-4')}>Change Your Password</Text>
               
                <TextInput onChangeText={(text) => setCurrentPassword(text)} secureTextEntry={true} placeholder='Your currentPassword...' value={currentPassword} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} ></TextInput>

                <TextInput onChangeText={(text) => setNewPassword(text)} secureTextEntry={true} placeholder='Your new password...' value={newPassword} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} ></TextInput>

                <TextInput onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} placeholder='confirm new password..' value={confirmPassword} style={tw('w-full font-bold rounded-full border border-2 border-gray-300 py-2 px-8 text-lg mb-4')} onSubmitEditing={submitFunction}></TextInput>

                <Button buttonStyle={tw(' rounded-full font-bold text-2xl text-white bg-[#007eb9] py-2 px-4')} title="Change Password" onPress={submitFunction}></Button>
            </View>
        </TouchableWithoutFeedback>    
    </SafeAreaView>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})