import React from 'react'
import { View } from 'react-native'

const NotFound = ({naviagtion}) => {
  return (
    <View>
      
      <Text>NotFound</Text>

      <TouchableOpacity onPress={() => naviagtion.navigate('App')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NotFound
