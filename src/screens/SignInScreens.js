import React, { useState, useEffect, useContext } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { View, Text, ImageBackground, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import NetInfo from "@react-native-community/netinfo";
import { useAsyncStorage } from '@react-native-community/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { StoreContext } from '../contexts'
import { img_bg } from '../assets'
import { API_URL_DANG_NHAP } from '../commons'
import { ListenerNoti } from '../components'

export function SignInScreens() {
    const [userName, setUsername] = useState("")
    const [passWord, setPassword] = useState("")
    const { navigate } = useNavigation()
    const { store, dispatch } = useContext(StoreContext);
    const { getItem, setItem } = useAsyncStorage('@TKEToken:key');

    checkNetInfo = async () => {
        let netInfo = await NetInfo.getConnectionInfo()
        console.log('netInfo type: ', netInfo.type)
        if (netInfo.type == 'wifi' || netInfo.type == 'cellular') return true
        return false

    }

    onPress_Dang_Nhap = async () => {
        let bool = checkNetInfo()
        if (!bool) return Alert.alert("Thông báo", "Vui lòng kết nối internet hoặc cho phép ứng dụng kết nối internet");

        try {
            let url_Dang_Nhap = API_URL_DANG_NHAP.concat(`&Ma_Dang_Nhap=${encodeURIComponent(String(userName))}&Mat_Khau=${(passWord)}`)

            let response = await fetch(
                url_Dang_Nhap,
            );
            let responseJSON = await response.json();
            console.log("Reponse Dang Nhap : ", responseJSON)

            if (responseJSON.StatusCode == 202) return Alert.alert("Thông báo", responseJSON.Erorr.toString());
            else if (responseJSON.StatusCode != 200) return Alert.alert("Thông báo", JresponseJSON.Erorr.toString());

            if (responseJSON) {
                let TKELog_GPS_Token = responseJSON.Token
                await setItem(TKELog_GPS_Token);
                dispatch({type:'setToken',token:TKELog_GPS_Token})
                navigate("Home")
            }
            else Alert.alert("Thông báo", JSON.stringify(response.Erorr));

        } catch (error) {
            console.log("Error Dang Nhap ", error)
            Alert.alert("Thông báo", error.toString())
        }

    }

    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'flex-end' }} source={img_bg} resizeMode='cover'>
            <View style={{ flex: 1, backgroundColor: 'transparent' }} />
            <View style={{ flex: 2, backgroundColor: 'transparent' }}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ justifyContent: 'center', backgroundColor: 'white', margin: 20, borderRadius: 5 }}>
                    <Text />
                    <Text style={{ marginLeft: 20, color: 'black' }}>Mã Đăng Nhập</Text>
                    <TextInput
                        style={{ height: 50, backgroundColor: '#dddddd', margin: 20, borderRadius: 5, fontSize: 16 }}
                        onChangeText={(text) => setUsername(text)}
                    />

                    <Text style={{ marginLeft: 20, color: 'black' }}>Mật Khẩu</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={{ height: 50, backgroundColor: '#dddddd', margin: 20, borderRadius: 5, fontSize: 16 }}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Button
                        buttonStyle={{ backgroundColor: "#204397" }}
                        containerStyle={{ margin: 20 }}
                        title="Đăng Nhập"
                        onPress={() => {onPress_Dang_Nhap()}}
                    />
                    <Text style={{ fontSize: 11, alignSelf: 'center' }}>©2017 TKELog GPS - Giải pháp quản lý thông tin hành trình</Text>
                    <Text style={{ fontSize: 11, alignSelf: 'center' }}>Thiết kế và phát triển bởi TKSolution - Version 1.0.0.</Text>
                    <Text />
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>
    )
}