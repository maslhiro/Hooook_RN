import { View, Text, Button, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Ionicons'

import { ListNoti, GetCloudToken, Header , ListenerNoti} from '../components'

export function HomeScreens() {
  const { navigate } = useNavigation()

  useEffect(() => {
    backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })

    return () => {
      backHandler.remove();
    }
  }, [])
  
  clearStorage = async () => {
    await AsyncStorage.setItem('@TKEToken:key', "")
    await AsyncStorage.setItem('@TKEData:key', "")
  }
 
  onPress_Right_Icon = () => {
    Alert.alert(
      'Thông báo',
      'Bạn chắc chắn muôn thoát tài khoản này ?',
      [
        {text: 'Không', onPress: () => console.log("NO Pressed"), style: 'cancel'},
        {text: 'Có', onPress: () => {
          firebase.messaging().unsubscribeFromTopic("All")
          clearStorage()
          navigate("SignIn")
        }}
      ]
    );
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#dddddd', }}>
      <Header
        title="THÔNG BÁO"
        showLeftIcon={false}
        onPressRightIcon={() => {onPress_Right_Icon()}}
        rightIcon={<Icon name="ios-log-out" size={30} color='white' />} />
      <ListNoti/>
      <GetCloudToken/>
      <ListenerNoti/>
    </View>
  )

}