import {useNavigation} from '@react-navigation/core';
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
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from '../../Components/axios';
import qs from 'qs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const ForgetPass = () => {
  const navigation = useNavigation();

  // state management.

  const [email_data, setEmailData] = React.useState('');
  const [pre_loader, setPreLoader] = React.useState(false);

  // forget password func -----

  const forget_func = async () => {
    try {
      if (email_data == '') {
        ToastAndroid.show('enter your email address!', ToastAndroid.BOTTOM);
      } else {
        setPreLoader(true);
        let data = {
          email: email_data,
        };
        let options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'forgot-password',
        };
        const res = await axios(options);

        setPreLoader(false);

        res.data.status == 200
          ? ToastAndroid.show('Request Send Successfully!', ToastAndroid.BOTTOM)
          : ToastAndroid.show('Check your email!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('forget pass err --- ', err);
      setPreLoader(false);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.demo__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      {/* ------- header part -------- */}
      <View style={styles.header__container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header__btn_style}>
          <MaterialIcons
            name="keyboard-arrow-left"
            style={styles.header__icon}
          />
          <Text style={styles.header__btntxt}>Log in</Text>
        </TouchableOpacity>
        <View style={{marginLeft: widthToDp('13%')}}>
          <Text style={styles.header__btntxt}>Password Reset</Text>
        </View>
      </View>

      {/* ------------ demo upper part --------- */}

      <ScrollView>
        <View style={styles.demo__upper_container}>
          <Text style={styles.upper__txt}>Forgot Password?</Text>
        </View>

        {/* ------------ demo lower part --------- */}

        <View style={styles.demo__lower_container}>
          <TextInput
            value={email_data}
            onChangeText={text => setEmailData(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="black"
            placeholder="Email Id"
            style={styles.input__style}
          />
        </View>

        {pre_loader && <ActivityIndicator color="red" size={40} />}

        <View style={styles.lower__container}>
          <TouchableOpacity
            onPress={() => forget_func()}
            style={styles.header__btn_style2}>
            <Text style={styles.lower__btntxt1}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgetPass;

const styles = StyleSheet.create({
  demo__container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header__container: {
    paddingHorizontal: widthToDp('2%'),
    marginTop: heightToDp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: heightToDp('1%'),
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
    backgroundColor: '#022299',
    color: '#F2F2F2',
    marginTop: heightToDp('2%'),
  },
  header__icon: {
    fontSize: widthToDp('5%'),
  },
  header__btntxt: {
    fontSize: widthToDp('4%'),
    fontFamily: 'Montserrat-Regular',
  },
  demo__upper_container: {
    alignItems: 'center',
    marginTop: heightToDp('15%'),
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
    fontSize: widthToDp('6%'),
    marginTop: heightToDp('2%'),
    color: '#979797',
    fontFamily: 'Montserrat-SemiBold',
  },

  input__style: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    borderWidth: 1,
    marginTop: heightToDp('2%'),
    borderColor: '#d4d4d4',
    height: 50,
    paddingHorizontal: widthToDp('5%'),
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  input__style1: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    borderWidth: 1,
    marginTop: heightToDp('3%'),
    borderColor: '#d4d4d4',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp('7%'),
    width: 311,
    alignSelf: 'center',
    borderRadius: 8,
  },
  middle_txt_style: {
    color: '#3C3644',
    fontSize: widthToDp('4%'),
    alignSelf: 'center',
  },
  demo__lower_container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightToDp('2%'),
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
    marginTop: heightToDp('5%'),
  },
  lower__btntxt1: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  demo__lower_container3: {
    paddingHorizontal: widthToDp('11%'),
  },
  demo__lower_container4: {
    color: '#008753',
  },
  lower__txt_style: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: heightToDp('4%'),
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
