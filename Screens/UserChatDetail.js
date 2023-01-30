import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Menu from './Menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserChatDetail = ({route}) => {
  // const [id, setID] = useState();
  // const [messageid, setMessageID] = useState();
  // const [user, setUser] = useState();

  // const [message, setMessage] = useState();
  // const [getMessageFire, setGetMessageFire] = useState();

  // const getData = () => {
  //   let user = firebase().collection('Chats');
  //   user.onSnapshot(snaps => {
  //     let userData = snaps.docs.map(item => item.data());
  //     setID(userData[0].MessageID);
  //     setGetMessageFire(userData[0].message);
  //   });
  // };

  // const getUsers = async () => {
  //   let user = await firestore().collection("users").get();
  //   const Alluser = user.docs.map(docSnap => docSnap.data());

  //   setUser(Alluser);

  // };

  // const Data = () => {
  //   let user = firebase().collection('message');
  //   user.onSnapshot(snaps => {
  //     let userData = snaps.docs.map(item => item.data());
  //     setMessageID(userData[0].MessageID);
  //     // console.log(userData);
  //   });
  // };

  // const sendData = () => {
  //   let user = firebase()
  //     .collection('message')
  //     .add({
  //       MessageID: '',
  //     })
  //     .then(docRef => {
  //       firebase().collection('message').doc(docRef.id).update({
  //         MessageID: docRef.id,
  //       });
  //     });

  //   console.log('Firebase ON');
  // };
  // const send = () => {
  //   let fire = firebase().collection('message').doc(id);
  //   fire.update({
  //     message: message,
  //   });
  // };

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState();

  const currentId = auth().currentUser.uid;

  const getUsers = async () => {
    let user = await firestore()
      .collection('users')
      .where('uid', '!=', currentId)
      .get();
    let data = user.docs.map(item => item.data());
    setUsers(data);
  };

  const onSend = messages => {
    const msg = messages[0];

    const myMsg = {
      ...msg,
      senderId: currentId,
      receiverId: route.params.params,
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('Chats')
      .doc(
        currentId > route.params.params
          ? route.params.params + '-' + currentId
          : currentId + '-' + route.params.params,
      )
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log(messages);
  };

  useEffect(() => {
    const QuerySnapShot = firestore()
      .collection('Chats')
      .doc(
        currentId > route.params.params
          ? route.params.params + '-' + currentId
          : currentId + '-' + route.params.params,
      )
      .collection('messages')
      .orderBy('createdAt', 'desc');
    QuerySnapShot.onSnapshot(snapShot => {
      const Allmsg = snapShot.docs.map(snap => {
        return {...snap.data(), createdAt: new Date()};
      });
      setMessages(Allmsg);
    });
    getUsers();
  }, []);

  function renderInputToolbar(props) {
    return (
      <View style={{flex: 1}}>
        <InputToolbar
          containerStyle={{
            marginHorizontal: 10,
            borderRadius: 50,
            backgroundColor: 'white',
            marginVertical: 5,
          }}
          {...props}
        />
      </View>
    );
  }

  function renderDay(props) {
    return <Day {...props} textStyle={{color: '#647279',backgroundColor:"#d4eaf5",padding:5,borderRadius:5}} />;
  }

  const {height, width} = Dimensions.get('window');
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../Assets/chatBG.jpg')}
        style={{height: height, width: width, resizeMode: 'contain', flex: 1}}>
        <View style={{flex: 1}}>
          <GiftedChat
            timeTextStyle={{
              right: {color: '#8aa275'},
              left: {color: '#a9a9a9'},
            }}
            renderDay={renderDay}
            renderBubble={props => {
              return (
                <View style={{flex: 1}}>
                  <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor: '#e2ffc7',
                        shadowColor: 'black',
                        elevation: 5,
                      },
                      left: {
                        backgroundColor: '#ffffff',
                        marginLeft: -40,
                        elevation: 5,
                      },
                    }}
                    textStyle={{
                      left: {color: 'black'},
                      right: {color: 'black'},
                    }}
                  />
                </View>
              );
            }}
            renderInputToolbar={renderInputToolbar}
            renderSend={props => {
              return (
                <Send {...props}>
                  <View style={{}}>
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        backgroundColor: '#075e55',
                        padding: 10,
                        borderRadius: 34,
                      }}>
                      <MaterialCommunityIcons
                        name="send"
                        size={20}
                        color="white"
                      />
                    </Text>
                  </View>
                </Send>
              );
            }}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: route.params.params,
            }}
          />
        </View>

        {/* <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'white',
            height: 50,
            width: height / 2.2,
            position: 'absolute',
            marginHorizontal: 5,
            marginVertical: 10,
            bottom: 0,
            borderRadius: 25,
          }}>
          <TextInput
            placeholder="Type a message"
            placeholderTextColor="silver"
            value={message}
            onChangeText={e => setMessage(e)}
            style={{marginLeft: 10}}
          />
        </View>
        <TouchableOpacity
          onPress={() => send()}
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: '#075e55',
            padding: 15,
            margin: 10,
            borderRadius: 100,
          }}>
          <Image
            source={require('../Assets/Post.png')}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'cover',
              marginVertical: 0,
              marginRight: 0,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
};

export default UserChatDetail;

const styles = StyleSheet.create({});
