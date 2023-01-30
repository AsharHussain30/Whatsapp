import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Chats from './Chats';
import Status from './Status'; 

const TabBar = () => {
    
  const Tab = createMaterialTopTabNavigator();

  return (
      <Tab.Navigator>
        <Tab.Screen
          name="Chats"
          component={Chats}
          options={{
            tabBarActiveTintColor: 'white',
            tabBarStyle: {backgroundColor: '#075e55'},
          }}
        />
        <Tab.Screen
          name="Status"
          component={Status}
          options={{
            tabBarActiveTintColor: 'white',
            tabBarStyle: {backgroundColor: '#075e55'},
          }}
        />
      </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
