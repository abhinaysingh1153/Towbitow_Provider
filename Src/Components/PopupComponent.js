import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Swiper from 'react-native-swiper';
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

const PopupComponent = ({
  name,
  u_email,
  book_id,
  mobile_num,
  acpt_func,
  dclnFunc,
  total,
  hours,
  service_rate,
  person,
  service_name,
  app_name,
  servicename,
  vehicle_Info,
  address,
}) => {
  console.log('data-----', vehicle_Info);

  const FirstPage = () => {
    return (
      <View style={styles.container}>
        <View style={styles.title__container1}>
          <Text style={styles.txt__container1}>Email:- {u_email}</Text>
          <Text style={styles.txt__container1}>Mobile:- {mobile_num}</Text>
          <Text style={styles.txt__container1}>Booking Id:- {book_id}</Text>
        </View>
        <View style={styles.invoice__data1}>
          <View style={styles.upper__container}>
            <View style={styles.row1_style}>
              <Text style={styles.col1_style}>INFO</Text>
              <Text style={styles.col1_style}>TAX ID</Text>
            </View>
            <View style={styles.row2_style}>
              <Text style={styles.col2_style}>{name}</Text>
              <Text style={styles.col2_style}>{book_id}</Text>
            </View>
          </View>

          <View style={styles.upper__container}>
            <View style={styles.row1_style}>
              <Text style={styles.col1_style}>Service Type</Text>
              <Text style={styles.col1_style}>Details</Text>
            </View>
            <View style={styles.row2_style}>
              <Text style={styles.col2_style}>service_name</Text>
              <Text style={styles.col2_style}>{servicename}</Text>
            </View>
          </View>
          <View style={styles.upper__container}>
            <View style={styles.row2_style}>
              <Text style={styles.col2_style}>Vehicle_Make</Text>
              <Text style={styles.col2_style}>{vehicle_Info.Make}</Text>
            </View>
          </View>
          <View style={styles.upper__container}>
            <View style={styles.row2_style}>
              <Text style={styles.col2_style}>Vehicle_Name</Text>
              <Text style={styles.col2_style}>{vehicle_Info.Model}</Text>
            </View>
          </View>
          <View style={styles.upper__container}>
            <View style={styles.row2_style}>
              <Text style={styles.col2_style}>Vehicle_Year</Text>
              <Text style={styles.col2_style}>{vehicle_Info.Year}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const Seconds = () => {
    return (
      <View style={styles.container}>
        <View style={styles.invoice__data}>
          
          

          <View style={styles.upper__container}>
            <View style={styles.Loc_style}>
              <Text style={styles.col1_style}>location</Text>
            </View>
            <View style={styles.location_style}>
              <Text style={styles.col2_style}>{address}</Text>
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
              <Text style={styles.col2_style}>{service_name}</Text>
              <Text style={styles.col2_style}>${service_rate}</Text>
              <Text style={styles.col2_style}>{person}</Text>
              <Text style={styles.col2_style}>{hours}</Text>
            </View>
            <View
              style={{borderBottomWidth: 0.3, marginVertical: heightToDp('1%')}}
            />
            <View style={styles.row2_style}>
              <Text style={styles.col3_style}>Subtotal</Text>
              <Text style={styles.col4_style}>${service_rate}</Text>
            </View>
          </View>
          <View style={styles.btn__container}>
            <TouchableOpacity
              onPress={() => acpt_func()}
              style={styles.Acptbtn__container}>
              <Text style={styles.btn__style}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dclnFunc()}
              style={styles.declinebtn__container}>
              <Text style={styles.btn__style}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
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
            fontSize: widhtToDp('4%'),
            marginTop: heightToDp('1%'),
            color: '#000',
          }}>
          {name}
        </Text>
      </View>

      <Swiper
        bounces={false}
        loop={false}
        showsPagination={false}
        showsButtons={true}>
        <FirstPage />
        <Seconds />
       
      </Swiper>
    </View>
  );
};

export default PopupComponent;

const styles = StyleSheet.create({
  main__container: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 30,
    borderRadius: 10,
    paddingVertical: heightToDp('1s%'),
    elevation: 5,
    width: widhtToDp('95%'),
    alignSelf: 'center',
    zIndex: 9,
    height: heightToDp('65%'),
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
    marginTop: heightToDp('1%'),
  },
  title__container1: {
    alignSelf: 'center',
    width: '90%',
    marginTop: heightToDp('2%'),
  },
  txt__container1: {
    fontSize:12
  },
  amount__style: {
    marginTop: '2%',
    textAlign: 'center',
  },
  btn__container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: heightToDp('3%'),
  },
  nextbtn__container: {
    backgroundColor: 'green',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1.5%'),
    marginTop: '2%',
  },
  Acptbtn__container: {
    backgroundColor: '#022299',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1.5%'),
    marginTop: '3%',
  },
  declinebtn__container: {
    backgroundColor: 'green',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1.5%'),
    marginTop: '3%',
  },

  btn__style: {
    fontSize: widhtToDp('4%'),
    color: '#fff',
  },
  invoice__data: {
    paddingHorizontal: widhtToDp('5%'),
  },
  invoice__data1: {
    paddingHorizontal: widhtToDp('5%'),
    marginTop:20
  },
  upper__container: {
    marginTop: heightToDp('2%'),
    elevation: 5,
    backgroundColor: '#fff',
    paddingVertical: heightToDp('1%'),
    paddingHorizontal: widhtToDp('5%'),
    borderRadius: 5,
  },
  row1_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightToDp('1%'),
  },
  col1_style: {
    fontSize: widhtToDp('2.8%'),
    textTransform: 'uppercase',
    color: '#A1A2A5',
  },
  row2_style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col2_style: {
    fontSize: widhtToDp('2.5%'),
    textTransform: 'uppercase',
    color: '#000',
  },
  col3_style: {
    fontSize: widhtToDp('3.5%'),
    textTransform: 'uppercase',
    color: '#DC7633',
    fontWeight: '700',
  },
  col4_style: {
    fontSize: widhtToDp('3.5%'),
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 'bold',
  },
  txt__container: {
    fontSize: widhtToDp('2.8%'),
    fontWeight: '500',
  },
  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: 'gray',
    borderRadius: 6,
    opacity: 1 / 2,
    marginTop: heightToDp('-30%'),
  },
  activeDotStyle: {
    width: 8,
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: heightToDp('-30%'),
    opacity: 1 / 2,
  },
  container: {
    width: '100%',
    marginTop: 20,
  },
  Loc_style: {
    alignItems: 'center',
    marginBottom: heightToDp('1%'),
  },
  location_style: {
    alignItems: 'center',
  },
});
