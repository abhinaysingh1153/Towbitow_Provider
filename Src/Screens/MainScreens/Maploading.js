import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import PopupComponent from '../../Components/PopupComponent';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../../Components/axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
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

Sound.setCategory('Playback');

var ding = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
  );
});

const Maploading = () => {
  const navigation = useNavigation();

  // state management.

  const [status_btn, setstatus_btn] = React.useState('');
  const [profile_data, setProfileData] = React.useState('');
  const [pre_loader, setPreloader] = React.useState(false);
  const [booking_data, setBookingData] = React.useState([]);
  const [c_location, setc_location] = React.useState({
    c_lat: '37.3875',
    c_long: '122.0575',
  });


  console.log('booking data------------', booking_data)

  console.log('location --------------', c_location);

    const [app_name, setApp_name] = React.useState('');
    const get__name = async () => {
      try {
        const res = await axios.get(
          'https://admin.nootans.com/provider/getappname',
        );
        console.log('app setting data', res.data.data.app_name);
        setApp_name(res.data.data.app_name);
      } catch (err) {
        // console.log('get name ---- ', app_name);
      }
    };

  // plAy sound function ----

  const playPause = () => {
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const Pause = () => {
    ding.pause(success => {
      if (success) {
        console.log('successfully Pause playing sound');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };
  console.log(profile_data);

  let intervel = React.useRef();

  // const start_timer = () => {
  if (status_btn == 1) {
    intervel = setInterval(() => {
      check_booking(profile_data.id, c_location.c_lat, c_location.c_long);
      clearInterval(intervel.current);
      clearInterval(intervel);
      console.log('yo!');
    }, 3000);
  } else {
    clearInterval(intervel.current);
  }
  // };

  // get profile data ---

  const get_profile = async () => {
    try {
       setPreloader(true);
      let loc_cur = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
       console.log('location --- ', loc_cur.latitude, loc_cur.longitude);
        setc_location(prev => ({
        ...prev,
        c_lat: loc_cur.latitude,
        c_long: loc_cur.longitude,
      }));
      let userData = await AsyncStorage.getItem('userData');
      // console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'profile',
      };
      const res = await axios(options);
       setPreloader(false);
      // console.log('res --- ', res.data);
     
      setProfileData(res.data);
      setstatus_btn(res.data.status);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // --- check booking ---
  const check_booking = async (pr_id, b_lat, b_long) => {
    try {
      let data = {
        provider_id: pr_id,
        latitude: b_lat,
        longitude: b_long,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'newBooking',
      };
      const res = await axios(options);
      console.log('res booking --- ', res.data.data);

      setBookingData(res.data.data);
      res.data.data.length && playPause();
    } catch (err) {
      console.log('check booking err --- ', err);
    }
  };

  // define status ---

  const status_change = async () => {
    try {
      setPreloader(true);
      let data = {
        id: profile_data.id,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'updateStatus',
      };
      const res = await axios(options);
      console.log('res --- ', res.data);
      setPreloader(false);
      if (res.data.status == '200') {
        setstatus_btn(res.data.data);
        res.data.data == '1'
          ? ToastAndroid.show('you are online', ToastAndroid.BOTTOM)
          : ToastAndroid.show('you are offline', ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show('something went wrong!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('get status err ----', err);
      setPreloader(false);

      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  // decline booking

  const declineBooking = async () => {
    try {
      let data = {
        booking_id: booking_data[0]['booking_id'],
        provider_id: profile_data.id,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'providerDeclineBooking',
      };
      const res = await axios(options);
      console.log('res --- decline -', res.data);

      if (res.data.status == '200') {
        Pause();
        check_booking(profile_data.id, c_location.c_lat, c_location.c_long);
        clearInterval(intervel.current);
        ToastAndroid.show('Booking Declined!', ToastAndroid.BOTTOM);
      } else {
        ToastAndroid.show('decline failed!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('decline booking err --- ', err);
    }
  };

  // accept booking

  const prov_booking = async () => {
    try {
      setPreloader(true);
      let data = {
        id: booking_data[0]['id'],
        provider_id: profile_data.id,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'acceptBooking',
      };
      const res = await axios(options);
      console.log('res --- accept -', res.data);
      setPreloader(false);

      if (res.data.status == 200) {
        ToastAndroid.show('Accept Request sent!', ToastAndroid.BOTTOM);
        navigation.navigate('RouteMap', {
          prov_loc: {lat: c_location.c_lat, long: c_location.c_long},
          user_loc: {
            lat: booking_data[0]['latitude'],
            long: booking_data[0]['longitude'],
          },
          book_id: booking_data[0]['booking_id'],
          book_mob: booking_data[0]['mobile'],
          userName: booking_data[0]['full_name'],
        });
        Pause();
        clearInterval(intervel.current);
      } else {
        ToastAndroid.show('Request Failed to send!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('prv book err ---', err);
      setPreloader(false);
      ToastAndroid.show('server problem occurs!', ToastAndroid.BOTTOM);
    }
  };

  // ask permission for notify ---

  const notify = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      messaging().onMessage(async remoteMessage =>{
        console.log('notification handle in froground state...', remoteMessage)
      })
  };

  // -----

  React.useEffect(() => {
    get_profile();
    ding.setVolume(1);
    notify();
    get__name();
    NotificationListner();
    return () => {
      clearInterval(intervel);
      clearInterval(intervel.current);
      console.log('clear done!');
      console.log('clear done!');
    };
  }, []);

  // React.useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           JSON.stringify(remoteMessage),
  //         );
  //       }
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });
  // }, []);

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      <View style={styles.map__container}>
        <MapView
          style={styles.map__style}
          region={{
            latitude: Number(c_location.c_lat),
            longitude: Number(c_location.c_long),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: Number(c_location.c_lat),
              longitude: Number(c_location.c_long),
            }}
            title={`${profile_data.first_name} ${profile_data.last_name}`}
          />
        </MapView>
        {/* 
        <PopupComponent
          name={`${booking_data[0]['full_name']}`}
          u_email={booking_data[0]['email']}
          book_id={booking_data[0]['booking_id']}
          mobile_num={booking_data[0]['mobile_number']}
          acpt_func={() => prov_booking()}
          dclnFunc={() => declineBooking()}
          total={booking_data[0]['total']}
          hours={booking_data[0]['hours']}
          service_rate={booking_data[0]['service_rate']}
          person={booking_data[0]['person']}
          service_name={booking_data[0]['service_name']}
          servicename={booking_data[0]['servicename']}
          userpic={booking_data[0]['user_pic']}
          app_name={app_name}
        /> */}

        {booking_data == undefined ? null : booking_data.length == 0 ? null : (
          <PopupComponent
            name={`${booking_data[0]['full_name']}`}
            u_email={booking_data[0]['email']}
            address={booking_data[0]['address']}
            book_id={booking_data[0]['booking_id']}
            mobile_num={booking_data[0]['mobile']}
            acpt_func={() => prov_booking()}
            dclnFunc={() => declineBooking()}
            total={booking_data[0]['total']}
            hours={booking_data[0]['hours']}
            service_rate={booking_data[0]['serviceprice']}
            person={booking_data[0]['person']}
            service_name={booking_data[0]['servicename']}
            servicename={booking_data[0]['servicename']}
            vehicle_Info={booking_data[0]['vehicle_info']}
            userpic={booking_data[0]['user_pic']}
            app_name={app_name}
          />
        )}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.icon__container}>
          <McIcon name="segment" style={styles.icon__style} />
        </TouchableOpacity>

        {/* ------------ btn container ------- */}

        {pre_loader && (
          <View style={styles.loader__style}>
            <ActivityIndicator size={50} color="red" />
          </View>
        )}

        <View style={styles.btn__container}>
          {status_btn == undefined ? null : status_btn != '1' ? (
            <TouchableOpacity
              onPress={() => status_change()}
              style={styles.btn1__style}>
              <Text style={styles.btntxt__style}>On Duty</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => status_change()}
              style={styles.btn2__style}>
              <Text style={styles.btntxt__style}>Off Duty</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Maploading;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  map__container: {
    position: 'relative',
  },
  map__style: {
    width: '100%',
    height: '100%',
  },
  icon__container: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    height: 50,
    width: 50,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    top: 20,
    elevation: 5,
  },
  icon__style: {
    fontSize: widhtToDp('7%'),
    color: '#000',
  },
  btn__container: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: widhtToDp('5%'),
    zIndex: 5,
  },
  btn1__style: {
    backgroundColor: '#000000',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  btn2__style: {
    backgroundColor: 'green',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
  },
  btntxt__style: {
    color: '#fff',
    fontSize: widhtToDp('4%'),
    textTransform: 'capitalize',
  },
  loader__style: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: heightToDp('50%'),
    backgroundColor: '#f7f7f7',
    padding: 5,
    borderRadius: 8,
  },
});
