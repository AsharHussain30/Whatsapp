import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const CustomButtons = ({onPress, text, type = 'Primary'}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          styles.container1,
          styles[`container_${type}`],
        ]}
        onPress={onPress}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 30,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontStyle: 'normal',
    color: 'white',
    fontSize: wp("4"),
    textAlignVertical: 'center',
    margin: -5,
  },
  container_Primary: {
    backgroundColor: 'black',
    marginVertical: 20,
    paddingVertical: 25,
  },
  text_Primary: {
    color: 'white',
  },
});
