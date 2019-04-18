import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native'
import OneSignal from 'react-native-onesignal';
import { ONE_SIGNAL_APP_ID } from '../commons'

export function ListenerNoti() {
  if (!ONE_SIGNAL_APP_ID) return false

  removeEvent = () => {
    console.log("Remove Event")
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }
  useEffect(() => {
    OneSignal.init(ONE_SIGNAL_APP_ID);
    OneSignal.sendTag("number", "1");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    return () => { removeEvent() }
  }, [])

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

  return <Button onPress={() => { OneSignal.deleteTag("number") }} title="Unsubscribe" />
}