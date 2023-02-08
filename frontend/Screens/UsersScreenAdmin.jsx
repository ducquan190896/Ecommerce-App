import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react'
import { Button, Input } from '@rneui/base'
import { useCallback } from 'react'
import { useEffect } from 'react'
import ErrorComponent from '../Components/ErrorComponent'
import LoadingComponent from '../Components/LoadingComponent'
import { getListUsers, getListUsersBySearchingName, resetUser } from '../Reducers/Actions/UserAction'
import ListUserItemAdmin from '../Components/ListUserItemAdmin'
import { useNavigation } from '@react-navigation/native'

const UsersScreenAdmin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [name, setName] = useState(null)
  const tw = useTailwind()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {users, user, userSuccess, userError, message: userMessage} = useSelector(state => state.USERS)

  const loadUsers = useCallback(async () => {
    await dispatch(getListUsers())
  }, [dispatch, users])

  const loadUsersByName = useCallback(async () => {
    await dispatch(getListUsersBySearchingName(name))
  }, [dispatch, setName, name, users])

  useEffect(() => {
    setIsLoading(true)
    loadUsers().then(() => setIsLoading(false))
  }, [dispatch])

  // useEffect(() => {
  //   if(name == null) {
  //     setIsLoading(true)
  //     loadUsers().then(() => setIsLoading(false))
  //   }
  // }, [name, setName, dispatch])

  // useEffect(() => {
  //   if(users && users.length > 0) {
  //     console.log("check user state")
  //     console.log(users)
  //   }
  // }, [dispatch, users])

  useEffect(() => {
      if(userError ||userSuccess) {
        dispatch(resetUser())
      }
      
  }, [userError, userSuccess])

  useEffect(() => {
    if(userError) {
      setIsError(true)
    }
  }, [userError])



  useEffect(() => {
    if(isError) {
      setTimeout(() => {
        setIsError(false)
      }, 3000);
    }
  }, [setIsError, isError])
  

  const goBackFunction = () => {
    navigation.navigate("AdminHome")
} 
  const searchFunction = async () => {
    
    console.log("search users")
    setIsLoading(true)
  if(name) {
    await  loadUsersByName()
  } else {
    await loadUsers()
  }
   setIsLoading(false)
   
  }

  if(isError) {
    return <ErrorComponent></ErrorComponent>
  }
  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
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
            <Text style={tw('text-2xl font-bold text-zinc-700')}>Manage Users</Text>
            <TouchableOpacity onPress={goBackFunction} activeOpacity={0.5} style={tw('absolute top-2 left-2')}>
                        <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>

          </View>
          <View style={tw('relative w-full py-4 px-4 flex-row items-center justify-center')}>
              <TouchableOpacity style={tw('absolute left-6 z-10')} onPress={searchFunction}>
                <AntDesign name="search1" size={34} color="black" />
              </TouchableOpacity>
              <TextInput value={name} onChangeText={text => setName(text)} style={tw('flex-1 rounded-full border border-gray-300 text-lg border-2 py-2 px-6 pl-20')} placeholder="enter user name..."></TextInput>
          </View> 
          <ScrollView showsVerticalScrollIndicator={false} style={tw('flex-1 px-2 pt-4 pb-2')}>
           {!isLoading && users.length <= 0 &&  <Text style={tw('text-2xl w-full text-center font-bold text-red-500')}>No users</Text>}
            {users && users.length > 0 && users.filter(usa => usa.id != user.id).map(us => <ListUserItemAdmin key={us.id} user={us}></ListUserItemAdmin>)}
          </ScrollView>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default UsersScreenAdmin

const styles = StyleSheet.create({})