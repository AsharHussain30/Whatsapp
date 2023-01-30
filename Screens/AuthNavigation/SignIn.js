import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  Dimensions,
  FlatList,
  LogBox,
} from 'react-native';
import {CustomTextInput} from './CustomTextInput';
import {CustomButtons} from './CustomButtons';
import {CustomPasswordInput} from './CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {Auth} from '../Firebase';
import auth from "@react-native-firebase/auth"

LogBox.ignoreAllLogs();

const SignIn = () => {
  const naviagtion = useNavigation();
  const {height,width} = Dimensions.get("window");
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return (
      <View style={{flex:1,justifyContent:"center",backgroundColor:"#075e55"}}>
      <View style={styles.auth}>
        <CustomTextInput
          placeholder="Username"
          value={email}
          setValue={e => setEmail(e)}
        />
        <CustomPasswordInput
          placeholder="Password"
          value={password}
          setValue={e => setPassword(e)}
        />
        <CustomButtons
          text="Sign In"
          onPress={() => Auth.signIn(email, password)}
        />
        <CustomButtons
          text="Forgot Password?"
          type=""
          onPress={() => naviagtion.navigate('ForgotPassword')}
        />
        <CustomButtons
          text="Don't Have an Account? Create one"
          type=""
          onPress={() => naviagtion.navigate('SignUp')}
        />
      </View>
      </View>
  );
};

export default SignIn

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomColor: 'cyan',
    shadowColor: 'black',
    shadowRadius: 23,
    shadowOffset: {height: 1, width: 3},
  },
  Logo: {
    height: 100,
    width: 100,
    aspectRatio: 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#411d8c',
    borderRadius: 100,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    opacity: 1,
  },
  auth: {
    flex: 0,
    marginTop: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingTop: 60,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
