import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  TextInput,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from '../../Components/axios';
import qs from 'qs';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
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

const Feedback = ({route}) => {
  const navigation = useNavigation();

  // state management.

  const [feedStatus, setFeedStatus] = React.useState('');
  const [feedtxt, setfeedtxt] = React.useState('');
  const [preLoader, setPreLoader] = React.useState(false);
   const [rating, setRating] = React.useState(0);

  // route params

  const {book_id} = route.params;

  // send feedback ---

  const sendFeed = async () => {
    try {
      if (rating == 0) {
        ToastAndroid.show('select any Starts!', ToastAndroid.BOTTOM);
      } else {
        setPreLoader(true);
        let data = {
          booking_id: book_id,
          provider_rating: rating,
          provider_review: feedtxt,
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'submitReview',
        };
        const res = await axios(options);
        console.log('res --- ', res.data);
        setPreLoader(false);
        if (res.data.status == '200') {
          ToastAndroid.show('Review Submitted!', ToastAndroid.BOTTOM);
          navigation.navigate('Maploading');
        } else {
          ToastAndroid.show('Review failed to Submit!', ToastAndroid.BOTTOM);
        }
      }
    } catch (err) {
      console.log('send fedd err --- ', err);
      setPreLoader(false);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  React.useEffect(() => {
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
      {/* ------------- upper part --------------- */}
      <View style={styles.upper__container}>
        <View style={styles.avatar_style}>
          <Feather name="user" style={styles.avatar_icon} />
        </View>
        <Text style={styles.upper__txt}>How was the service?</Text>
        <Text style={styles.upper__txt1}>
          Give a thumbs up for good service
        </Text>
      </View>
      {/* ------------- middle part --------------- */}
      <View style={styles.thumbsicon__container}>
        <StarRating rating={rating} onChange={setRating} size="42" />
        {/* <TouchableOpacity
          onPress={() => setFeedStatus(2)}
          style={{
            backgroundColor: feedStatus == 2 ? 'red' : 'gray',
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#CACACA',
            alignSelf: 'center',
          }}>
          <FontAwesome
            name="thumbs-down"
            style={styles.thumbsdown__icon__style}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFeedStatus(1)}
          style={{
            backgroundColor: feedStatus == 1 ? 'green' : 'gray',
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#CACACA',
            alignSelf: 'center',
          }}>
          <FontAwesome
            name="thumbs-up"
            style={{
              fontSize: widhtToDp('7%'),
              color: '#fff',
            }}
          />
        </TouchableOpacity> */}
      </View>
      {/* -----------------------lower container------------------ */}
      <View style={styles.textAreaContainer}>
        <TextInput
          placeholder="Please provide feedback"
          style={styles.textArea}
          numberOfLines={10}
          multiline={true}
        />
      </View>

      {preLoader && (
        <ActivityIndicator
          size={40}
          style={{paddingVertical: heightToDp('3%')}}
          color="red"
        />
      )}

      <TouchableOpacity
        onPress={() => sendFeed()}
        style={styles.submit__btn__container}>
        <Text style={styles.submit__btn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  upper__container: {
    marginTop: heightToDp('10%'),
  },
  avatar_style: {
    backgroundColor: '#E8E8E8',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#CACACA',
    alignSelf: 'center',
  },
  avatar_icon: {
    fontSize: widhtToDp('10%'),
  },
  upper__txt: {
    fontSize: widhtToDp('5%'),
    alignSelf: 'center',
    marginTop: heightToDp('3'),
    textTransform: 'capitalize',
  },
  upper__txt1: {
    color: '#898A8D',
    alignSelf: 'center',
    marginTop: heightToDp('1'),
  },
  thumbsicon__container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: heightToDp('5%'),
  },
  thumbsupicon__container: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CACACA',
    alignSelf: 'center',
  },
  thumbsdownicon__container: {
    backgroundColor: '#022299',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CACACA',
    alignSelf: 'center',
  },
  thumbsup__icon__style: {
    fontSize: widhtToDp('7%'),
    color: '#fff',
  },
  thumbsdown__icon__style: {
    fontSize: widhtToDp('7%'),
    color: '#fff',
  },
  textAreaContainer: {
    borderColor: '#0A0D0A',
    borderWidth: 0.5,
    paddingHorizontal: widhtToDp('2%'),
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('5%'),
    borderRadius: 8,
  },
  textArea: {
    height: heightToDp('20%'),
    color: '#ABABAB',
    borderRadius: 8,
  },
  submit__btn__container: {
    backgroundColor: '#FD0A38',
    paddingHorizontal: widhtToDp('5%'),
    borderRadius: 30,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: heightToDp('18%'),
  },
  submit__btn: {
    color: '#fff',
    paddingVertical: heightToDp('2%'),
  },
});
