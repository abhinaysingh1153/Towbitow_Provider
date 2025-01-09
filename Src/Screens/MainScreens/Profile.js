import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import axios from '../../Components/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

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

const Profile = () => {
  const navigation = useNavigation();

  // state management.

  const [profile_data, setProfileData] = React.useState('');

  // console.log('profile --- ', profile_data);

  // get profile data ---

  const get_profile = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      // console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'profile',
      };
      const res = await axios(options);
      // console.log('res --- ', res.data);
      setProfileData(res.data);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };
  console.log('profileid', profile_data);
  // -----

  React.useEffect(() => {
    get_profile();
  }, []);

  return (
    <View style={styles.main__container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <McIcon name="arrow-left" style={styles.icon_style} />
        </TouchableOpacity>
        <Text style={styles.header__title}>Profile</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.avatar__style}>
          {profile_data.profile_picture === '' ? (
            <Avatar.Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              size={90}
              style={styles.avatarStyle}
            />
          ) : (
            <Avatar.Image
              source={{uri: profile_data.profile_picture}}
              size={90}
              style={styles.avatarStyle}
            />
          )}
          <Text style={styles.title_style}>
            {profile_data.first_name} {profile_data.last_name}
          </Text>
          <Text style={styles.subtitle_style}>{profile_data.email}</Text>
        </View>
        <View style={styles.main__content}>
          <View style={styles.row__style}>
            <Text style={styles.col_style}>Business Name</Text>
            <Text style={styles.colsub_style}>
              {profile_data.business_name}
            </Text>
          </View>

          <View style={styles.row__style}>
            <Text style={styles.col_style}>Contact No.</Text>
            <Text style={styles.colsub_style}>
              {profile_data.mobile_number}
            </Text>
          </View>
          <View style={styles.row__style}>
            <Text style={styles.col_style}>Business Address</Text>
            <Text style={styles.colsub_style}>
              {profile_data.business_address}
            </Text>
          </View>
        </View>
        <View style={styles.btn__container}></View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  avatarStyle: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  icon__style: {
    backgroundColor: '#d7d7d7',
    alignSelf: 'center',
    marginTop: heightToDp('5%'),
  },
  title_style: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    marginTop: heightToDp('1%'),
    color:'#000'
  },
  subtitle_style: {
    alignSelf: 'center',
    color:'#000'
  },
  main__content: {
    marginTop: heightToDp('5%'),
  },
  row__style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthToDp('5%'),
    marginBottom: heightToDp('2%'),
  },
  col_style: {
    fontSize: widthToDp('4%'),
    fontWeight: 'bold',
    color: 'gray',
  },
  colsub_style: {
    color: '#000',
    fontSize: widthToDp('4%'),
  },
  btn__container: {},
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: widthToDp('5%'),
  },
  icon_style: {
    fontSize: widthToDp('7%'),
    color:'#000'
  },
  header__title: {
    fontSize: widthToDp('5%'),
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginLeft: widthToDp('3%'),
    color:'#000'
  },
});
