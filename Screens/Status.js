import {
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Menu from './Menu';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useEffect } from 'react';

const Status = ({navigation}) => {
  const {height, width} = Dimensions.get('window');

  const [message, setMessage] = useState('');

  const [FireImage, setFireImage] = useState();

  const [image, setImage] = useState();

  const ImagePickerFromGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(image => {
      const img = image.path;
      const uploadFile = storage()
        .ref()
        .child(`/Status/Status.${Date.now()}`)
        .putFile(img);
      uploadFile.on(
        'state_changed',
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            Alert.alert('Image Profile:', 'Uploaded');
          }
        },
        error => {
          Alert.alert('error image uploading');
        },

        () => {
          uploadFile.snapshot.ref.getDownloadURL().then(downloadUrl => {
            setFireImage(downloadUrl);
            
            navigation.navigate("StatusEdit",{params: downloadUrl})
             });
        },
      );
    });
  };




  const currentId = auth().currentUser.uid;

  const Me = firestore().collection('users').doc(currentId);


  Me.onSnapshot(QuerySnapShot => {
    const me = QuerySnapShot.data();
    setImage(me.image);
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 80,
          top: 0,
          width: width,
          justifyContent: 'center',
          borderBottomColor: 'gray',
          borderBottomWidth: 0.3,
          elevation: 2,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserStatuses')}
          style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            source={{uri: image}}
            style={{
              height: 55,
              width: 55,
              borderRadius: 100,
              marginHorizontal: 10,
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '400', color: 'black', fontSize: 15}}>
              My Status
            </Text>
            <Text style={{fontWeight: '400', color: 'gray', fontSize: 10}}>
              Tap To Add Status Update
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          color: '#408c7c',
          fontSize: 13,
          marginVertical: 2,
          width: width,
          backgroundColor: '#eee',
          padding: 10,
          fontWeight: '800',
        }}>
        Viewed Update
      </Text>
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
        <TouchableOpacity onPress={() => ImagePickerFromGallery()}>
          <MaterialCommunityIcons name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data="1"
        style={{marginBottom: 55}}
        renderItem={() => {
          return (
            <View
              style={{
                height: 70,
                top: 0,
                width: width,
                justifyContent: 'center',
                borderBottomColor: 'gray',
                elevation: 7,
                backgroundColor: 'white',
              }}></View>
          );
        }}
      />
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
