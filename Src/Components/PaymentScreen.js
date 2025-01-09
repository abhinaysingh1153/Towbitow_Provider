import React from 'react';
import {StyleSheet, PixelRatio, Dimensions} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
const {width, height} = Dimensions.get('window');

const widthToDp = number => {
  let givenWidth = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = number => {
  let givenheight = typeof number === 'number' ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * givenheight) / 100);
};

const PaymentScreen = () => {
  const {confirmPayment} = useStripe();

  return (
    <CardField
      postalCodeEnabled={false}
      placeholder={{
        number: 'Enter Your Card Number',
      }}
      cardStyle={{
        backgroundColor: '#6A73A6',
        textColor: 'black',
      }}
      style={{
        width: '90%',
        height: heightToDp('30%'),
        alignSelf: 'center',
        top: 100,
      }}
      onCardChange={cardDetails => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={focusedField => {
        console.log('focusField', focusedField);
      }}
    />
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
