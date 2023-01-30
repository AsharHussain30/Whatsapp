import {
  Alert,
  Dimensions,
  RefreshControl,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Animated,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import firebase from '@react-native-firebase/firestore';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Status from './Screens/Status';
import Chats from './Screens/Chats';
import Menu from './Screens/Menu';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserChatDetail from './Screens/UserChatDetail';
import ImagePicker from './Screens/ImagePicker';

import AuthSplash from './Screens/AuthNavigation/AuthSplash';
import {ForgotPassword} from './Screens/AuthNavigation/ForgotPassword';
import SignIn from './Screens/AuthNavigation/SignIn';
import {SignUp} from './Screens/AuthNavigation/SignUp';
import auth from '@react-native-firebase/auth';
import {useRef} from 'react';
import UserStatuses from './Screens/UserStatuses';
import {Auth} from './Screens/Firebase';
import StatusEditScreen from './Screens/StatusEditScreen';

function Tab1() {
  const Tab = createMaterialTopTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        tabBarContentContainerStyle: {marginTop: 0},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            width: 52,
          },
          tabBarIconStyle: {right: 35},
          tabBarActiveTintColor: 'white',
          tabBarStyle: {backgroundColor: '#075e55', justifyContent: 'center'},
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <TouchableOpacity onPress={() => Camera()}>
              <MaterialCommunityIcons name="camera" size={23} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chats}
        options={{
          tabBarLabelStyle: {right: 45},
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            width: 145,
            left: 65,
          },
          tabBarActiveTintColor: 'white',
          tabBarGap: -120,
          tabBarStyle: {backgroundColor: '#075e55'},
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarLabelStyle: {right: 20},
          tabBarIndicatorStyle: {backgroundColor: 'white', width: 165},
          tabBarGap: -18,
          tabBarActiveTintColor: 'white',
          tabBarStyle: {backgroundColor: '#075e55'},
        }}
      />
    </Tab.Navigator>
  );
}

const Camera = () => {
  // ImageCropPicker.openCamera({
  //   cropping: true,
  // });
};

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#075e55'},
        headerTintColor: 'white',
      }}></Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AuthSplash" component={AuthSplash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};
const {width, height} = Dimensions.get('window');

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [user, setUser] = useState('');

  const [showMenu, setShowMenu] = useState(false);

  const [active, setActive] = useState(false);

  const HomeMenuDrawerAnimation = useRef(new Animated.Value(0)).current;

  const HomeMenuDrawer = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            auth().signOut();
            // Animated.timing(HomeMenuDrawerAnimation, {
            //   toValue: showMenu ? 0 : 960,
            //   duration: 500,
            //   useNativeDriver: true,
            // }).start();
            // setShowMenu(!showMenu), setActive(!active);
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        {active ? (
          <Animated.View
            style={{transform: [{translateY: HomeMenuDrawerAnimation}]}}>
            <HomeMenu />
          </Animated.View>
        ) : null}
      </View>
    );
  };

  const HomeMenu = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          zIndex: 1,
          padding: 20,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 14, marginVertical: 5}}>
          Profile
        </Text>
        <Text style={{color: 'black', fontSize: 14, marginVertical: 5}}>
          Settings
        </Text>
        <Text style={{color: 'black', fontSize: 14, marginVertical: 5}}>
          About
        </Text>
      </View>
    );
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userExcist => {
      if (userExcist) {
        setUser(userExcist);
      } else {
        setUser('');
      }
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#054d44" />
      <Stack.Navigator>
        {user == '' ? (
          <>
            <Stack.Screen
              name="AuthSplash"
              component={AuthSplash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="AuthSplash"
              component={AuthSplash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WhatsApp"
              component={Tab1}
              options={{
                headerStyle: {backgroundColor: '#075e55'},
                headerShadowVisible: false,
                headerTintColor: 'white',
                headerRight: () => <HomeMenuDrawer />,
              }}
            />
             <Stack.Screen
              name="StatusEdit"
              component={StatusEditScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ImagePicker"
              component={ImagePicker}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="User"
              component={UserChatDetail}
              options={{
                headerStyle: {backgroundColor: '#075e55'},
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="UserStatuses"
              component={UserStatuses}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
