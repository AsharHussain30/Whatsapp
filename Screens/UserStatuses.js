import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {NavigationContext} from 'react-navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';

const {height, width} = Dimensions.get('window');

const UserStatuses = ({navigation}) => {
  const [getImage, setGetImg] = useState([getImage]);
  const [Length, setLength] = useState("");
  

  const [current, setCurrent] = useState(0);

  const [image, setImage] = useState();

  const [content, setContent] = useState([
    {
      image:
        'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      image:
        'https://www.teahub.io/photos/full/94-942521_cell-phone-wallpaper-nature-sexy-men-women-car.jpg',
    },
    {
      image: 'https://pbs.twimg.com/media/EZUWw7uUwAMdeFi.jpg',
    },
  ]);

  // console.log(getImage);

  const progress = useRef(new Animated.Value(0)).current;

  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        next();
      }
    });
  };

  const next = () => {
    if (current != getImage.length - 1) {
      let tempData = getImage;
      tempData[current].finish = 1;
      setGetImg(tempData);
      setCurrent(current + 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = getImage;
      tempData[current - 1].finish = 0;
      setGetImg(tempData);
      setCurrent(current - 1);
      progress.setValue(0);
    } else {
      close();
    }
  };

  const close = () => {
    navigation.goBack('');
  };

  useEffect(() => {
    const currentId = auth().currentUser.uid;

    const Me = firestore().collection('users').doc(currentId);

    firestore().collection('users').doc(currentId).collection('Statuses').onSnapshot(snap => {
      const data = snap.docs.map(item => item.data().img);
      setGetImg(data);
      setLength(data.length)
      

      Me.onSnapshot(QuerySnapShot => {
        const me = QuerySnapShot.data();
        setImage(me.image);
      });
    });
  }, []);

  return (
    <View>
      <StatusBar hidden />
      <Image
        source={{uri: getImage[current]}}
        onLoadEnd={() => {
          progress.setValue(0);
          start();
        }}
        style={{resizeMode: 'cover', height: height}}
      />
      <View
        style={{
          top: 10,
          width: width,
          position: 'absolute',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {getImage.map((item, index) => {
          // console.log(item);
          return (
            <View
              key={index}
              style={{
                flex: 1,
                height: 3,
                backgroundColor: '#075e55',
                marginLeft: 5,
                flexDirection: 'row',
              }}>
              <Animated.View
                style={{
                  flex: current == index ? progress : getImage[index].finish,
                  height: 3,
                  backgroundColor: 'white',
                }}></Animated.View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          flexDirection: 'row',
          height: height,
          width: width,
          position: 'absolute',
          justifyContent: 'space-between',
          alignItems: 'center',
          top: 0,
        }}>
        <TouchableOpacity
          style={{width: '30%', height: '100%'}}
          onPress={() => {
            previous();
          }}>
          <View style={{top: 30, left: 10, flexDirection: 'row'}}>
            <Image
              source={{uri: image}}
              style={{height: 55, width: 55, borderRadius: 50}}
            />
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                textAlignVertical: 'center',
                paddingLeft: 10,
              }}>
              You
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '30%', height: '100%'}}
          onPress={() => {
            next();
          }}>
          <View></View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserStatuses;
