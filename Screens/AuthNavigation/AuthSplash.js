import { StyleSheet, Text, View,Image, Dimensions } from 'react-native'
import React,{useEffect} from 'react'
import { StackActions, useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

const AuthSplash = () => {
  useEffect(() => {
      setTimeout(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
          const RouteName = user !== null ? "WhatsApp" : "SignIn"  
          navigation.dispatch(StackActions.replace(RouteName))
        })
        return unsubscribe()
      },4000)
    },[])
    const navigation = useNavigation()
  const {height,width} = Dimensions.get("window");
    return (
      <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <Text style={{fontSize:34,color:"black"}}>WhatsApp</Text>
      </View>
     )
}

export default AuthSplash

const styles = StyleSheet.create({})