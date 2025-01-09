import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';

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

const PaymentSuccess = () => {
  const navigation = useNavigation();
   const animationProgress = useRef(new Animated.Value(0));

   useEffect(() => {
     Animated.timing(animationProgress.current, {
       toValue: 1,
       duration: 5000,
       easing: Easing.linear,
       useNativeDriver: false,
     }).start();
   }, []);
  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <Lottie
        progress={animationProgress.current}
        source={require('../../Assets/paymentsuccess.json')}
      />
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  upper__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorirolor: '#fff',
    elevation: 5,
    height: 50,
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
    fontFamily: 'Montserrat-Regular',
  },
  upper__txt__sty: {
    marginLeft: widhtToDp('5%'),
    fontSize: widhtToDp('5%'),
    fontFamily: 'Montserrat-Regular',
  },
});
