import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from 'react-native';
import Eicon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/Feather';
import Evicon from 'react-native-vector-icons/EvilIcons';
import Mcicon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios';
import {Avatar} from 'react-native-paper';

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

const DrawerContent = props => {
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
  console.log('profileid', profile_data);
  // -----

  React.useEffect(() => {
    get_profile();
  }, []);
  return (
    <View style={styles.drawer__container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Profile')}
        style={styles.drawer__header}>
        <View style={styles.avatar__style}>
          <View style={styles.avatar__style}>
            {profile_data.profile_picture === null ? (
              <Avatar.Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                }}
                size={60}
                style={styles.avatarStyle}
              />
            ) : (
              <Avatar.Image
                source={{uri: profile_data.profile_picture}}
                size={60}
                style={styles.avatarStyle}
              />
            )}
          </View>
        </View>
        <View style={styles.header__info}>
          <Text style={styles.info__title}>
            {profile_data.first_name} {profile_data.last_name}
          </Text>
          <Text style={styles.info__subtitle}>View Profile</Text>

          <View style={styles.reviewicon__container}>
            {profile_data.rating == 1 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
              </View>
            ) : profile_data.rating == 2 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />

                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
              </View>
            ) : profile_data.rating == 2 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />

                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
              </View>
            ) : profile_data.rating == 3 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />

                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
              </View>
            ) : profile_data.rating == 4 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={{fontSize: widthToDp('4%')}} />
              </View>
            ) : profile_data.rating == 5 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
                <Eicon name="star" style={styles.staricon__style} />
              </View>
            ) : profile_data.rating == 0 ? (
              <View style={{flexDirection: 'row'}}>
                <Eicon
                  name="star"
                  style={{fontSize: widthToDp('4%'), color: '#858585'}}
                />
                <Eicon
                  name="star"
                  style={{fontSize: widthToDp('4%'), color: '#858585'}}
                />
                <Eicon
                  name="star"
                  style={{fontSize: widthToDp('4%'), color: '#858585'}}
                />
                <Eicon
                  name="star"
                  style={{fontSize: widthToDp('4%'), color: '#858585'}}
                />
                <Eicon
                  name="star"
                  style={{fontSize: widthToDp('4%'), color: '#858585'}}
                />
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>

      {/* ------ main content ------ */}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#c4c4c4',
          marginTop: 20,
        }}
      />

      <View style={styles.main__content}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Payment')}
          style={styles.drawer__item}>
          <FIcon name="credit-card" style={styles.main__icon} />
          <Text style={styles.main__txt}>payments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookingList')}
          style={styles.drawer__item}>
          <FIcon name="clock" style={styles.main__icon} />
          <Text style={styles.main__txt}>bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Setting')}
          style={styles.drawer__item}>
          <FIcon name="settings" style={styles.main__icon} />
          <Text style={styles.main__txt}>settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Review')}
          style={styles.drawer__item}>
          <Evicon name="star" style={styles.main__icon} />
          <Text style={styles.main__txt}>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TransactionHistory')}
          style={styles.drawer__item}>
          <Mcicon name="history" style={styles.main__icon} />
          <Text style={styles.main__txt}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Legal')}
          style={styles.drawer__item}>
          <FIcon name="info" style={styles.main__icon} />
          <Text style={styles.main__txt}>legal</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('PaymentSuccess')}
          style={styles.drawer__item}>
          <FIcon name="info" style={styles.main__icon} />
          <Text style={styles.main__txt}>PaymentSuccess</Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#c4c4c4',
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  reviewicon__container: {
    flexDirection: 'row',
    marginTop: widthToDp('2%'),
    justifyContent: 'space-between',
  },
  staricon__style: {
    fontSize: 15,
    color: 'gold',
  },
  drawer__container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  avatar__style: {
    backgroundColor: '#cacaca',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  drawer__header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('5%'),
    paddingVertical: heightToDp('2%'),
  },
  avatar__style: {
    backgroundColor: '#cacaca',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  header__icon: {
    fontSize: widthToDp('6%'),
  },
  header__info: {
    marginLeft: widthToDp('5%'),
  },
  info__title: {
    fontSize: widthToDp('4.5%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  info__subtitle: {
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    fontSize: widthToDp('3.6%'),
  },
  main__content: {
    paddingHorizontal: widthToDp('7%'),
    marginTop: heightToDp('3%'),
  },
  drawer__item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightToDp('5%'),
  },
  main__icon: {
    fontSize: widthToDp('5%'),
    color: '#000',
  },
  main__txt: {
    fontSize: widthToDp('4%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('2%'),
    color: '#000',
  },
});
