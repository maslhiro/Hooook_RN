import React, {
    useState,
    useEffect
  } from 'react'
  import {
    View,
    Text,
  } from 'react-native'
  import firebase from 'react-native-firebase'
  import {useAsyncStorage} from '@react-native-community/async-storage';
  
  export function GetCloudToken() {
    const [token, setToken] = useState(false)
    const { getItem, setItem } = useAsyncStorage('@FCMToken:key');

    checkPermission = async () => {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }
  
    getToken = async () => {
      console.log("GET TOKEN")
      try {
        let token = await getItem()
        if (token) { 
            setToken(token) 
            console.log("FCM", token)
            return
        }
        let fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          console.log("FCM", fcmToken)
          setToken(fcmToken)
          setItem(fcmToken)
        }
      }
      catch (err) {
        console.log("Error Get Token", err)
      }
  
  
    }
  
    requestPermission = async() =>  {
      try {
          await firebase.messaging().requestPermission();
          // User has authorised
          this.getToken();
      } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
      }
    } 
  
    useEffect(()=>{
      checkPermission()
    },[])
  
    return null
    // return (
    //   <Text>{token}</Text>
    // )
  }