import moment from "moment";
import React, { useEffect, useState , useContext} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, FlatList, View, Alert } from 'react-native'

import { StoreContext } from '../contexts'
import {API_URL_GET_NOTI} from '../commons'

export function ListNoti() {
  if(!API_URL_GET_NOTI) return null

  const [message, setMessage] = useState([])
  const [loading, setLoading] = useState(false)
  const { store, dispatch } = useContext(StoreContext);

  getDataNoti = async () => {
    try {
      let TKELog_Token = store.token
      let url_Get_Noti = API_URL_GET_NOTI.concat(`&TKELog_GPS_Token=${(String(TKELog_Token))}`)

      let response = await fetch(
        url_Get_Noti,
      );

      let responseJSON = await response.json();
      if (responseJSON.StatusCode == 202) return Alert.alert("Thông báo", responseJSON.Error.toString());
      else if (responseJSON.StatusCode != 200) return Alert.alert("Thông báo", responseJSON.Error.toString());

      let reponseData = JSON.parse(responseJSON.Data)

      // Format data
      let newData = reponseData.map((item) => {
        let item_temp = item;
        let time = moment(item.Noi_Dung.slice(0, item.Noi_Dung.indexOf("Xe") - 2), "DD-MM-YYYY HH:mm:ss")
        item_temp.Noi_Dung = item_temp.Noi_Dung.
          slice(item.Noi_Dung.indexOf("Xe"), item.Noi_Dung.lenght)
        item_temp.Thoi_Gian = countTime(time)
        return item_temp
      })
      setMessage(reponseData)
      console.log(reponseData)

    } catch (error) {
      console.log("Error Get Data Noti ", error)
      Alert.alert("Thông báo", "Có lỗi trong quá trình kết nối");
    }
  }

  countTime = (date) => {
    if (!date) return "Không xác định"
    let now = moment(new Date()); //todays date
    let duration = moment.duration(now.diff(date));
    let duration_Minutes = parseFloat(duration.asMinutes()).toFixed(0)
    if (duration_Minutes < 60) return (duration_Minutes + " phút")
    if (duration_Minutes < 60 * 24) return (parseInt(duration_Minutes / 60) + " giờ")
    return (parseInt(duration_Minutes / 1440) + " ngày")
  }

  useEffect(() => {
    getDataNoti()
  }, [])

  renderItem = (item) => {
    return <View style={{ backgroundColor: 'white', marginHorizontal: 10, marginVertical: 10, borderRadius: 5, padding: 10 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#204397', fontSize: 13, fontWeight: 'bold' }}> {item.Thoi_Gian}</Text>
        <View style={{ height: 1, backgroundColor: '#808080', marginVertical: 5 }} />
      </View>
      <View style={{ flex: 3 }}>
        <Text style={{ color: 'black', fontSize: 13 }}>{item.Noi_Dung}</Text>

      </View>
    </View>
  }

  onRefresh = () => {
    setLoading(true)
    getDataNoti()
    setLoading(false)
  }

  return <FlatList
    refreshing={loading}
    onRefresh={() => onRefresh()}
    keyExtractor={(item) => String(item.Auto_ID)}
    style={{ flex: 1, backgroundColor: '#FFFFF' }}
    data={message}
    renderItem={({ item }) => renderItem(item)}
  />
}
