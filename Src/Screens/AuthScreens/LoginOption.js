import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  StatusBar,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
// dimension

const {width, height} = Dimensions.get('window');

const widhtToDp = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = number => {
  let givenheight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

const LoginOption = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.demo__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      {/* ------------- upper part --------------- */}
      <View style={styles.upper__container}>
        <View style={styles.avatar_style}>
          <Feather name="user" style={styles.avatar_icon} />
        </View>
        <Text style={styles.upper__txt}>Login details</Text>
      </View>
      {/* ------------- middle part --------------- */}

      <View style={styles.middle__contianer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MobileLogin')}
          style={styles.btn_style}>
          <Ionicons name="call" style={styles.call_icon} />

          <Text style={styles.btn_txt_style}>sign in with Mobile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginEmail')}
          style={styles.btn1_style}>
          <Fontisto name="email" style={styles.email_icon} />

          <Text style={styles.btn1_txt_style}>Sign in with Email</Text>
        </TouchableOpacity>
      </View>

      {/* ------------- lower part --------------- */}
      <View style={styles.lower__partition}></View>
      <View style={styles.lower__contianer}>
        <Text style={styles.lower__txt}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text style={styles.lower__txt1}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginOption;

const styles = StyleSheet.create({
  demo__container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },

  upper__container: {
    marginTop: heightToDp('10%'),
  },

  avatar_style: {
    backgroundColor: '#E8E8E8',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#CACACA',
    alignSelf: 'center',
  },
  avatar_icon: {
    fontSize: widhtToDp('10%'),
  },
  upper__txt: {
    fontSize: widhtToDp('5%'),
    alignSelf: 'center',
    marginTop: 12,
    textTransform: 'capitalize',
    color: '#000',
  },
  middle__contianer: {
    paddingHorizontal: 20,
    marginTop: heightToDp('8%'),
  },
  btn_style: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    height: 48,
    alignItems: 'center',
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  btn1_style: {
    backgroundColor: '#000000',

    width: '90%',
    alignSelf: 'center',
    height: 48,
    alignItems: 'center',
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: heightToDp('4%'),
  },
  btn_txt_style: {
    textTransform: 'capitalize',
    color: '#000000',
    fontSize: widhtToDp('4%'),
    marginLeft: widhtToDp('4%'),
  },
  btn1_txt_style: {
    color: '#fff',
    fontSize: widhtToDp('4%'),
    marginLeft: widhtToDp('4%'),
  },
  call_icon: {
    fontSize: widhtToDp('5%'),
    color: '#000000',
  },
  email_icon: {
    color: '#fff',
    fontSize: widhtToDp('7%'),
  },
  text__style: {
    alignSelf: 'center',
  },
  lower__contianer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  lower__partition: {
    borderBottomWidth: 1,
    borderColor: '#00000099',
    width: widhtToDp('90%'),
    alignSelf: 'center',
    marginTop: heightToDp('25%'),
  },
  lower__txt: {
    textTransform: 'capitalize',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: heightToDp('3%'),
  },
  lower__txt1: {
    marginTop: heightToDp('3%'),
    marginLeft: widhtToDp('1%'),
    color: 'green',
  },
});
