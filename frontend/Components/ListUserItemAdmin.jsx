import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import { useDispatch } from 'react-redux'
import { Button } from '@rneui/base'
import { AntDesign } from '@expo/vector-icons'; 
import { updateUserToAdmin } from '../Reducers/Actions/UserAction'
import { useState } from 'react'
import LoadingComponent from './LoadingComponent'
import { useNavigation } from '@react-navigation/native'

const ListUserItemAdmin = ({user}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const tw = useTailwind()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {email, username, id, role} = user

    const navigateFunctionToOrderByUserId = () => {
        navigation.navigate("AdminOrdersOfUser", {userId: id, username: username})
    }
    const updateToAdminFunction =  () => {
        setIsLoading(true)
         dispatch(updateUserToAdmin(id)).then(() => setIsLoading(false)).catch(err => Alert.alert("updating failed")) 
    
    }


    
 
  if(isLoading) {
    return <LoadingComponent></LoadingComponent>
  }

  return (
    <View  style={tw('relative py-2 px-4 mb-4 rounded-lg border border-gray-300 items-start justify-start w-full')}>
    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
      <View style={tw('w-1/3')}>
          <Text style={tw(' text-lg font-bold text-zinc-700')}>User Name : </Text>
      </View>
       <Text style={tw(' flex-1 text-base text-gray-500 ml-4')}>{username}</Text>
    </View>
    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
      <View style={tw('w-1/3')}>
          <Text style={tw(' text-lg font-bold text-zinc-700')}>Email : </Text>
      </View>
       <Text style={tw(' flex-1 text-lg  text-zinc-700 ml-4')}>{email}</Text>
    </View>
    <View style={tw('mb-4 w-full flex-row items-start justify-between')}>
      <View style={tw('w-1/3')}>
          <Text style={tw(' text-lg font-bold text-zinc-700')}>Role of user : </Text>
      </View>
       <Text style={tw(' flex-1 text-lg  text-zinc-700 ml-4')}>{role}</Text>
    </View>
    {role == "USER" && (
        <TouchableOpacity onPress={updateToAdminFunction} style={tw('w-full rounded-lg px-4 my-2 mb-4 flex flex-row items-center justify-evenly bg-amber-300 py-2 ')}>
            <Text style={tw('text-zinc-700 font-bold  text-lg flex-1 text-center')}>Update To Admin</Text>
            
        </TouchableOpacity>
    )}
    <TouchableOpacity onPress={navigateFunctionToOrderByUserId} style={tw('w-full rounded-lg px-4 my-2 flex flex-row items-center justify-evenly bg-amber-300 py-2 ')}>
        <Text style={tw('text-zinc-700 font-bold  text-lg flex-1 text-center')}>View  Orders</Text>
        <AntDesign name="right" size={30} color="black"  style={tw('')}/>
    </TouchableOpacity>
  </View>
  )
}

export default ListUserItemAdmin

const styles = StyleSheet.create({})