import {useNavigation} from '@react-navigation/native';
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

import AntDesign from 'react-native-vector-icons/AntDesign';

import {AuthContext} from '../../Components/AuthContext';

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

const Setting = () => {
  const {logout} = React.useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.upper__container}>
        <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        <Text style={styles.upper__txt__sty}>Setting</Text>
      </TouchableOpacity>
      {/* ---------------------------------Middle Container------------------------------- */}
      <View style={styles.middle__container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.Personal__container}>
          <Text style={styles.Personal__detail__txt}>Personal details</Text>
          <AntDesign name="right" style={styles.arrow__icon} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('BusinessProfile')}
          style={styles.Personal__container}>
          <Text style={styles.Personal__detail__txt}>Business details</Text>
          <AntDesign name="right" style={styles.arrow__icon} />
        </TouchableOpacity>
      </View>
      {/* -----------------lower container------------------------ */}
      <View style={styles.lower__container}>
        <View style={styles.middle__partition1}></View>
        <TouchableOpacity onPress={() => logout()}>
          <Text style={styles.lower__txt}>Sign out</Text>
        </TouchableOpacity>
        <View style={styles.middle__partition2}></View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#ffff',
    flex: 1,
  },
  upper__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    backgroundColor:'#fff',
    height:50,
    elevation:5
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
    color:'#000'
  },
  upper__txt__sty: {
    marginLeft: widhtToDp('5%'),
    fontSize: widhtToDp('5%'),
    color:'#000'
  },
  middle__container: {
    marginTop: heightToDp('3%'),
  },
  Personal__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightToDp('4.5%'),
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    paddingBottom: heightToDp('3%'),
    borderColor: 'rgba(0, 0, 0, 0.23)',
  },
  Personal__detail__txt: {
    fontSize: widhtToDp('4%'),
    color:'#000'
  },
  arrow__icon: {
    color: '#979797',
    fontSize: widhtToDp('5%'),
  },

  lower__container: {
    marginTop: heightToDp('48%'),
  },

  lower__txt: {
    color: '#953939',
    justifyContent: 'center',
    paddingHorizontal: widhtToDp('8%'),
    marginTop: heightToDp('2%'),
  },
  middle__partition1: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    width: widhtToDp('90%'),
    alignSelf: 'center',
    marginTop: heightToDp('4.4%'),
  },
  middle__partition2: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    width: widhtToDp('90%'),
    alignSelf: 'center',
    marginTop: heightToDp('2%'),
  },
});
