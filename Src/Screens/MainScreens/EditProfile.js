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
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Components/axios';
import qs from 'qs';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import DatePicker from 'react-native-datepicker';
// import {Picker as SelectPicker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

import {Provider, Portal, Modal} from 'react-native-paper';

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

const EditProfile = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [all_codes, setAllCode] = React.useState([]);
  const [useId, setUserId] = React.useState('');
  const [preLoader, setPreLoader] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    firstName: '',
    lastName: '',
    mobileNum: '',
    countryCode: '',
    email: '',
    dob: '',
    postCode: '',
    profilephoto: '',
    Abnnumber: '',
    Routingnumber:'',
    Accountnumber:'',
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
        profilephoto: res.data.profile_picture,
        firstName: res.data.first_name,
        lastName: res.data.last_name,
        mobileNum: res.data.mobile_number,
        countryCode: res.data.country_code,
        email: res.data.email,
        dob: res.data.birth_date,
        postCode: res.data.postcode,
        Abnnumber: res.data.abn_number,
        Routingnumber: res.data.routing_number,
        Accountnumber: res.data.acc_number,
      }));
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };
  // ----- update profile ----
  // console.log('profile data', profileData);
  const updateProfile = async () => {
    try {
      if (
        profileData.profilephoto === '' ||
        profileData.firstName === '' ||
        profileData.lastName === '' ||
        profileData.Abnnumber === ''
      ) {
        ToastAndroid.show('some fields are empty!', ToastAndroid.BOTTOM);
      } else {
        setPreLoader(true);
        let data = {
          id: useId,
           profile_picture: profileData.profilephoto,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          abn_number: profileData.Abnnumber,
          routing_number: profileData.Routingnumber,
          acc_number: profileData.Accountnumber,
        };
        let options = {
          method: 'POST',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: qs.stringify(data),
          url: 'update-profile',
        };
        const res = await axios(options);
        setPreLoader(false);
        navigation.goBack()
        console.log('update profile res --- ', res.data);
        ToastAndroid.show(res.data.message, ToastAndroid.BOTTOM);
      }
    } catch (err) {
      setPreLoader(false);
      console.log('update profile err --- ', err);
      ToastAndroid.show('server error occurs!', ToastAndroid.BOTTOM);
    }
  };

  //EDIT PROFILE---

  const takePhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 150,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setProfileData(prev => ({
        ...prev,
        profilephoto: `data:image/png;base64,${image.data}`,
      }));
      hideModal();
    });
  };
  const choosePhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setProfileData(prev => ({
        ...prev,
        profilephoto: `data:image/png;base64,${image.data}`,
      }));
      hideModal();
    });
  };
  React.useEffect(() => {
    getProfile();
    get__codes();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ---------------------------------Upper Container------------------------------- */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.upper__container}>
        <AntDesign name="arrowleft" style={styles.upper__icon__sty} />
        <Text style={styles.upper__txt__sty}>personal details</Text>
      </TouchableOpacity>
      {/* ----- main content --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.mainContent}>
          <View style={styles.profileimg__container}>
            <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                borderWidth: 1,
                backgroundColor: '#f7f7f7',
                width: 110,
                height: 110,
                alignSelf: 'center',
                marginTop: heightToDp('3%'),
                borderRadius: 55,
                overflow: 'hidden',
              }}
              onPress={() => {
                showModal();
              }}>
              {profileData.profilephoto === '' ? (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                  }}
                  style={styles.user_icon}
                />
              ) : (
                <Image
                  source={{
                    uri: profileData.profilephoto,
                  }}
                  style={styles.user_icon}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.input__container}>
            <TextInput
              value={profileData.firstName}
              style={styles.input__style}
              placeholder="First Name"
            />
            <TextInput
              value={profileData.lastName}
              style={styles.input__style}
              placeholder="Last Name"
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
                value={profileData.countryCode}
                editable={false}
                style={{width: '10%', color: '#000'}}
              />
              <TextInput
                value={profileData.mobileNum}
                editable={false}
                style={{width: '45%'}}
                keyboardType="phone-pad"
                placeholderTextColor="black"
                placeholder="Phone number"
                maxLength={10}
              />
            </View>
            <TextInput
              keyboardType="email-address"
              value={profileData.email}
              editable={false}
              style={styles.input__style}
              placeholder="Email"
            />
            <TextInput
              value={profileData.Abnnumber}
              style={styles.input__style}
              placeholder="ABN Number"
            />
            <TextInput
              value={profileData.Routingnumber}
              style={styles.input__style}
              placeholder="Routing Number"
              onChangeText={text =>
                setProfileData(prevstate => ({
                  ...prevstate,
                  Routingnumber: text,
                }))
              }
            />

            <TextInput
              value={profileData.Accountnumber}
              style={styles.input__style}
              placeholder="Account Number"
              onChangeText={text =>
                setProfileData(prevstate => ({
                  ...prevstate,
                  Accountnumber: text,
                }))
              }
            />
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
            <TextInput
              keyboardType="number-pad"
              value={profileData.postCode}
              editable={false}
              style={styles.input__style}
              placeholder="PinCode"
            />
          </View>

          {preLoader && (
            <ActivityIndicator
              color="red"
              size={40}
              style={{paddingVertical: heightToDp('3%')}}
            />
          )}

          <View style={styles.btnContainer}>
            <TouchableOpacity
              onPress={() => updateProfile()}
              style={styles.btnStyle}>
              <Text style={styles.btnTxtStyle}>save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            style={styles.container__style}>
            <TouchableOpacity
              style={styles.imgopt__container}
              onPress={() => takePhotofromCamera()}>
              <Text style={styles.btn__style}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgopt__container}
              onPress={() => choosePhotofromLibrary()}>
              <Text style={styles.btn__style}>Choose gallery</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  upper__icon__sty: {
    fontSize: widhtToDp('7%'),
    color:'#000'
  },
  user_icon: {
    alignSelf: 'center',
    height: 110,
    width: 110,
    borderRadius: 55,
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
    backgroundColor: '#fff',
    elevation: 5,
    height: 50,
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
  },
  container__style: {
    backgroundColor: '#fff',
    width: '90%',
    height: heightToDp('30%'),
    marginLeft: widhtToDp('5%'),
    marginTop: heightToDp('30%'),
    borderRadius: 16,
    alignItems: 'center',
  },
  imgopt__container: {
    backgroundColor: '#022299',

    width: widhtToDp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1%'),
    marginTop: heightToDp('3%'),
  },
  btn__style: {
    fontSize: widhtToDp('4%'),
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
});
