import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
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

const AddCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <View style={styles.upper__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        </TouchableOpacity>
        <Text style={styles.upper__txt__sty}>Add card</Text>
      </View>
      {/* ----------------middle container------------ */}
      <View style={styles.middle__container}>
        <Text style={styles.middle__txt}>input/label.required</Text>
        <Text style={styles.CardNo__txt}>Card Number</Text>
        <View style={styles.AddCard__container}>
          <TextInput
            keyboardType="number-pad"
            style={styles.CardNo__inputtxt}
          />
        </View>
        <View style={styles.middle__expCvv}>
          <Text style={styles.middle__txt1}>input/label.required</Text>
          <Text style={styles.middle__txtexp}>input/label.required</Text>
        </View>

        <View style={styles.middle__expCvv__txt}>
          <Text style={styles.middle__txt2}>Exp.Date</Text>
          <Text style={styles.middle__txt3}>CVV</Text>
        </View>

        <View style={styles.AddCard__container1}>
          <TextInput
            keyboardType="name-phone-pad"
            style={styles.CardNo__input1}
          />
          <TextInput keyboardType="number-pad" style={styles.CardNo__input1} />
        </View>

        <View style={styles.AddCard__container}>
          <Text style={styles.Country__txt}>Country</Text>
          <TextInput style={styles.CardNo__inputtxt} />
        </View>

        <View style={styles.AddCard__container}>
          <Text style={styles.Postcode__txt}>Postcode</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.CardNo__inputtxt}
          />
        </View>

        <TouchableOpacity style={styles.Save__btn}>
          <Text style={styles.btn__txt}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  upper__container: {
    marginTop: heightToDp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
  },
  upper__txt__sty: {
    marginLeft: widhtToDp('5%'),
    fontSize: widhtToDp('5%'),
    fontFamily: 'Montserrat-Regular',
  },
  middle__container: {
    paddingHorizontal: widhtToDp('5%'),
    marginTop: heightToDp('10%'),
  },
  middle__txt: {
    color: 'grey',
    fontFamily: 'Montserrat-Regular',
  },
  AddCard__container: {
    marginTop: heightToDp('0.3%'),
    paddingHorizontal: widhtToDp('1%'),
  },
  CardNo__txt: {
    fontSize: widhtToDp('4%'),
    fontFamily: 'Montserrat-Regular',
  },
  CardNo__inputtxt: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D4D4D4',
    marginTop: heightToDp('1%'),
    paddingVertical: heightToDp('1.3%'),
    paddingHorizontal: widhtToDp('1.8%'),
  },
  middle__expCvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widhtToDp('2.3%'),
    marginTop: heightToDp('0.5%'),
  },
  middle__txt1: {
    color: 'grey',
    fontFamily: 'Montserrat-Regular',
  },
  AddCard__container1: {
    marginTop: heightToDp('0.3%'),
    paddingHorizontal: widhtToDp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  CardNo__input1: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D4D4D4',
    marginTop: heightToDp('1%'),
    paddingVertical: heightToDp('1.3%'),
    paddingHorizontal: widhtToDp('1.8%'),
    width: '49%',
  },
  middle__expCvv__txt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: widhtToDp('2.8%'),
    marginTop: heightToDp('0.4%'),
    fontFamily: 'Montserrat-Regular',
  },
  middle__txt2: {
    color: '#000',
    fontFamily: 'Montserrat-Regular',
  },
  middle__txt3: {
    color: '#000',
    marginRight: widhtToDp('33%'),
    fontFamily: 'Montserrat-Regular',
  },
  middle__txtexp: {
    color: 'grey',
    marginRight: widhtToDp('3%'),
    fontFamily: 'Montserrat-Regular',
  },
  Country__txt: {
    fontSize: widhtToDp('4%'),
    alignItems: 'center',
    marginTop: heightToDp('1.7%'),
    fontFamily: 'Montserrat-Regular',
  },
  Postcode__txt: {
    fontSize: widhtToDp('4%'),
    alignItems: 'center',
    marginTop: heightToDp('1.7%'),
    fontFamily: 'Montserrat-Regular',
  },
  Save__btn: {
    backgroundColor: '#58a3d6',
    borderColor: '#ecc55b',
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 40,
    marginTop: heightToDp('8%'),
    width: '100%',
    alignSelf: 'center',
    height: 48,
    justifyContent: 'center',
  },
  btn__txt: {
    color: '#fff',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
});
