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
  Image,
  ActivityIndicator,
  ToastAndroid,
  Linking,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import EnIcon from 'react-native-vector-icons/Entypo';
import MapView, {Marker} from 'react-native-maps';
import axios from '../../Components/axios';
import qs from 'qs';
import GetLocation from 'react-native-get-location';
import MapViewDirections from 'react-native-maps-directions';

// dimension

const {width, height} = Dimensions.get('window');

const widthToDp = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = number => {
  let givenheight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

const RouteMap = ({route}) => {
  const navigation = useNavigation();

  // params;

  const {prov_loc, user_loc, book_id, book_mob, userName} = route.params;

  // state management

  const [servStatus, setServStatus] = React.useState(1);
  const [bookingData, setBookingData] = React.useState({});
  const [newLatitude, setNewLatitude] = React.useState(user_loc.lat);
  const [newLongitude, setNewLongitude] = React.useState(user_loc.long);

  // update status ---

  const getbookdata = async () => {
    let data = {
      booking_id: book_id,
    };
    let options = {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
      url: 'bookingAccepted',
    };
    const res = await axios(options);
    setBookingData(res.data.data[0]);
  };
  console.log('booking id', bookingData);
  const updateLocation = async () => {
    let loc_cur = await GetLocation.getCurrentPosition();

    let data = {
      booking_id: book_id,
      track_lat: loc_cur.latitude,
      track_long: loc_cur.longitude,
    };
    let options = {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify(data),
      url: 'updateTrack',
    };
    const res = await axios(options);
    setNewLongitude(res.data.data.track_longitude);
    setNewLatitude(res.data.data.track_latitude);
    console.log('update location --- ', res.data);
    console.log('new locationnnnn --- ', newLatitude, newLongitude);
  };

  intervel = setInterval(() => {
    updateLocation();
  }, 15000);

  const update_status = async sts => {
    try {
      let data = {
        booking_id: book_id,
        status: sts,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'updateBookingStatus',
      };
      const res = await axios(options);
      console.log('res --- ', res.data);

      if (res.data.status == '200') {
        ToastAndroid.show('status updated!', ToastAndroid.BOTTOM);
        sts == 4
          ? navigation.navigate('feedback', {book_id})
          : sts == 3
          ? navigation.navigate('feedback', {book_id})
          : setServStatus(sts + 1);
      } else {
        ToastAndroid.show('status failed to update!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('update status err --- ', err);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  // call function.

  const call_func = () => {
    Linking.openURL(`tel:${book_mob}`);
  };

  React.useEffect(() => {
    getbookdata();
    const handleValidateClose = () => {
      console.log('press back');
      return true;
    };

    const handler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleValidateClose,
    );

    return () => handler.remove();
  }, []);

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      {/* ------- header part -------- */}
      <View style={styles.header__container}>
        <MapView
          style={styles.map}
          region={{
            latitude: Number(prov_loc.lat),
            longitude: Number(prov_loc.long),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <MapViewDirections
            origin={{
              latitude: Number(prov_loc.lat),
              longitude: Number(prov_loc.long),
            }}
            destination={{
              latitude: Number(newLatitude),
              longitude: Number(newLongitude),
            }}
            apikey="AIzaSyD33wZr809ySlFdDUF_UnxRB0TO91R3uqY"
          />
          <Marker
            coordinate={{
              latitude: Number(prov_loc.lat),
              longitude: Number(prov_loc.long),
            }}></Marker>
          <Marker
            coordinate={{
              latitude: Number(newLatitude),
              longitude: Number(newLongitude),
            }}>
            <Image
              source={require('../../Assets/mark.png')}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          </Marker>
        </MapView>
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header__btn_style}>
          <Feather name="arrow-left" style={styles.header__icon} />
        </TouchableOpacity> */}
      </View>

      {/* ----------- lower part ------- */}

      <View style={styles.upper__btn_container}>
        <TouchableOpacity
          onPress={() => update_status(3)}
          style={styles.btn1_style}>
          <EnIcon name="check" style={styles.icon_style} />
          <Text style={styles.btntxt_style}>Job Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => call_func()} style={styles.btn_style}>
          <Feather name="phone-call" style={styles.icon_style} />
          <Text style={styles.btntxt_style}>Call Client</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header__container: {
    position: 'relative',
    height: heightToDp('70%'),
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    left: 30,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  header__icon: {
    fontSize: widthToDp('6%'),
  },
  header__icon1: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: widthToDp('40%'),
    paddingTop: heightToDp('5%'),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  lower__container: {
    paddingHorizontal: widthToDp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_style: {
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    borderRadius: 20,
    
    alignItems: 'center',
    marginTop: heightToDp('2%'),
    elevation: 5,
    width: 250,
  },
  btn1_style: {
    backgroundColor: '#F33F00',
    flexDirection: 'row',
    height: 50,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightToDp('8%'),
    elevation: 5,
    width: 250,
  },
  icon_style: {
    fontSize: widthToDp('6%'),
    color: '#fff',
  },
  btntxt_style: {
    color: '#fff',
    fontSize: 20,
    marginLeft: widthToDp('3%'),
    textTransform: 'capitalize',
  },
  lower_info: {},
  info__container: {
    marginTop: heightToDp('2%'),
    marginBottom: heightToDp('2%'),
  },
  info_txt: {
    fontSize: widthToDp('4%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  info1_txt: {
    fontSize: widthToDp('4.5%'),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#000',
    marginTop: 2,
  },
  lower__ques: {},
  ques_item: {},
  quest_title: {
    alignSelf: 'center',
    fontSize: widthToDp('4.5%'),
    fontWeight: 'bold',
    marginTop: heightToDp('2%'),
    textAlign: 'justify',
  },
  quest_btn: {
    backgroundColor: '#DC7633',
    height: 40,
    width: '50%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: heightToDp('3%'),
    elevation: 5,
  },
  quest_btn_txt: {
    textTransform: 'capitalize',
    color: '#fff',
  },
  upper__btn_container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
