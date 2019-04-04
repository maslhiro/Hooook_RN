import React, { useState, useEffect } from 'react'
import {useDispatch, useMappedState} from 'redux-react-hook';
import { useNavigation } from 'react-navigation-hooks'

import { View, Text, Button} from 'react-native'

export function HomeScreens(){
    const {navigate} = useNavigation()

    return (
    <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>

      <Button title="Press me" onPress={()=>{navigate("SignIn")}}/>
      
    </View>
    )
  
}
