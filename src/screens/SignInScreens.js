import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { View, Text, Button } from 'react-native'
import {StoreContext} from '../contexts'

export function SignInScreens() {
  const { navigate } = useNavigation()
  const { store, dispatch } = useContext(StoreContext);

  return ( 
  <View style={{ flex: 1, justifyContent:'center' , alignItems:'center'}}>
    <Text>Sign In : {store.count}</Text>
    <Button title="Next" onPress={() => { dispatch({type:"increment"}) }} />
  </View>
  )
}
