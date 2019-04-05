import React, { useState, useEffect} from 'react';
import { View, Text} from 'react-native'
import OneSignal from 'react-native-onesignal'; 
const ONESIGNAL_APPID = "119f887f-003f-4ebb-abca-8a3562a0fecd"

export function ListenerNoti (){
  removeEvent = () => {
    console.log("Remove Event")
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    // OneSignal.deleteTag("number");
  }
  useEffect(()=>{
    OneSignal.init(ONESIGNAL_APPID);
    OneSignal.sendTag("number", "1");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    return() => { removeEvent() }},[])

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
  }

    return null
}