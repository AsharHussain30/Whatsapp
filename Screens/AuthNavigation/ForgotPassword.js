import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {CustomTextInput} from './CustomTextInput';
import {CustomButtons} from './CustomButtons';
import {Auth} from '../Firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const {height, width} = Dimensions.get('window');

  return (
    <View style={{flex:1,justifyContent:"center",backgroundColor:"#075e55"}}>
     <TouchableOpacity onPress={() => navigation.goBack('')} style={{padding: 25,alignSelf:"flex-start",flex:1}}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={wp('7%')}
          color="white"
          style={{justifyContent: 'flex-start'}}
        />
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          position: 'absolute',
          height: height,
          width: width,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: wp("5"),
            color: 'white',
            paddingVertical: hp("2"),
          }}>
          Reset Your Password!
        </Text>
        <CustomTextInput
          placeholder="Email"
          value={email}
          setValue={e => setEmail(e)}
        />
        <CustomButtons
          text="Submit"
          onPress={() => {
            Auth.forgetPassword(email),
              Alert.alert(
                'Email:',
                'Your Forgot Password Request Has Been Send SuccessFully Check Your Email Spam Folder..',
              );
          }}
        />
      </View>
  </View>
);
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    opacity: 1,
  },
});
