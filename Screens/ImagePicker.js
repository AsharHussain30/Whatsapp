import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, createContext} from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';

export const GlobalContext = createContext();

const ImagePicker = ({setGetFromChild}) => {
  const [image, setImage] = useState();

  const [Profiletofire, setProfileToFire] = useState();

  //setGetFromChild(Profiletofire);

  // setGetImg("asd");

  // const [id, setID] = useState();
  const send = () => {
    let fire = firestore().collection('users').doc(id);
    fire.update({
      image: Profiletofire,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const id = auth().currentUser.uid;

  const getData = () => {
    let user = firestore().collection('Chats');
    user.onSnapshot(QuerySnapShot => {
      let snaps = QuerySnapShot.docs.map(item => item.data());
      // setID(snaps[0].MessageID)
    });
  };

  const onImagePick = () => {
    ImageCropPicker.openCamera({
      cropping: true,
    }).then(image => {
      setImage(image);
      const img = image.path;
      const uploadFile = storage()
        .ref()
        .child(`/UserProfile/UserProfile.${Date.now()}`)
        .putFile(img);
      uploadFile.on(
        'state_changed',
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            Alert.alert('Profile Picture', 'Uploaded');
          }
        },
        error => {
          Alert.alert('error image uploading');
        },
        () => {
          uploadFile.snapshot.ref.getDownloadURL().then(downloadUrl => {
            setProfileToFire(downloadUrl);
          });
        },
      );
    });
  };

  const CustomActivityIndicator = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          height: 150,
          width: width,
          marginHorizontal: 25,
          borderRadius: 15,
        }}>
        <ActivityIndicator size={34} color="#075e55" />
      </View>
    );
  };

  const pickFromGallery = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(image => {
      setImage(image);
      const img = image.path;
      const uploadFile = storage()
        .ref()
        .child(`/UserProfile/UserProfile.${Date.now()}`)
        .putFile(img);
      uploadFile.on(
        'state_changed',
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            Alert.alert("Image Profile:", "Uploaded" )
          }
        },
        error => {
          Alert.alert('error image uploading');
        },
        () => {
          uploadFile.snapshot.ref.getDownloadURL().then(downloadUrl => {
            setProfileToFire(downloadUrl);
          });
        },
      );
    });
  };

  const {height, width} = Dimensions.get('window');

  return (
    <View
      style={{
        backgroundColor: '#075e55',
        height: 200,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        elevation: 14,
        transform: [
          {
            translateY: -1000,
          },
        ],
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          marginTop: 30,
          fontSize: 15,
        }}>
        Image Profile
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 40,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => onImagePick()}>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcon name="camera" size={36} color="black" />
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                marginLeft: 10,
              }}>
              Take It
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickFromGallery()}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../Assets/download.png')}
              style={{height: 34, width: 34}}
            />
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                marginLeft: 10,
              }}>
              Gallery
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => send()}>
        <Text
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 9,
            color: '#075e55',
            marginHorizontal: 50,
            borderRadius: 7,
            elevation: 15,
            marginTop: 25,
          }}>
          Set As Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePicker;
