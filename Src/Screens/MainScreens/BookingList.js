import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import axios from '../../Components/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import BookingCard from '../../Components/BookingCard';

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

const BookingList = () => {
  const navigation = useNavigation();


  // state management.

  const [bookingData, setBookingData] = React.useState([]);
  const [userId, setUserId] = React.useState('');

  // console.log('booking data -- ', bookingData);

  // ----- get profile --

  const getProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      //   console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'profile',
      };
      const res = await axios(options);

      getBookings(res.data.id);
      setUserId(res.data.id);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // --- get booking list --

  const getBookings = async uId => {
    try {
      const res = await axios.get('bookingHistory', {
        params: {
          provider_id: uId,
        },
      });
      setBookingData(res.data.data);
      console.log('get------- book --- ', res.data);
    } catch (err) {
      console.log('get bookings -- err ', err);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.bookinglist__container}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ------- header ------ */}
      <View style={styles.header__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MIcon name="arrow-back" style={styles.header__icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.header__title}>Bookings</Text>
        </View>
        <View></View>
      </View>
      {/* ------- header end ------ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.bookinglist}>
          {bookingData == undefined ? (
            <Text
              style={{
                fontSize: widthToDp('5%'),
                alignSelf: 'center',
                marginTop: heightToDp('3%'),
                color: '#c4c4c4',
              }}>
              No Bookings Found!
            </Text>
          ) : bookingData.length == 0 ? (
            <ActivityIndicator
              color="red"
              size={40}
              style={{paddingVertical: heightToDp('3%')}}
            />
          ) : (
            bookingData.map(item => (
              <BookingCard
                key={item.id}
                title={item.sub_service}
                dateText={item.datetime}
                statusText={item.status}
                bookingId={item.booking_id}
                cost={item.money}
                user={item.single_name}
                navFunc={() =>
                  navigation.navigate('BookingDetail', {
                    userId,
                    bookingId: item.booking_id,
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  bookinglist__container: {
    flex: 1,
    backgroundColor: '#E7E6E6',
  },
  header__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('5%'),
    height: 55,
    backgroundColor: '#ffff',
    elevation: 5,
  },
  header__icon: {
    fontSize: widthToDp('7%'),
    color:'#000'
  },
  header__title: {
    fontSize: widthToDp('5%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('8%'),
    color:'#000'
  },
  bookinglist: {
    marginTop: heightToDp('1%'),
  },
});
