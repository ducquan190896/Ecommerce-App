import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn/dist'
import RatingComponent from './RatingComponent'

const ReviewComponent = ({review}) => {
    const tw = useTailwind()
    const {dateCreated, dateUpdated, description, productId, id, rating, username} = review
  return (
    <View key={id}  style={tw('w-full my-2 py-2 px-2 rounded-lg border border-2 items-start border-gray-300')}>
        <RatingComponent rating={rating}></RatingComponent>
      <Text style={tw('text-base text-zinc-700 mb-2')}>{description}</Text>
      <Text style={tw('text-2xl text-gray-500 mb-2 font-bold')}>{username}</Text>
      <Text style={tw('text-base text-gray-500 mb-2')}>{dateUpdated}</Text>
    </View>
  )
}

export default ReviewComponent

const styles = StyleSheet.create({})