import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@rneui/base'
import { logOutUser, resetUser } from '../Reducers/Actions/UserAction'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AccountScreen = () => {

    const tw = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {userSuccess, userError, user, users} = useSelector(state => state.USERS)

    useEffect(() => {
       
        if(userSuccess ||userError) {
            dispatch(resetUser())
        }
    }, [dispatch, userError, userSuccess])
    useEffect(() => {
        if(userSuccess) {
        
            navigation.navigate("HomeStack", {screen: "Home"})
         
        }
        if(userError) {
            Alert.alert("action failed")
            
        }
    }, [userSuccess, userError, dispatch])
    
    const goBackFunction = () => {

    }

    const SignInNavigateFunction = () => {
            navigation.navigate("Login")
    }
    const RegisterNavigateFunction = () => {
          navigation.navigate("Register")
    }
    const LogOutFunction = async () => {
        await dispatch(logOutUser())
        
       
    }
    const changePasswordNavigate =  () => {
        navigation.navigate("ChangePassWord")
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
                        <Text style={tw('text-2xl font-bold text-white')}>Account</Text>
                        <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-4 left-2')}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

     
                    <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-8')}>
                       
                       {!user && (
                        <>
                        <Button onPress={SignInNavigateFunction} title="Sign In" titleStyle={tw('text-lg text-zinc-700')} buttonStyle={tw('mt-20 mb-10 w-full rounded-md bg-amber-300')}></Button>
                       <Button onPress={RegisterNavigateFunction} title="Create Account" titleStyle={tw('text-lg text-zinc-700')} buttonStyle={tw('  w-full mb-10 rounded-md bg-gray-300')}></Button>
                        </>
                       )}


                       {user && (
                          <>
                          <Button onPress={changePasswordNavigate} title="Change Password" titleStyle={tw('text-lg text-zinc-700')} buttonStyle={tw('mt-20  w-full rounded-md bg-amber-300')}></Button>
                        <Button onPress={LogOutFunction} title="Log Out" titleStyle={tw('text-lg text-zinc-700')} buttonStyle={tw('mt-4  w-full rounded-md bg-gray-300')}></Button>
                          </>
                       )}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
}

export default AccountScreen

const styles = StyleSheet.create({})