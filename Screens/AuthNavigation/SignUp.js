import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {CustomTextInput} from './CustomTextInput';
import {CustomButtons} from './CustomButtons';
import {CustomPasswordInput} from './CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {Auth} from '../Firebase';
import auth from '@react-native-firebase/auth';



export const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const {height, width} = Dimensions.get('window');

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#075e55'}}>
      <View style={styles.auth}>
        <CustomTextInput
          placeholder="Email"
          value={email}
          setValue={e => setEmail(e)}
        />
        <CustomTextInput
          placeholder="Username"
          value={username}
          setValue={e => setUsername(e)}
        />
        <CustomPasswordInput
          placeholder="Password"
          value={password}
          setValue={e => setPassword(e)}
        />
        <CustomButtons
          text="Sign UP"
          onPress={() => Auth.signUp(username, email, password)}
        />
        <CustomButtons
          text="Forgot Password?"
          type=""
          onPress={() => navigation.navigate('ForgotPassword')}
        />
        <CustomButtons
          text="Already Have an Account?"
          type=""
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomColor: 'cyan',
    elevation: 15,
  },
  main: {
    flex: 1,
    backgroundColor: '#baa2e1',
  },
  auth: {
    flex: 1,
    justifyContent: 'center',
  },
});
