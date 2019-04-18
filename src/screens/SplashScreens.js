import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, ImageBackground, Image } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import AsyncStorage from '@react-native-community/async-storage';

import { StoreContext } from '../contexts'
import { img_logo } from '../assets'

export function SplashScreen() {
    const { navigate } = useNavigation()
    const [showLoading, setShowLoading] = useState(false)
    const { store, dispatch } = useContext(StoreContext);

    checkStorage = async () => {
        try {
            let TKELog_Token = await AsyncStorage.getItem('@TKEToken:key')
            let TKELog_Data = await AsyncStorage.getItem('@TKEData:key')
            if (!TKELog_Token) {
                navigate("SignIn")
            } else {
                dispatch({ type: 'setToken', token: TKELog_Token })
                dispatch({ type: 'setData', data: JSON.parse(TKELog_Data) })
                navigate("Home")

            }
        } catch (error) {
            console.log("Error Get TKELog Token Key : ", error)
        }

    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setShowLoading(true);
            checkStorage()

        }, 2000)
        // this will clear Timeout when component unmont like in willComponentUnmount
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={img_logo} style={{ width: 250, height: 250 }} resizeMode='contain' />
        </View>
    )
}