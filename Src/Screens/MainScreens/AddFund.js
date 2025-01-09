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
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from '../../Components/axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './Card';
import MyWallet from './MyWallet';
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

const AddFund = () => {
  const navigation = useNavigation();

  // state management--

  const [amtTxt, setamtTxt] = React.useState('');
  const [profile_data, setProfileData] = React.useState('');
  const [accData, setAccData] = React.useState('');
  const [preloader, setpreloader] = React.useState(false);

  console.log('profile --- ', profile_data);

  // get profile data ---

  const get_profile = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      // console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'profile',
      };
      const res = await axios(options);
      // console.log('res --- ', res.data);
      setProfileData(res.data.id);
      setAccData(res.data.acc_number);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // Withdrdawl api funnction-----

  const withdrawlAmt = async () => {
    try {
      if (amtTxt == '') {
        ToastAndroid.show('Enter amount to withdraw!', ToastAndroid.BOTTOM);
      } else {
        setpreloader(true);
        let data = {
          userid: profile_data,
          withdraw_amount: amtTxt,
        };

        let options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'withdrawamount',
        };
        const res = await axios(options);

        console.log('res --- ', res.data);
        setpreloader(false);
        res.data.status == '200'
          ? ToastAndroid.show('Withdraw Request sent successfully!', ToastAndroid.BOTTOM)
          : ToastAndroid.show(res.data.message, ToastAndroid.BOTTOM);
          navigation.navigate('MyWallet');
      }
    } catch (err) {
      console.log('withdrawlAmt err', err);
      setpreloader(false);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  React.useEffect(() => {
    get_profile();
  }, []);

  return (
    <View style={styles.demo__container}>
      {/* ------- header part -------- */}
      <View style={styles.header__container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header__btn_style}>
          <Feather name="arrow-left" style={styles.header__icon} />
          <Text style={styles.header__btntxt}>Withdrawl Fund</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.demo__upper_container}>
          <Text style={styles.upper__txt1}></Text>
        </View>

        {/* ------------ demo lower part --------- */}
        <View style={styles.demo__lower_container}>
          <TextInput
            value={amtTxt}
            onChangeText={text => setamtTxt(text)}
            placeholderTextColor="black"
            placeholder="Enter amount"
            keyboardType="number-pad"
            style={styles.input__style}
          />
        </View>
        <View style={styles.demo__upper_container}>
          <Text style={styles.upper__txt1}></Text>
        </View>

        {preloader && (
          <ActivityIndicator
            size={40}
            color="red"
            style={{marginVertical: heightToDp('3%')}}
          />
        )}

        <View style={styles.lower__container}>
          <TouchableOpacity
            onPress={() => withdrawlAmt()}
            style={styles.header__btn_style2}>
            <Text style={styles.lower__btntxt3}>Withdrawl funds</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFund;

const styles = StyleSheet.create({
  demo__container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: heightToDp('3%'),
  },
  header__btn_style4: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 200,
    elevation: 5,
    width: 300,
    marginHorizontal: widthToDp('11%'),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    color: '#fff',
    marginTop: heightToDp('2%'),
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__btn_style2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: heightToDp('7%'),
    borderRadius: 32,
    width: '90%',
    backgroundColor: '#022299',

    color: '#fff',
  },
  header__icon: {
    fontSize: widthToDp('6%'),
  },
  header__btntxt: {
    fontSize: widthToDp('5%'),
    color: '#000',
    marginLeft: widthToDp('2%'),
    fontFamily: 'Montserrat-Regular',
  },
  demo__upper_container: {
    marginTop: heightToDp('1%'),
  },
  demo__upper_container1: {
    marginTop: heightToDp('1%'),
    paddingHorizontal: widthToDp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upper__txt: {
    fontSize: widthToDp('6%'),
    marginBottom: heightToDp('5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  upper__txt1: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  input__style: {
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: heightToDp('2%'),
    borderColor: '#d4d4d4',
    height: 60,
    paddingHorizontal: widthToDp('7%'),
    width: 311,
    alignSelf: 'center',
    borderRadius: 8,
  },
  demo__lower_container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightToDp('2%'),
    paddingHorizontal: widthToDp('5%'),
  },
  lower__style_txt: {
    fontSize: widthToDp('3.5%'),
    color: '#3C3644',
    paddingHorizontal: widthToDp('9%'),
    fontFamily: 'Montserrat-Regular',
  },
  lower__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    backgroundColor: 'rgba(202, 202, 202, 0.13)',
    margin: heightToDp('0.5%'),
    borderColor: '#d4d4d4',
    padding: widthToDp('2%'),
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
  lower__style_txt1: {
    fontSize: widthToDp('4%'),
    color: '#3C3644',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  lower__style_txt1: {
    fontSize: widthToDp('4%'),
    color: '#3C3644',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  lower__style_txt2: {
    fontSize: widthToDp('7%'),
    color: '#3C3644',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  lower__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lower__btntxt3: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
