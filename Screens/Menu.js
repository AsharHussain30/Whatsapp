import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = () => {
  const {width, height} = Dimensions.get('window');

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#075e55',
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 20,
            left: 15,
            fontWeight: '800',
            color: 'white',
            opacity: 0.6,
          }}>
          WhatsApp
        </Text>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color="white"
          style={{right: 5, marginTop: 5}}
        />
      </View>

    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
