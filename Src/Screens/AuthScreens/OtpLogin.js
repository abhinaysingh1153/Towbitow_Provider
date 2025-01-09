import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../Components/AuthContext';
import axios from '../../Components/axios';
import qs from 'qs';
import messaging from '@react-native-firebase/messaging';

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

const OtpLogin = ({route}) => {
  const {login} = React.useContext(AuthContext);

  const {c_code, phone_data, otp} = route.params;

  const pin1ref = React.useRef(null);
  const pin2ref = React.useRef(null);
  const pin3ref = React.useRef(null);
  const pin4ref = React.useRef(null);

  // state management.
  const [fcmToken, setFcmToken] = React.useState('');
  const [pre_loader, setPreLoader] = React.useState(false);
  const [otp_data, setOtpData] = React.useState({
    first_no: '',
    sec_no: '',
    thrd_no: '',
    frth_no: '',
  });

  // verify otp ------

  const verify__otp = async () => {
    try {
      if (
        otp_data.first_no == '' ||
        otp_data.sec_no == '' ||
        otp_data.thrd_no == '' ||
        otp_data.frth_no == ''
      ) {
        ToastAndroid.show('fill otp properly!', ToastAndroid.BOTTOM);
      } else {
        setPreLoader(true);
        let main__otp =
          otp_data.first_no +
          otp_data.sec_no +
          otp_data.thrd_no +
          otp_data.frth_no;

        console.log(main__otp);

        let data = {
          mobile_number: phone_data,
          otp: main__otp,
          code: c_code,
          token: fcmToken,
        };

        let options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'verifyotp',
        };

        const res = await axios(options);

        console.log('verify otp res --- ', res.data);

        setPreLoader(false);

        res.data.access_token
          ? login(res.data.access_token)
          : ToastAndroid.show('invalid otp!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('verify res --- ', err);
      setPreLoader(false);
    }
  };

  // get fcm token ----

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('fcm token ---- ', fcmToken);
      setFcmToken(fcmToken);
    } catch (err) {
      console.log('fcm token err -- ', err);
    }
  };

  React.useEffect(() => {
    getToken();
    Alert.alert('otp', JSON.stringify(otp));
    pin1ref.current.focus();
  }, []);

  return (
    <View style={styles.demo__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      {/* ------------ demo upper part --------- */}
      <View style={styles.demo__upper_container}>
        <Text style={styles.upper__txt}>Enter code</Text>

        <View style={{marginTop: widthToDp('2%')}}>
          <Text style={styles.upper__txt1}>An SMS code was sent to</Text>
          <Text style={styles.upper__txt2}>
            +{c_code} {phone_data}
          </Text>
          <Text style={styles.demo__lower_container4}>Edit phone number</Text>
        </View>
      </View>
      {/* ------------ demo middle part --------- */}

      <View style={styles.demo__middle_container}>
        <View style={styles.middle_input_container}>
          <TextInput
            ref={pin1ref}
            value={otp_data.first_no}
            onChangeText={text => {
              setOtpData(prevstate => ({...prevstate, first_no: text}));
              if (otp_data.first_no == '') {
                pin2ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            placeholder="-"
            maxLength={1}
            type="number"
            placeholderTextColor="black"
            style={styles.input__style}
          />
          <TextInput
            ref={pin2ref}
            value={otp_data.sec_no}
            onChangeText={text => {
              setOtpData(prevstate => ({...prevstate, sec_no: text}));
              if (otp_data.sec_no == '') {
                pin3ref.current.focus();
              } else {
                pin1ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            placeholder="-"
            type="number"
            maxLength={1}
            placeholderTextColor="black"
            style={styles.input__style}
          />
          <TextInput
            ref={pin3ref}
            value={otp_data.thrd_no}
            onChangeText={text => {
              setOtpData(prevstate => ({...prevstate, thrd_no: text}));
              if (otp_data.thrd_no == '') {
                pin4ref.current.focus();
              } else {
                pin2ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            placeholder="-"
            maxLength={1}
            type="number"
            placeholderTextColor="black"
            style={styles.input__style}
          />
          <TextInput
            ref={pin4ref}
            value={otp_data.frth_no}
            onChangeText={text => {
              setOtpData(prevstate => ({...prevstate, frth_no: text}));
              if (otp_data.frth_no != '') {
                pin3ref.current.focus();
              }
            }}
            keyboardType="number-pad"
            placeholder="-"
            type="number"
            maxLength={1}
            placeholderTextColor="black"
            style={styles.input__style}
          />
        </View>
      </View>

      {pre_loader ? <ActivityIndicator color="red" size={40} /> : null}

      {/* ------------ demo lower part --------- */}
      <View style={styles.lower__container}>
        <Text style={{fontFamily: 'Montserrat-Regular', color: '#979797'}}>
          Resend code in 16
        </Text>
        <TouchableOpacity
          onPress={() => verify__otp()}
          style={styles.header__btn_style2}>
          <Text style={styles.lower__btntxt1}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpLogin;

const styles = StyleSheet.create({
  demo__container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('3%'),
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__btn_style2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    height: 48,
    backgroundColor: '#ffff',
    color: '#F2F2F2',
    marginTop: heightToDp('2%'),
    elevation: 5,
  },
  header__icon: {
    fontSize: widthToDp('6%'),
  },
  header__btntxt: {
    fontSize: widthToDp('4.5%'),
  },

  demo__upper_container: {
    marginTop: heightToDp('10%'),
    paddingHorizontal: widthToDp('9%'),
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
    fontSize: widthToDp('7%'),
    marginTop: heightToDp('2%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },

  upper__txt2: {
    fontSize: widthToDp('4%'),
    marginTop: 5,
    color: '#000',
  },
  upper__txt1: {
    fontSize: widthToDp('4%'),
    color: 'rgba(0, 0, 0, 0.41)',
    fontFamily: 'Montserrat-Regular',
  },

  demo__middle_container: {
    marginTop: heightToDp('2%'),
  },
  demo__lower_container4: {
    color: '#008753',
    fontSize: widthToDp('3.6%'),
    fontFamily: 'Montserrat-Regular',
  },
  middle_input_container: {
    paddingHorizontal: widthToDp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input__style: {
    backgroundColor: 'rgba(196, 196, 196, 0.55)',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    height: 48,
    width: 67,
    textAlign: 'center',
    borderRadius: 8,
    color: '#000',
  },
  middle_txt_style: {
    color: '#3C3644',
    fontSize: widthToDp('4%'),
    alignSelf: 'center',
  },
  demo__lower_container: {
    borderWidth: 1,
    borderColor: '#cacaca',
    backgroundColor: '#ECECEC',
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('5%'),
  },

  lower__btntxt1: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  lower__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('20%'),
  },
  lower__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
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
