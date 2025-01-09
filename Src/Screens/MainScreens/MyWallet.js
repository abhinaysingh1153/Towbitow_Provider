import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from '../../Components/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const MyWallet = () => {
  const navigation = useNavigation();

  // state management.

  const [profile_data, setProfileData] = React.useState('');

  // console.log('profile --- ', profile_data);

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
      setProfileData(res.data);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // -----

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
          <Text style={styles.header__btntxt}>My Wallet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demo__upper_container}>
        <Text style={styles.upper__txt1}></Text>
      </View>
      <View style={styles.header__btn_style4}>
        <Text style={styles.upper__txt}>$ {profile_data.wallet}</Text>
        <View style={styles.lower__container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddFund')}
            style={styles.header__btn_style2}>
            <Text style={styles.lower__btntxt3}>Withdrawl funds</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ------------ demo lower part --------- */}
      <ScrollView></ScrollView>
    </View>
  );
};

export default MyWallet;

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
    width: '80%',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
    color: '#fff',
    marginTop: heightToDp('2%'),
    alignSelf: 'center',
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__btn_style2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    borderRadius: 32,
    paddingHorizontal: widthToDp('10%'),
    backgroundColor: '#022299',

    color: '#fff',
  },
  header__icon: {
    fontSize: widthToDp('6%'),
    color:'#000'
  },
  header__btntxt: {
    fontSize: widthToDp('5%'),
    color: '#000',
    marginLeft: widthToDp('2%'),
  },
  demo__upper_container: {
    marginTop: heightToDp('1%'),
  },
  upper__txt: {
    fontSize: widthToDp('6%'),
    marginBottom: heightToDp('5%'),
    color: '#000',
    fontFamily: 'Montserrat-SemiBold',
  },
  upper__txt1: {
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    fontFamily: 'Montserrat-Regular',
  },
  demo__lower_container: {
    width: '100%',
    alignSelf: 'center',
    marginTop: heightToDp('2%'),
    paddingHorizontal: widthToDp('5%'),
  },
  lower__container: {
    paddingHorizontal: widthToDp('7%'),
    paddingTop: heightToDp('1%'),

    alignItems: 'center',
  },
  lower__btntxt3: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
