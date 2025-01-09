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
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {Picker as SelectPicker} from '@react-native-picker/picker';

import {useNavigation} from '@react-navigation/native';
import axios from '../../Components/axios';
import qs from 'qs';

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

const MobileLogin = () => {
  const navigation = useNavigation();

  // state management.

  const [pre_loader, setPreLoader] = React.useState(false);
  const [phone_data, setPhoneData] = React.useState('');
  const [select_code, setSelectCode] = React.useState('');
  const [Country, setCountry] = React.useState('');
  const [all_codes, setAllCode] = React.useState([]);


  console.log(select_code,'------selecat code')

  const get__otp = async () => {
    try {
      if (phone_data == '') {
        ToastAndroid.show('Enter phone number!', ToastAndroid.BOTTOM);
      } else {
        if (select_code == '') {
          ToastAndroid.show('select country code!', ToastAndroid.BOTTOM);
        } else {
          setPreLoader(true);
          let data = {
            mobile_number: phone_data,
            code: select_code,
          };
          let options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: 'sendotp',
          };

          const res = await axios(options);

          console.log('opt res --- ', res.data);

          setPreLoader(false);

          res.data.status == '200'
            ? navigation.navigate('OtpLogin', {
                c_code: select_code,
                phone_data,
                otp: res.data.data,
              })
            : ToastAndroid.show(
                'please check the number!',
                ToastAndroid.BOTTOM,
              );
        }
      }
    } catch (err) {
      setPreLoader(false);
      ToastAndroid.show(
        'please check the credential or try again later!',
        ToastAndroid.BOTTOM,
      );
      console.log('get otp err ---- ', err);
    }
  };

  // get all country codes.

  const get__codes = async () => {
    try {
      const res = await axios.get('getCountryCode');

      setAllCode(res.data.data);
    } catch (err) {
      console.log('get codes ---- ', err);
    }
  };

  React.useEffect(() => {
    get__codes();
  }, []);

  return (
    <View style={styles.demo__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />

      {/* ------------ demo upper part --------- */}

      <View style={styles.demo__upper_container}>
        <Text style={styles.upper__txt}>Enter your number</Text>

        <View style={{marginTop: widthToDp('2%')}}>
          <Text style={styles.upper__txt1}>
            We will send a code to verify your mobile
          </Text>
          <Text style={styles.upper__txt1}>number</Text>
        </View>
      </View>

      {all_codes.length == 0 ? (
        <ActivityIndicator color="red" size={40} />
      ) : null}

      {/* ------------ demo middle part --------- */}
      <View style={styles.demo__lower_container}>
        <View style={styles.input__style1}>
          <View
            style={{
              width: '30%',
            }}>
            <SelectPicker
              selectedValue={Country}
              onValueChange={(value, index) => setSelectCode(value.toString(), setCountry(value))}
              style={{width: '100%', borderWidth: 1, color: '#000'}}>
              {all_codes == undefined
                ? null
                : all_codes.length == 0
                ? null
                : all_codes.map(item => (
                    <SelectPicker.Item
                      key={item.id}
                      style={{fontSize: widthToDp('3.3%')}}
                      label={item.iso}
                      value={item.phonecode}
                    />
                  ))}
            </SelectPicker>
          </View>
          <TextInput
            value={select_code}
            editable={false}
            style={{width: '10%', color: '#000'}}
          />
          <TextInput
            value={phone_data}
            onChangeText={text => setPhoneData(text)}
            style={{width: '45%', color: '#000'}}
            keyboardType="phone-pad"
            placeholderTextColor="#000"
            placeholder="Phone number"
            maxLength={10}
          />
        </View>
      </View>

      {pre_loader && <ActivityIndicator color="red" size={40} />}

      {/* ------------ demo lower part --------- */}
      <View style={styles.lower__container}>
        <TouchableOpacity onPress={() => navigation.navigate('loginemail')}>
          <Text style={{color: '#979797', fontFamily: 'Montserrat-Regular'}}>
            Login in with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => get__otp()}
          style={styles.header__btn_style2}>
          <Text style={styles.lower__btntxt1}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MobileLogin;

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
    width: '100%',
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
  input__style1: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    marginTop: heightToDp('2%'),
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('5%'),
    alignSelf: 'center',
    borderRadius: 8,
  },
  upper__txt: {
    fontSize: widthToDp('7%'),
    marginTop: heightToDp('2%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },

  upper__txt1: {
    fontSize: widthToDp('3.5%'),
    color: 'rgba(0, 0, 0, 0.41)',
    fontFamily: 'Montserrat-Regular',
  },

  middle_txt_style: {
    color: '#3C3644',
    fontSize: widthToDp('4%'),
    alignSelf: 'center',
  },
  demo__lower_container: {
    alignSelf: 'center',
    marginTop: heightToDp('3%'),
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
