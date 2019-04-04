import React, { useState, useEffect, useContext } from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook';
import { useNavigation } from 'react-navigation-hooks'
import { StoreContext } from '../contexts'

import { View, Text, Button} from 'react-native'

export function HomeScreens(){
    const {navigate} = useNavigation()
    const { store, dispatch } = useContext(StoreContext);

    return (
    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
      <Text>{store.count}</Text>
      <Button title="Press me" onPress={()=>{navigate("SignIn")}}/>
      
    </View>
    )
  
}
