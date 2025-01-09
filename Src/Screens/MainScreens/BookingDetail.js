import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import axios from '../../Components/axios';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

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

const BookingDetail = ({route}) => {
  const navigation = useNavigation();

  // route params;

  const {userId, bookingId} = route.params;
  console.log('boking id -- ', bookingId);

  // --- state management.

  const [bookingDetail, setBookingDetail] = React.useState('');
  const [preLoader, setPreLoader] = React.useState(false);

  const [invoiceData, setInvoiceData] = React.useState('');
  const [profileData, setProfileData] = React.useState('');

  //   console.log('profile data -- --- ', profileData);

  // ----- get invoice data ----

  const getInvoice = async () => {
    try {
      let data = {
        booking_id: bookingId,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'bookingDetails',
      };
      const res = await axios(options);
      //   console.log('get invoice res --- ', res.data);
      setInvoiceData(res.data.data[0]);
    } catch (err) {
      console.log('get invoice err ---- ', err);
    }
  };

  //   console.log('profile --- ', profileData);

  // ----- get profile --

  const getProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      //   console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'user-profile',
      };
      const res = await axios(options);

      setProfileData(res.data);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // ---- get booking details ---

  const getBooking = async () => {
    try {
      setBookingDetail('');
      const res = await axios.get('bookingDetails', {
        params: {
          user_id: userId,
          booking_id: bookingId,
        },
      });
      //   console.log('res --- ', res.data);
      setBookingDetail(res.data.data[0]);
    } catch (err) {
      console.log('get booking err --- ', err);
    }
  };

  // update status ---

  const update_status = async sts => {
    try {
      setPreLoader(true);
      let data = {
        booking_id: bookingId,
        status: sts,
      };
      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'updateBookingStatus',
      };
      const res = await axios(options);
      setPreLoader(false);
      //   console.log('res --- ', res.data);

      if (res.data.status == '200') {
        ToastAndroid.show('service canceled!', ToastAndroid.BOTTOM);
        navigation.navigate('BookingList');
        // sts == 5 && navigation.navigate('feedback', {book_id: bookingId});
      } else {
        ToastAndroid.show('status failed to update!', ToastAndroid.BOTTOM);
      }
    } catch (err) {
      console.log('update status err --- ', err);
      preLoader(false);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  // ----

  React.useEffect(() => {
    getBooking();
    getInvoice();
    getProfile();
  }, [bookingId]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      <View style={styles.header__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MIcon name="arrow-back" style={styles.header__icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.header__title}>Booking details</Text>
        </View>
        <View></View>
      </View>

      {/* ----------- main content -------- */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.mainContent}>
          {/* ------------ upper container -------- */}

          <View style={styles.upperContainer}>
            <Text style={styles.titleStyle}>{bookingDetail.sub_service}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.subtitleStyle}>{bookingDetail.datetime}</Text>

              <Text style={styles.priceStyle}>${bookingDetail.total}</Text>
            </View>
            <Text style={styles.addrtitleStyle}>
              {bookingDetail.user_address}
            </Text>
          </View>

          {/* ------------ upper container end -------- */}

          {/* <View style={styles.DressCodeContainer}>
            <Text style={styles.dressCodeTitle}>Dresscode</Text>
            <View style={styles.imgContainer}>
              <Image
                source={{
                  uri: `https://grabahamas.com/carcays/public/dress/${bookingDetail.dress_image}`,
                }}
                style={styles.imgStyle}
              />
            </View>
            <Text style={styles.dressCodeTitle}>
              {bookingDetail.dress_title}
            </Text>
          </View> */}

          {/* --------------- text area container --------- */}

          <View style={styles.textareaContainer}>
            <TextInput
              placeholder="Enter any additional information"
              style={styles.input__style}
            />
          </View>

          {/* ------------- invoice btn part ------- */}

          {bookingDetail.status == 'SEARCHING' ? null : (
            <View style={styles.lowerContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('bookingdashboard', {
                    sub_cat_id: invoiceData.subid,
                    service_id: invoiceData.serviceid,
                    profile_data: profileData.id,
                    location__data: {
                      c_lat: invoiceData.latitude,
                      c_long: invoiceData.longitude,
                    },
                    bannerImg: invoiceData.service_image,
                    servTitle: invoiceData.service_name,
                    servDesc: invoiceData.service_description,
                    servPrice: invoiceData.service_rate,
                    userWallet: profileData.wallet_balance,
                  })
                }
                style={styles.editBtnContainer}>
                <McIcon name="square-edit-outline" style={styles.iconStyle} />
                <Text style={styles.editTxtStyle}>Edit repeat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('invoice', {bookingId})}
                style={styles.invoiceBtnContainer}>
                <Text style={styles.invoiceTxtStyle}>invoice</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ---- divider ----- */}

          <View style={styles.dividerStyle} />

          {/* ---- divider ----- */}

          {preLoader && <ActivityIndicator size={40} color="red" />}

          {bookingDetail.status == 'COMPLETED' ||
          bookingDetail.status == 'CANCELLED' ? null : (
            <TouchableOpacity
              onPress={() => update_status(5)}
              style={styles.btnStyle}>
              <MIcon name="cancel" style={styles.cancelIconStyle} />
              <Text style={styles.btnTxt}>Cancel booking</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingDetail;

const styles = StyleSheet.create({
  mainContainer: {},
  header__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('5%'),
    height: 55,
  },
  header__icon: {
    fontSize: widthToDp('7%'),
  },
  header__title: {
    fontSize: widthToDp('5%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('5%'),
  },
  mainContent: {},
  upperContainer: {
    paddingHorizontal: widthToDp('3%'),
    borderTopWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    paddingTop: heightToDp('5%'),
    marginTop: heightToDp('7%'),
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },

  titleStyle: {
    fontSize: widthToDp('4%'),
    fontFamily: 'Montserrat-Light',
  },

  addrtitleStyle: {
    fontSize: widthToDp('3.5%'),
    fontFamily: 'Montserrat-Light',
    marginTop: heightToDp('1.5%'),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 5,
  },
  subtitleStyle: {
    fontSize: widthToDp('3.9%'),
    fontFamily: 'Montserrat-Regular',
  },
  priceStyle: {
    fontSize: widthToDp('4%'),
    fontFamily: 'Montserrat-Regular',
  },
  DressCodeContainer: {
    paddingHorizontal: widthToDp('7%'),
    marginTop: heightToDp('2%'),
  },
  dressCodeTitle: {
    fontSize: widthToDp('3.3%'),
    color: 'rgba(0, 0, 0, 0.35)',
    fontFamily: 'Montserrat-Regular',
  },
  imgContainer: {
    width: 77,
    height: 73,
    backgroundColor: '#c4c4c4',
    marginTop: heightToDp('1%'),
    overflow: 'hidden',
    marginBottom: 3,
  },
  textareaContainer: {
    paddingHorizontal: widthToDp('7%'),
    marginTop: heightToDp('3%'),
  },
  input__style: {
    borderWidth: 0.5,
    borderColor: '#c4c4c4',
    backgroundColor: '#f7f7f7',
    height: heightToDp('23%'),
    textAlignVertical: 'top',
    paddingHorizontal: widthToDp('5%'),
    paddingTop: heightToDp('2%'),
    fontSize: widthToDp('3.3%'),
    fontFamily: 'Montserrat-Regular',
  },
  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('7%'),
    marginTop: heightToDp('5%'),
  },
  editBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: widthToDp('6%'),
  },
  editTxtStyle: {
    fontSize: widthToDp('4%'),
    marginLeft: widthToDp('5%'),
  },
  invoiceBtnContainer: {
    marginLeft: widthToDp('15%'),
    backgroundColor: '#898A8D',
    paddingHorizontal: widthToDp('8%'),
    paddingVertical: heightToDp('1%'),
    borderRadius: 16,
  },
  invoiceTxtStyle: {
    color: '#fff',
  },
  dividerStyle: {
    borderBottomWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('5%'),
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightToDp('3%'),
    marginLeft: widthToDp('10%'),
  },
  cancelIconStyle: {
    fontSize: widthToDp('5%'),
    color: 'red',
  },
  btnTxt: {
    color: 'red',
    marginLeft: widthToDp('4%'),
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
});
