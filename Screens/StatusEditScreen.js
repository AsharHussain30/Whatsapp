import { View, Text,TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'



const StatusEditScreen = ({route}) => {

    const {width,height} = Dimensions.get("window")

    const navigation = useNavigation();
    const currentId = auth().currentUser.uid;



    const Me = firestore().collection('users').doc(currentId);

  const img = route.params.params 

  console.log(img);
  
    const sendStatus = () => {
        Me.collection("Statuses").add({
            img
         });
         navigation.goBack("")
    }

    return (
    <View style={{flex:1}}>
        <StatusBar hidden/>
            <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/fir-pro-72d4e.appspot.com/o/Status%2FStatus.1675092903343?alt=media&token=e424f0b9-8765-4111-9d57-0f7f55bd5539"}} style={{resizeMode:"contain",height:"100%",width:"100%",}}/>
            <TouchableOpacity onPress={() => navigation.goBack("")}  style={{alignSelf:"flex-start",position:"absolute",margin:15}}>
            <Entypo name='cross' size={34} color="white"/>
                </TouchableOpacity>
            <View style={{width:"39%",height:"5%",backgroundColor:"#408c7c",bottom:10,left:15,position:"absolute",justifyContent:"center",alignItems:"center",flexDirection:"row",borderRadius:25}}>
                <Image source={require("../Assets/status.png")} style={{height:20,width:30,right:10}}/>
                <Text style={{color:"white",textAlign:"center",}}>Status</Text>
            </View>
            <View
        style={{
          backgroundColor: '#408c7c',
          borderRadius: 50,
          padding: 10,
          position: 'absolute',
          bottom: 0,
          alignSelf: 'flex-end',
          right: 10,
          bottom: 10,
        }}>
        <TouchableOpacity onPress={() => sendStatus()}>
          <MaterialCommunityIcons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default StatusEditScreen