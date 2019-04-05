import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, ImageBackground, Image } from 'react-native'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import { useAsyncStorage } from '@react-native-community/async-storage';

import { StoreContext } from '../contexts'
import { img_logo } from '../assets'

export function SplashScreen() {
    const { navigate } = useNavigation()
    const [showLoading, setShowLoading] = useState(false)
    const { store, dispatch } = useContext(StoreContext);
    const { getItem, setItem } = useAsyncStorage('@TKEToken:key');

    checkToken = async () => {
        try {
            let TKELog_Token = await getItem()
            if (!TKELog_Token) {
                navigate("SignIn")
            } else {
                let state = { token: TKELog_Token }
                dispatch({ type: 'setToken', token: TKELog_Token })
                navigate("Home")

            }
        } catch (error) {
            console.log("Error Get TKELog Token Key : ", error)
        }

    }

    useEffect(() => {
        let timer = setTimeout(() => {
            setShowLoading(true);
            checkToken()

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