import React, { useEffect, useState,useContext } from 'react'
import { Text, FlatList, View } from 'react-native'
import type { Notification } from 'react-native-firebase'
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/Ionicons'

import { StoreContext } from '../contexts'

const channel = new firebase.notifications.Android.Channel('TKELog', 'TKELog', firebase.notifications.Android.Importance.Max)
  .setDescription("TKELog's channel");

// Create the channel
firebase.notifications().android.createChannel(channel);
firebase.messaging().subscribeToTopic("All")

export function ListenerNoti() {
  const [message, setMessage] = useState([])
  const { store, dispatch } = useContext(StoreContext);

  firebase.notifications().onNotification((notification: Notification) => {
    console.log("Noti : ", notification)
    // Check Doi_Xe_ID exists in array
    let arrData =  store.data ? store.data : []
    let bool =arrData.findIndex((item)=>{return item.Doi_Xe_ID == notification.data.Doi_Xe_ID})

    if(bool==-1) return null

    notification.android.setChannelId(channel.channelId)
    notification.android.setSmallIcon('@drawable/ic_noti')
    firebase.notifications().displayNotification(notification)

    setMessage([...message, notification.data])
  })

  return null
}