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
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Components/axios';
import qs from 'qs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import {Picker as SelectPicker} from '@react-native-picker/picker';

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

const BusinessProfile = () => {
  const navigation = useNavigation();

  const [all_codes, setAllCode] = React.useState([]);
  const [useId, setUserId] = React.useState('');
  const [preLoader, setPreLoader] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    BusinessName: '',
    IncopNo: '',
    BusinessAddr: '',
    BusinessType: '',
    ServiceType: '',
  });

  // get all country codes.

  const get__codes = async () => {
    try {
      const res = await axios.get('getCountryCode');

      setAllCode(res.data.data);
    } catch (err) {
      console.log('get codes ---- ', err);
    }
  };

  console.log('profile --- ', profileData);

  // ----- get profile --

  const getProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      //   console.log(userData);
      let options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${JSON.parse(userData)}`},
        data: null,
        url: 'profile',
      };
      const res = await axios(options);

      console.log(res.data);
      setUserId(res.data.id);
      setProfileData(prev => ({
        ...prev,
        BusinessAddr: res.data.business_address,
        BusinessName: res.data.business_name,
        IncopNo: res.data.incorporation_no,
        BusinessType: res.data.business_type,
        ServiceType: res.data.service_type,
      }));
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  React.useEffect(() => {
    getProfile();
    get__codes();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.upper__container}>
        <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        <Text style={styles.upper__txt__sty}>personall details</Text>
      </TouchableOpacity>
      {/* ----- main content --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.mainContent}>
          <View style={styles.input__container}>
            <TextInput
              value={profileData.BusinessName}
              editable={false}
              style={styles.input__style}
              placeholder="Business Name"
            />
            <TextInput
              value={profileData.IncopNo}
              editable={false}
              style={styles.input__style}
              placeholder="Incorporation No."
            />
            <View style={styles.input__style1}>
              {/* <View
                style={{
                  width: '35%',
                }}>
                <SelectPicker
                  selectedValue={profileData.countryCode}
                  onValueChange={value =>
                    setProfileData(prev => ({...prev, countryCode: value}))
                  }
                  style={{width: '100%', borderWidth: 1}}>
                  {all_codes == undefined
                    ? null
                    : all_codes.length == 0
                    ? null
                    : all_codes.map(item => (
                        <SelectPicker.Item
                          key={item.id}
                          style={{fontSize: widhtToDp('3.5%')}}
                          label={item.iso}
                          value={item.phonecode}
                        />
                      ))}
                </SelectPicker>
              </View> */}

              <TextInput
                value={profileData.BusinessAddr}
                editable={false}
                style={{width: '45%', color:'#000'}}
                keyboardType="phone-pad"
                placeholder="Business Address"
              />
            </View>
            {/* <TextInput
              keyboardType="email-address"
              value={profileData.email}
              editable={false}
              style={styles.input__style}
              placeholder="Email"
            /> */}
            {/* <View style={styles.date__container}>
              <DatePicker
                style={{width: '100%'}}
                date={profileData.dob}
                mode="date"
                showIcon={false}
                placeholder="Date of Birth"
                format="DD-MM-YYYY"
                minDate="01-05-1947"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start',
                  },
                  placeholderText: {
                    color: 'gray',
                  },
                  // ... You can check the source to find the other keys.
                }}
                // onDateChange={date => {
                //   setProfileData(prev => ({...prev, dob: date}));
                // }}
              />
            </View> */}
            {/* <TextInput
              keyboardType="number-pad"
              value={profileData.postCode}
              editable={false}
              style={styles.input__style}
              placeholder="Email"
            /> */}
          </View>

          {preLoader && (
            <ActivityIndicator
              color="red"
              size={40}
              style={{paddingVertical: heightToDp('3%')}}
            />
          )}

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnStyle}>
              <Text style={styles.btnTxtStyle}>save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
    color:'#000'
  },
  upper__txt__sty: {
    marginLeft: widhtToDp('5%'),
    fontSize: widhtToDp('5%'),
    textTransform: 'capitalize',
    color:'#000'
  },
  upper__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    height: 50,
    backgroundColor: '#fff',
    elevation: 5,
  },
  input__container: {
    marginTop: heightToDp('7%'),
  },
  input__style: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    borderRadius: 5,
    height: 56,
    marginBottom: heightToDp('3%'),
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: widhtToDp('5%'),
    color:'#000'
  },
  btnContainer: {
    marginTop: heightToDp('10%'),
  },
  btnStyle: {
    backgroundColor: '#000000',

    width: '90%',
    alignSelf: 'center',
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxtStyle: {
    fontSize: widhtToDp('4%'),
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Regular',
  },
  date__container: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    borderRadius: 5,
    height: 56,
    marginBottom: heightToDp('3%'),
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: widhtToDp('5%'),
    justifyContent: 'center',
  },
  input__style1: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    marginBottom: heightToDp('2%'),
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    alignSelf: 'center',
    borderRadius: 8,
    width: '90%',
    color:'#000'
  },
});
