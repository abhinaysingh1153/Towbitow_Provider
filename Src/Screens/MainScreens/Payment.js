import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const Payment = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <View style={styles.upper__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        </TouchableOpacity>
        <Text style={styles.upper__txt__sty}>Payments</Text>
      </View>
      {/* -----------------------------Middle Container-------------------------- */}
      <View style={styles.middle__container}>
        <Text style={styles.middle__txt}>Payment methods</Text>
        <View style={styles.middle__partition}></View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            marginTop: heightToDp('5%'),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddCard')}
            style={styles.card__container}>
            <Ionicons name="card-outline" style={styles.middle__icon} />
            <Text style={styles.middle__txt1}>Add payment Card</Text>
          </TouchableOpacity>
          <AntDesign name="right" style={styles.arrow__icon} />
        </View>
      </View>

      {/* ------------lower container----------------- */}
      <View style={styles.lower__container}>
        <Text style={styles.lower__txt}>Wallet</Text>
        <View style={styles.lower__partition}></View>

        <TouchableOpacity
          onPress={() => navigation.navigate('MyWallet')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
            marginTop: heightToDp('3%'),
          }}>
          <View style={styles.card__container}>
            <Text style={styles.lower__wallet__txt}>Wallet</Text>
            <Text style={styles.middle__txt1}>View wallet</Text>
          </View>
          <AntDesign name="right" style={styles.arrow__icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  upper__container: {
    
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    backgroundColor:'#fff',
    elevation:5,
    height:50
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
    fontFamily: 'Montserrat-Regular',
    color:'#000'
  },
  upper__txt__sty: {
    marginLeft: widhtToDp('5%'),
    fontSize: widhtToDp('5%'),
    fontFamily: 'Montserrat-Regular',
    color:'#000'
  },
  middle__container: {
    paddingHorizontal: widhtToDp('3%'),
    marginTop: heightToDp('12%'),
  },
  middle__txt: {
    color: '#000',
    fontSize: widhtToDp('4%'),
    marginLeft: widhtToDp('2%'),
    fontFamily: 'Montserrat-Regular',
  },
  middle__partition: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    width: widhtToDp('90%'),
    alignSelf: 'center',
  },
  card__container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle__icon: {
    color: '#455154',
    fontSize: widhtToDp('7%'),
  },
  middle__txt1: {
    color: '#000',
    fontSize: widhtToDp('4.5%'),
    marginLeft: widhtToDp('3%'),
    fontFamily: 'Montserrat-Regular',
  },
  arrow__icon: {
    color: '#979797',
    fontSize: widhtToDp('5%'),
  },
  lower__container: {
    paddingHorizontal: widhtToDp('3%'),
    marginTop: heightToDp('12%'),
  },
  lower__txt: {
    color: '#000',
    fontSize: widhtToDp('4%'),
    marginLeft: widhtToDp('2%'),
    fontFamily: 'Montserrat-Regular',
  },
  lower__partition: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    width: widhtToDp('90%'),
    alignSelf: 'center',
  },
  lower__wallet__txt: {
    backgroundColor: '#333333',
    padding: 6,
    color: '#fff',
    borderRadius: 5,
  },
});
