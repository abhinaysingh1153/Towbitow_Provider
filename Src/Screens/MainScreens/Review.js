import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Components/axios';
import Eicon from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

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
const Review = () => {
  const navigation = useNavigation();
  const [reviewData, setReviewData] = useState([]);

  const getProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        url: 'profile',
      };
      const res = await axios(options);

      get_review(res.data.id);
    } catch (err) {
      console.log('get profile err -- ', err);
    }
  };
  const get_review = async userId => {
    try {
      const res = await axios.get(`providerReview?userId=${userId}`);
      setReviewData(res.data.data);
      console.log('revieew dats-----', reviewData);
    } catch (err) {
      console.log('get review err --- ', err);
    }
  };

  // time format func ---

  console.log('review data', reviewData);
  React.useEffect(() => {
    getProfile();
    get_review();
  }, []);
  return (
    <View style={styles.main__conatiner}>
      <View style={styles.header__container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.header__btn_style}>
          <Feather name="arrow-left" style={styles.header__icon} />
          <Text style={styles.header__btntxt}>Review</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        {reviewData == undefined ? (
          <Text
            style={{
              fontSize: widthToDp('5%'),
              alignSelf: 'center',
              marginTop: heightToDp('3%'),
              color: '#c4c4c4',
            }}>
            No Review Found!
          </Text>
        ) : reviewData.length == 0 ? (
          <ActivityIndicator
            size={40}
            color="red"
            style={{marginTop: heightToDp('3%')}}
          />
        ) : (
          reviewData.map(item => (
            <View style={styles.review__container}>
              <Text style={styles.txttitle__style}>{item.full_name}</Text>
              <Text style={styles.txtbookid__style}>{item.booking_id}</Text>

              <Text style={styles.txtdesc__style}>{item.review}</Text>

              <View style={styles.reviewicon__container}>
                {item.rating == 1 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : item.rating == 2 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />

                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : item.rating == 2 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />

                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : item.rating == 3 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />

                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : item.rating == 4 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : item.rating == 5 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                    <Eicon name="star" style={styles.staricon__style} />
                  </View>
                ) : item.rating == 0 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                    <Eicon name="star" style={{fontSize: widhtToDp('4%')}} />
                  </View>
                ) : null}
                <View style={{flexDirection: 'row'}}>
                  <Text>{item.review_date}</Text>
                  <Text> {item.review_time}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  main__conatiner: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header__container: {
    paddingHorizontal: widhtToDp('7%'),
    paddingTop: heightToDp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: heightToDp('3%'),
    backgroundColor: '#fff',
    elevation: 5,
  },
  header__btn_style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header__icon: {
    fontSize: widhtToDp('6%'),
    color: '#000',
  },
  header__btntxt: {
    fontSize: widhtToDp('5%'),
    color: '#000',
    marginLeft: widhtToDp('2%'),
    fontFamily: 'Montserrat-Regular',
  },
  review__container: {
    paddingHorizontal: widhtToDp('5%'),

    backgroundColor: '#fff',
    width: '90%',
    // marginBottom: heightToDp('30%'),
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: heightToDp('1%'),
  },
  txttitle__style: {
    fontSize: widhtToDp('3.5%'),
    marginBottom: heightToDp('.5%'),
    fontWeight: '700',
  },
  txtbookid__style: {
    fontSize: widhtToDp('2.5%'),
    marginBottom: heightToDp('.5%'),
  },
  txtdesc__style: {
    fontSize: widhtToDp('3%'),
    width: '70%',
    textAlign: 'justify',
    marginBottom: heightToDp('1%'),
  },
  reviewicon__container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  staricon__style: {
    fontSize: widhtToDp('4%'),
    color: 'gold',
  },
});
