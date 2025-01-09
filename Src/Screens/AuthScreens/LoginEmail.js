import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../Components/AuthContext';
import axios from '../../Components/axios';
import qs from 'qs';
import messaging from '@react-native-firebase/messaging';
import Feather from 'react-native-vector-icons/Feather';

// Dimensions

const {width, height} = Dimensions.get('window');

const widthToDp = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = number => {
  let givenheight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

const LoginEmail = () => {
  const navigation = useNavigation();

  const {login} = React.useContext(AuthContext);

  // state management.

  const [pre_loader, setPreLoader] = useState(false);
  const [login__data, setLoginData] = useState({
    user__email: '',
    user__pass: '',
    fcmToken: '',
  });

  const login__func = async () => {
    try {
      if (login__data.user__email == '' || login__data.user__pass == '') {
        ToastAndroid.show('some fields are empty!', ToastAndroid.BOTTOM);
      } else {
        setPreLoader(true);
        let data = {
          email: login__data.user__email,
          password: login__data.user__pass,
          token: login__data.fcmToken,
        };

        let options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'email-login',
        };

        const res = await axios(options);

        console.log('res --- ', res.data);

        if (res.data.status == '200') {
          setPreLoader(false);
          login(res.data.access_token);
        } else if (res.data.status == '401') {
          setPreLoader(false);
          ToastAndroid.show('invalid credentials!', ToastAndroid.BOTTOM);
        } else {
          setPreLoader(false);
          ToastAndroid.show('something went wrong!', ToastAndroid.BOTTOM);
        }

        console.log('login res ---- ', res.data);
      }
    } catch (err) {
      console.log('login err ---- ', err);
      setPreLoader(false);
      ToastAndroid.show('server err occurs!', ToastAndroid.BOTTOM);
    }
  };

  // get fcm token ----

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('fcm token --- ', fcmToken);
      setLoginData(prev => ({...prev, fcmToken}));
    } catch (err) {
      console.log('fcm token err -- ', err);
    }
  };

  React.useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.demo__container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* ------------ demo upper part --------- */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.demo__upper_container}>
          <Image
            source={require('../../Assets/tobitownew.png')}
            style={{
              // height: heightToDp('35%'),
              width: '90%',
              height: heightToDp('20%'),
              resizeMode:'contain'
            }}
          />
        </View>

        {/* ------------ demo lower part --------- */}

        <View style={styles.demo__lower_container}>
          <TextInput
            value={login__data.user__email}
            onChangeText={text =>
              setLoginData(prevstate => ({...prevstate, user__email: text}))
            }
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="black"
            placeholder="Email Id"
            style={styles.input__style}
          />
          {login__data.user__email ==
          '' ? null : !login__data.user__email.match(/\S+@\S+\.\S+/) ? (
            <Text
              style={{
                color: 'red',
                fontSize: widthToDp('2.5%'),
                marginLeft: widthToDp('1%'),
                marginTop: heightToDp('1%'),
              }}>
              email is not valid!
            </Text>
          ) : null}
          <View style={styles.input__style1}>
            <TextInput
              style={{width: '55%'}}
              value={login__data.user__pass}
              onChangeText={text =>
                setLoginData(prevstate => ({...prevstate, user__pass: text}))
              }
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="black"
              placeholder="Password"
            />
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
              <Text style={{fontFamily: 'Montserrat-Regular'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          {login__data.user__pass == '' ? null : login__data.user__pass.length <
            8 ? (
            <Text
              style={{
                color: 'red',
                fontSize: widthToDp('2.5%'),
                marginLeft: widthToDp('1%'),
                marginTop: heightToDp('1%'),
              }}>
              Password should be atleast 8 characters or digits{' '}
            </Text>
          ) : null}
        </View>

        {pre_loader && <ActivityIndicator color="red" size={40} />}

        <View style={styles.lower__container}>
          <TouchableOpacity
            onPress={() => login__func()}
            style={styles.header__btn_style2}>
            <Text style={styles.lower__btntxt1}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lower__txt_style}>
          <Text style={styles.demo__lower_container3}>
            Forgot your login details?
          </Text>
          <Text style={styles.demo__lower_container4}>
            Get help signing in.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: widthToDp('10%'),
          }}>
          <View style={{borderBottomWidth: 1, width: '39%'}}></View>
          <Text
            style={{
              fontSize: widthToDp('5%'),
              fontFamily: 'Montserrat-Regular',
            }}>
            OR
          </Text>
          <View style={{borderBottomWidth: 1, width: '39%'}}></View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MobileLogin')}
          style={styles.header__btn_style1}>
          <Feather name="phone" style={styles.header__icon} />
          <Text style={styles.upper__txt2}>Login in with Mobile</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: widthToDp('10%'),
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              width: '90%',
            }}></View>
        </View>
        <View style={styles.lower__txt_style}>
          <Text style={styles.demo__lower_container3}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Create1')}>
            <Text style={styles.demo__lower_container4}>Create account.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginEmail;

const styles = StyleSheet.create({
  demo__container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('3%'),
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__btn_style1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: heightToDp('3%'),
  },
  header__btn_style2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    height: 48,
    backgroundColor: '#898A8D',
    color: '#F2F2F2',
    marginTop: heightToDp('2%'),
  },
  header__icon: {
    fontSize: widthToDp('6%'),
  },
  header__btntxt: {
    fontSize: widthToDp('4.5%'),
    fontFamily: 'Montserrat-Regular',
  },
  demo__upper_container: {
    alignItems: 'center',
    top: 30,
  },
  avatar__style: {
    width: 80,
    height: 80,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    borderColor: '#cacaca',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar__icon: {
    fontSize: 32,
    color: '#3C3644',
  },

  upper__txt: {
    fontSize: widthToDp('10%'),
    color: '#979797',
    fontFamily: 'Montserrat-SemiBold',
  },

  upper__txt2: {
    fontSize: widthToDp('4.4%'),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6);',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('3%'),
  },

  demo__middle_container: {
    marginTop: heightToDp('5%'),
    paddingHorizontal: widthToDp('5%'),
  },

  middle__style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    borderColor: '#d4d4d4',
  },
  input__style: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    height: 48,
    paddingHorizontal: widthToDp('5%'),
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: heightToDp('3%'),
  },
  input__style1: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp('5%'),
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: heightToDp('3%'),
  },
  middle_txt_style: {
    color: '#3C3644',
    fontSize: widthToDp('4%'),
    alignSelf: 'center',
  },
  demo__lower_container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightToDp('7%'),
    paddingHorizontal: widthToDp('5%'),
  },
  demo__lower_container1: {
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('1%'),
  },
  demo__lower_container2: {
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('2%'),
  },
  lower__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('3%'),
  },
  lower__btntxt1: {
    color: '#f2f2f2',
    fontFamily: 'Montserrat-Regular',
  },
  demo__lower_container3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: widthToDp('3.5%'),
    color:'#000'
  },
  demo__lower_container4: {
    color: '#008753',
    marginLeft: widthToDp('2%'),
    fontFamily: 'Montserrat-Regular',
    fontSize: widthToDp('3.5%'),
  },
  lower__txt_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightToDp('4%'),
  },
  lower__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#ECECEC',
    borderColor: '#d4d4d4',
    paddingTop: heightToDp('2%'),
    paddingBottom: heightToDp('1%'),
  },
  lower__btntxt_style: {
    color: '#3C3644',
    fontSize: widthToDp('4%'),
  },
  lower__icon_style: {
    fontSize: widthToDp('6%'),
    color: '#d4d4d4',
  },
});
