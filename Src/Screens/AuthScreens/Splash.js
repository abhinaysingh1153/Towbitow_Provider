import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  StatusBar,
  Image,
} from 'react-native';
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



const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LoginOption');
    }, 2000);
  }, []);
  return (
    <View style={styles.splash__main}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image
        source={require('../../Assets/tobitownew.png')}
        style={{
          height: heightToDp('35%'),
          width: '80%',
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splash__main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  main__txt: {
    color: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: widhtToDp('8%'),
  },
});
