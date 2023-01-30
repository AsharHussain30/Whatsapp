import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useRef, useState, useContext} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import UserChatDetail from './UserChatDetail';
import {
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import ImagePicker, {GlobalContext} from './ImagePicker';
import auth from '@react-native-firebase/auth';
import Menu from './Menu';
import {useCallback} from 'react';

const Chats = () => {
  // const Image = useContext(GlobalContext);


  const navigationRef = createNavigationContainerRef();

  const navigation = useNavigation();

  const AnimationOn = useRef(new Animated.Value(0)).current;
  const AnimationOff = useRef(new Animated.Value(0)).current;

  const [GetFromChild, setGetFromChild] = useState();

  const {width, height} = Dimensions.get('window');

  const [showMenu, setShowMenu] = useState(false);

  const [getter, setGetter] = useState();

  const [users, setUsers] = useState();

  const [id, setID] = useState();

  const IDMaker = () => {
    let fire = firestore().collection('Chats');
    fire
      .add({
        user: '1',
        MessageID: '',
      })
      .then(docRef => {
        firestore().collection('Chats').doc(docRef.id).update({
          MessageID: docRef.id,
        });
      });
  };

  const currentId = auth().currentUser.uid;

  const getData = () => {
    let user = firestore()
      .collection('users')
      .doc(currentId)
      .onSnapshot(snaps => {
        const data = snaps.data();
        // setGetter(data.image.path);
      });

    //  console.log(user);
    //  setGetter(data[0].image);
  };


  const getUsers = async () => {
    let user = await firestore()
      .collection('users')
      .where('uid', '!=', currentId)
      .get();
    let data = user.docs.map(item => item.data());
    setUsers(data);
  };

  const send = () => {
    let fire = firestore().collection('Chats').doc(id);
    fire.update({
      user: '1',
      image: image,
    });
  };

  useEffect(() => {
    getData();
    onRefresh();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    getUsers();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <FlatList
          data={users}
          keyExtractor={item => item.uid}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["green"]}/>
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate('User',{params: item.uid})}>
              <View
                style={{
                  height: 80,
                  top:0,
                  width: width,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Animated.timing(AnimationOn, {
                      toValue: showMenu ? 0 : 960,
                      duration: 500,
                      useNativeDriver: true,
                    }).start();
                    setShowMenu(!showMenu);
                  }}>
                  <Image
                    source={{
                      uri: item.image
                        ? item.image
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0ToKk_pNdClvoT5zslZZ6iQV_xOVIktrsuYUt1FRunsvtjpXmW9lnTWzD8N1t2KLLnw&usqp=CAU',
                    }}
                    style={{
                      height: 55,
                      width: 55,
                      borderRadius: 100,
                      marginHorizontal: 10,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 13,
                    color: Image,
                    fontWeight: 'bold',
                    textAlignVertical: 'center',
                    flex: 1,
                  }}>
                  {item.fullName}        
                </Text>
              </View>
      </TouchableOpacity>
            );
          }}
        />

      <Animated.View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          transform: [
            {
              translateY: AnimationOn,
            },
          ],
        }}>
        <ImagePicker setGetFromChild={setGetFromChild} />
      </Animated.View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
