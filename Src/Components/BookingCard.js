import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'react-native-paper';

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

const BookingCard = ({
  title,
  dateText,
  statusText,
  navFunc,
  bookingId,
  cost,
  user,
}) => {
  const [dropdata, setDropData] = useState(false);
  return (
    <SafeAreaView>
      <TouchableOpacity
        activeOpacity={0.2}
        onPress={() => setDropData(!dropdata)}
        style={styles.bookingcard_container}>
        <View style={{width: '92%'}}>
          <View style={styles.bookingcard_upper}>
            <Text style={styles.titleStyle}>BOOKING ID</Text>
            <Text style={styles.titleStyle}>COST</Text>
            <Text style={styles.titleStyle}>USER</Text>
            {/* <Text
            style={{
              fontSize: widthToDp('3%'),
              marginTop: heightToDp('.5%'),
              fontFamily: 'Montserrat-Regular',
              color:
                statusText == 'ACCEPTED'
                  ? '#5DADE2'
                  : statusText == 'COMPLETED'
                  ? 'green'
                  : statusText == 'CANCELLED'
                  ? 'red'
                  : '#F1C40F',
            }}>
            {statusText}
          </Text> */}
          </View>
          <View style={styles.bookingcard_upper}>
            <Text style={styles.DateTitleStyle}>{bookingId}</Text>
            <Text style={styles.DateTitleStyle}>${cost}</Text>
            <Text style={styles.DateTitleStyle}>{user}</Text>
          </View>
        </View>
        <View style={styles.bookingcard_lower}>
          <Image
            source={require('../Assets/down-arrow.png')}
            style={{
              width: 20,
              height: 20,
              transform: [{rotate: dropdata ? '180deg' : '0deg'}],
            }}
          />
        </View>
      </TouchableOpacity>
      {dropdata && (
        <View style={styles.main__container}>
          <View style={styles.profile__container}>
            <Avatar.Icon
              icon="account"
              size={90}
              style={{backgroundColor: '#fff', elevation: 5}}
            />
          </View>
          <View style={styles.upper_title}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: widthToDp('4%'),
                marginTop: heightToDp('1%'),
                color: '#000',
              }}>
              {user}
            </Text>
          </View>

          <View style={styles.invoice__data}>
            
            <View style={styles.upper__container}>
              <View style={styles.row1_style}>
                <Text style={styles.col1_style}>INFO</Text>
                <Text style={styles.col1_style}>Details</Text>
              </View>
              <View style={styles.row2_style}>
                <Text style={styles.col2_style}>Service Type</Text>
                <Text style={styles.col2_style}>{title}</Text>
              </View>
            </View>
            <View style={styles.upper__container}>
              <View style={styles.row1_style}>
                <Text style={styles.col1_style}>INFO</Text>
                <Text style={styles.col1_style}>Details</Text>
              </View>
              <View style={styles.row2_style}>
                <Text style={styles.col2_style}>Images</Text>
                <Text style={styles.col2_style}>Image Link</Text>
              </View>
            </View>

            <View style={styles.upper__container}>
              <View style={styles.row1_style}>
                <Text style={styles.col1_style}>description</Text>
                <Text style={styles.col1_style}>rate</Text>
                <Text style={styles.col1_style}>person</Text>
                <Text style={styles.col1_style}>hrs</Text>
              </View>
              <View style={styles.row2_style}>
                <Text style={styles.col2_style}>{title}</Text>
                <Text style={styles.col2_style}>${cost}</Text>
                <Text style={styles.col2_style}>1</Text>
                <Text style={styles.col2_style}>00</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.3,
                  marginVertical: heightToDp('1%'),
                }}
              />
              <View style={styles.row2_style}>
                <Text style={styles.col3_style}>Subtotal</Text>
                <Text style={styles.col4_style}>${cost}</Text>
              </View>
            </View>
          </View>
          <View style={styles.btn__container}>
            <Text
              style={{
                fontSize: widthToDp('3%'),
                marginTop: heightToDp('.5%'),
                fontFamily: 'Montserrat-Regular',
                color:
                  statusText == 'ACCEPTED'
                    ? '#5DADE2'
                    : statusText == 'COMPLETED'
                    ? 'green'
                    : statusText == 'CANCELLED'
                    ? 'red'
                    : '#F1C40F',
              }}>
              {statusText}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  bookingcard_container: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: widthToDp('2%'),
    paddingVertical: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: heightToDp('1.5%'),
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
   
  },
  bookingcard_upper: {
    flexDirection:'row',
    justifyContent:'space-between',
    
    width:'92%'
  },
  titleStyle: {
    textTransform: 'capitalize',
    fontWeight:'500',
    fontSize: widthToDp('4%'),
    color:'#000'

  },
  DateTitleStyle: {
    textTransform: 'capitalize',
    fontSize: widthToDp('2.8%'),
    marginTop: heightToDp('.3%'),
    color:'#000'
  },

  bookingcard_lower: {},
  icon__style: {
    width:20,
    height:10,
  },
  main__container: {
    
    backgroundColor: '#fff',
    bottom: 20,
    borderRadius: 10,
    paddingVertical: heightToDp('2%'),
    elevation: 5,
    width: widthToDp('90%'),
    alignSelf: 'center',
    marginTop:heightToDp('10%')
  },
  profile__container: {
    alignSelf: 'center',
    marginTop: -50,
  },
  img__style: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title__container: {
    alignSelf: 'center',
    width: '90%',
    marginTop: heightToDp('3%'),
  },
  txt__container: {},
  amount__style: {
    marginTop: '2%',
    textAlign: 'center',
  },
  btn__container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: heightToDp('1%'),
  },
  Acptbtn__container: {
    backgroundColor: 'green',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1.5%'),
    marginTop: '3%',
  },
  declinebtn__container: {
    backgroundColor: '#022299',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1.5%'),
    marginTop: '3%',
  },

  btn__style: {
    fontSize: widthToDp('4%'),
    color: '#fff',
  },
  invoice__data: {
    paddingHorizontal: widthToDp('5%'),
    marginBottom: heightToDp('2%'),
  },
  upper__container: {
    marginTop: heightToDp('2%'),
    elevation: 5,
    backgroundColor: '#fff',
    paddingVertical: heightToDp('1%'),
    paddingHorizontal: widthToDp('5%'),
    borderRadius: 5,
  },
  row1_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightToDp('1%'),
  },
  col1_style: {
    fontSize: widthToDp('3%'),
    textTransform: 'uppercase',
    color: '#A1A2A5',
  },
  row2_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col2_style: {
    fontSize: widthToDp('3%'),
    textTransform: 'uppercase',
    color: '#000',
  },
  col3_style: {
    fontSize: widthToDp('3.5%'),
    textTransform: 'uppercase',
    color: '#DC7633',
    fontWeight: 'bold',
  },
  col4_style: {
    fontSize: widthToDp('3.5%'),
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 'bold',
  },
  txt__container: {},
});
