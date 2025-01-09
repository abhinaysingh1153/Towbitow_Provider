import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  PixelRatio,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {Checkbox} from 'react-native-paper';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import axios from '../../Components/axios';
import qs from 'qs';
import {AuthContext} from '../../Components/AuthContext';
import GetLocation from 'react-native-get-location';

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

const Create1 = ({route}) => {
  const {login} = React.useContext(AuthContext);

  // params

  const {user_info, DL, EL, IP, AP, RC, selCode} = route.params;

  // console.log('user info --- ', user_info, selCode);

  // state management.

  const [pre_loader, setPreLoader] = React.useState(false);
  const [check_box, setCheck_Box] = React.useState(false);
  const [servData, setservData] = React.useState([]);
  const [servSubData, setservSubData] = React.useState([]);
  const [currentLocation, setcurrentLocation] = React.useState({
    lat: '',
    long: '',
  });
  const [businessInfo, setBusinessInfo] = React.useState({
    businessName: '',
    incorpNo: '',
    businessAddr: '',
    businessType: '',
    servType: '',
    siaLicence: '',
  });

 console.log('dl----',DL);

  // registration func.

  const res__func = async () => {
    try {
      if (
        businessInfo.businessName == '' ||
        businessInfo.incorpNo == '' ||
        businessInfo.businessAddr == '' ||
        businessInfo.businessType == '' ||
        businessInfo.servType == ''
      ) {
        ToastAndroid.show('some fields are empty!', ToastAndroid.BOTTOM);
      } else {
        if (check_box) {
          setPreLoader(true);
          let data = {
            first_name: user_info.first_name,
            last_name: user_info.last_name,
            email: user_info.email,
            mobile_number: user_info.mobile_no,
            // birth_date: user_info.dob,
            postcode: user_info.postcode,
            password: user_info.password,
            country_code: selCode,
            business_name: businessInfo.businessName,
            incorporation_no: businessInfo.incorpNo,
            business_address: businessInfo.businessAddr,
            business_type: businessInfo.businessType,
            service_type: businessInfo.servType,
            sia_license: businessInfo.siaLicence,
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            token: user_info.fcmToken,
            driving_license: DL,
            experiance_letter: EL,
            idproofff: IP,
            add_proof: AP,
            rc_card: RC,
          };

         

          let options = {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: 'create-provider',
          };

          const res = await axios(options);
          setPreLoader(false);

          if (res.data.status == '200') {
            ToastAndroid.show('Registersion successful!', ToastAndroid.BOTTOM);
            login(res.data.access_token);
          } else {
            ToastAndroid.show('something went wrong!', ToastAndroid.BOTTOM);
          }
          console.log('reg res ---- ', res.data);
        } else {
          ToastAndroid.show('select Term and Condition!', ToastAndroid.BOTTOM);
        }
      }
    } catch (err) {
      console.log('reg err ---- ', err);
      setPreLoader(false);
      ToastAndroid.show('server problem occurs!', ToastAndroid.BOTTOM);
    }
  };

  // ---- get sub services ---

  const getSubServ = async sId => {
    try {
      const res = await axios.get('get-sub-service', {
        params: {
          id: sId,
        },
      });
      setservSubData(res.data.data);
    } catch (err) {
      console.log('get service err ---- ', err);
    }
  };

  // ---- get service --

  const getServ = async () => {
    try {
      const res = await axios.get('get-service');
      setservData(res.data.data);
    } catch (err) {
      console.log('get service err ---- ', err);
    }
  };

  // get current location ---

  const getLocation = async () => {
    let curLoc = await GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 5000,
    });
    setcurrentLocation(prev => ({
      ...prev,
      lat: curLoc.latitude,
      long: curLoc.longitude,
    }));
  };

  React.useEffect(() => {
    getServ();
    getLocation();
  }, []);

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      {/* ----------------Upper Container------------------- */}
      <View style={styles.upper__container}>
        <Text style={styles.upper__text}>Create Account</Text>
      </View>

      {/* -----------------------Middle Container-------------------------- */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.middle__container}>
          <View style={styles.middle__text__container}>
            <TextInput
              value={businessInfo.businessName}
              onChangeText={text =>
                setBusinessInfo(prev => ({...prev, businessName: text}))
              }
              placeholder="Bisiness Name"
              style={styles.middle__text__style}
            />
            <TextInput
              value={businessInfo.incorpNo}
              onChangeText={text =>
                setBusinessInfo(prev => ({...prev, incorpNo: text}))
              }
              placeholder="Incorporation no."
              style={styles.middle__text__style}
            />
            <TextInput
              value={businessInfo.businessAddr}
              onChangeText={text =>
                setBusinessInfo(prev => ({...prev, businessAddr: text}))
              }
              placeholder="Business Address"
              style={styles.middle__text__style}
            />

            <View style={styles.selector_container}>
              <SelectPicker
                selectedValue={businessInfo.businessType}
                onValueChange={(value, index) => {
                  setBusinessInfo(prev => ({...prev, businessType: value}));
                  getSubServ(value);
                }}
                style={{width: '100%'}}>
                <SelectPicker.Item
                  style={{color: 'gray'}}
                  label="Business Category"
                  value=""
                />
                {servData == undefined
                  ? null
                  : servData.length == 0
                  ? null
                  : servData.map(item => (
                      <SelectPicker.Item
                        key={item.id}
                        label={item.title}
                        value={item.id}
                      />
                    ))}
              </SelectPicker>
            </View>
            <View style={styles.selector_container}>
              <SelectPicker
                selectedValue={businessInfo.servType}
                onValueChange={(value, index) =>
                  setBusinessInfo(prev => ({...prev, servType: value}))
                }
                style={{width: '100%'}}>
                <SelectPicker.Item
                  style={{color: 'gray'}}
                  label="Business Sub Category"
                  value=""
                />
                {servSubData == undefined
                  ? null
                  : servSubData.length == 0
                  ? null
                  : servSubData.map(item => (
                      <SelectPicker.Item
                        key={item.id}
                        label={item.title}
                        value={item.id}
                      />
                    ))}
              </SelectPicker>
            </View>
            <View style={styles.selector_container}>
              <SelectPicker
                selectedValue={businessInfo.siaLicence}
                onValueChange={(value, index) =>
                  setBusinessInfo(prev => ({...prev, siaLicence: value}))
                }
                style={{width: '100%'}}>
                <SelectPicker.Item
                  style={{color: 'gray', fontSize: widhtToDp('4.2%')}}
                  label="Do you hold SIA License"
                  value=""
                />
                <SelectPicker.Item label="yes" value={1} />
                <SelectPicker.Item label="no" value={0} />
              </SelectPicker>
            </View>
          </View>
        </View>

        {pre_loader && (
          <ActivityIndicator
            size={40}
            color="red"
            style={{marginVertical: heightToDp('3%')}}
          />
        )}

        {/* -----------------------Lower Container-------------------------- */}
        <View style={styles.lower__Container}>
          <TouchableOpacity
            onPress={() => res__func()}
            style={styles.lower__txt__container}>
            <Text style={styles.lower__txt__style}>Continue</Text>
          </TouchableOpacity>
          <View style={styles.lower__check__container}>
            <Checkbox
              status={check_box ? 'checked' : 'unchecked'}
              onPress={() => setCheck_Box(!check_box)}
            />
            <Text style={styles.lower__txt__sty}>I agree with our</Text>
            <Text style={styles.lower__txt__sty1}>Terms</Text>
            <Text style={styles.lower__txt__sty2}>and</Text>
            <Text style={styles.lower__txt__sty3}>Condition</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Create1;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  upper__container: {
    marginTop: heightToDp('15%'),
  },
  upper__text: {
    fontSize: widhtToDp('7%'),
    alignSelf: 'center',
    color: '#000000B2',
    fontFamily: 'Montserrat-SemiBold',
  },
  middle__container: {
    paddingHorizontal: widhtToDp('7%'),
    marginTop: heightToDp('5%'),
  },

  middle__text__style: {
    backgroundColor: '#C4C4C473',
    paddingHorizontal: widhtToDp('5%'),
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
  },
  selector_container: {
    backgroundColor: '#C4C4C473',
    justifyContent: 'center',
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
  },
  middle__text__style2: {
    borderWidth: 1,
    color: '#00000099',
    borderColor: '#C4C4C473',
    backgroundColor: '#C4C4C473',
    paddingHorizontal: widhtToDp('3%'),
    paddingVertical: heightToDp('2%'),
    marginTop: heightToDp('1%'),
    borderRadius: 10,
  },
  lower__txt__container: {
    borderRadius: 30,
    backgroundColor: '#022299',
    alignSelf: 'center',
    width: widhtToDp('90%'),
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },
  lower__Container: {
    color: '#FFFFFF',
    marginTop: heightToDp('10%'),
  },
  lower__txt__style: {
    color: '#FFFFFF',
    fontSize: widhtToDp('4.5%'),
    fontFamily: 'Montserrat-Regular',
  },
  lower__check__container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: heightToDp('4%'),
  },
  lower__txt__sty: {
    color: ' rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
  },
  lower__txt__sty1: {
    color: 'blue',
    alignItems: 'center',
    marginLeft: widhtToDp('1%'),
  },
  lower__txt__sty2: {
    color: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    marginLeft: widhtToDp('1%'),
  },
  lower__txt__sty3: {
    color: 'blue',
    alignItems: 'center',
    marginLeft: widhtToDp('1%'),
  },
});
