import React, {useState, useEffect} from 'react';
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
  Image,
  Modal,
} from 'react-native';
import axios from '../../Components/axios';
import {Picker as SelectPicker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import messaging from '@react-native-firebase/messaging';
import {RadioButton} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import qs from 'qs';
import {AuthContext} from '../../Components/AuthContext';
import GetLocation from 'react-native-get-location';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyD33wZr809ySlFdDUF_UnxRB0TO91R3uqY';

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

const BusinessData = [
  {label: 'Owner Operator', value: 'Owner'},
  {label: 'Company', value: 'Company'},
  {label: 'Partnership', value: 'Partnership'},
  {label: 'LLC', value: 'LLC'},
  {label: 'Other.', value: 'Other'},
];

const Create = () => {
  const navigation = useNavigation();
  const {login} = React.useContext(AuthContext);

  // state management.

  const [all_codes, setAllCode] = React.useState([]);
  const [select_code, setSelectCode] = React.useState('');
  const [Country, setCountry] = React.useState('');
  const [CurrentIndex, setCurrentIndex] = React.useState(0);
  const [State, setState] = React.useState('');
  const [StateData, setStateData] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [checked, setChecked] = React.useState('');
  const [Ansewer, setAnsewer] = React.useState('No');
  const [Ansewer1, setAnsewer1] = React.useState('No');
  const [TowType, setTowType] = React.useState('');
  const [Licence_status, setLicence_status] = React.useState('');
  const [BusinessType, setBusinessType] = useState('');
  const [servData, setservData] = React.useState([]);
  const [startvisible, setStartVisible] = React.useState(false);
  const [endvisible, setEndVisible] = React.useState(false);
  const [Start_time, setStart_time] = useState(new Date());
  const [End_time, setEnd_time] = useState(new Date());
  const [dob_date, setdobDate] = React.useState(new Date());
  const [Licence_ID, setLicence_ID] = useState(new Date());
  const [Licence_ED, setLicence_ED] = useState(new Date());
  const [Insurance_SD, setInsurance_SD] = useState(new Date());
  const [Insurance_ED, setInsurance_ED] = useState(new Date());
  const [BusinessL_ID, setBusinessL_ID] = useState(new Date());
  const [BusinessL_ED, setBusinessL_ED] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [DateOpen, setDateOpen] = useState(false);
  const [DateIS, setDateIS] = useState(false);
  const [DateIE, setDateIE] = useState(false);
  const [DateBLS, setDateBLS] = useState(false);
  const [DateBLE, setDateBLE] = useState(false);
  const [pre_loader, setPreLoader] = useState(false);
  const [currentLocation, setcurrentLocation] = React.useState({
    lat: '',
    long: '',
  });

  console.log(currentLocation)

  // console.log('time ----', format_time(Start_time), format_time(End_time));

  function formatDate(d) {
    // var d = new Date(),
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }

  // --- formate time --
  function format_time(d) {
    // var d = new Date(),
    let hours = d.getHours();
    let mins = d.getMinutes();

    if (hours.length < 2) hours = '0' + hours;
    if (mins.length < 2) mins = '0' + mins;

    return [hours, mins].join(':');
  }

  const [Questions_Info, setQuestions_Info] = useState({
    Q1: Ansewer,
    Q2: Ansewer1,
    Police_report: PR,
  });

  const getLocation = async () => {
    let curLoc = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    });
    setBaseInfo(prevstate => ({
      ...prevstate,
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
    }));
    setcurrentLocation(prev => ({
      ...prev,
      lat: curLoc.latitude,
      long: curLoc.longitude,
    }));
  };

  // registration func.

  const res__func = async () => {
    try {
      setPreLoader(true);
      let data = {
        base_info: JSON.stringify(base_info),
        driver_licence_info: JSON.stringify(Driver_Info),
        qaone: Ansewer,
        qatwo: Ansewer1,
        qaphoto: PR,
        vehicle_info: JSON.stringify(Vehicle_Info),
        service_area: JSON.stringify(Street_Info),
        business_info: JSON.stringify(Business_Info),
      };

      let options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: 'create-provider',
      };

      const res = await axios(options);
      console.log('api res -----------------', res);
      setPreLoader(false);

      if (res.data.status == '200') {
        ToastAndroid.show('Registersion successful!', ToastAndroid.BOTTOM);
        login(res.data.access_token);
      } else {
        ToastAndroid.show('something went wrong!', ToastAndroid.BOTTOM);
      }
      console.log('reg res ---- ', res.data);
    } catch (err) {
      console.log('reg err ---- ', err);
      setPreLoader(false);
      ToastAndroid.show('server problem occurs!', ToastAndroid.BOTTOM);
    }
  };

  const [Driver_Info, setDriver_info] = useState({
    Licence_no: '',
    licence_state: State,
    Licence_Issue: Licence_ID,
    licence_expire: Licence_ED,
    licence_class: '',
    licence_status: '',
    licence_photo: DL,
    driver_selfie: Driver_selfie,
    insurance_photo: Insurance_card,
  });

  const [Business_Info, setBusiness_Info] = useState({
    business_type: BusinessType,
    license_owner: '',
    Issuing_city: '',
    date_issued: BusinessL_ID,
    expiry_date: BusinessL_ED,
    state_issue: '',
    servType: '',
    license_status: Licence_status,
  });

  const [Vehicle_Info, setVehicle_Info] = useState({
    Vehicle_Make: '',
    Vehicle_Model: '',
    Year: '',
    Tag_Number: '',
    Vin_Number: '',
    Owner_name: '',
    Insurance_Company: '',
    Insurance_type: '',
    Name_Insured: '',
    Insurance_start: Insurance_SD,
    Insurance_Expire: Insurance_ED,
    Liability_limits: '',
    Hook_type: '',
  });

  const [Street_Info, setStreet_Info] = useState({
    radius: '',
    city: '',
    zipcode: '',
    state: '',
    open_time: Start_time,
    close_time: End_time,
  });

  const [base_info, setBaseInfo] = React.useState({
    user_name: '',
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: '',
    dob: dob_date,
    mobile_no: '',
    alternate_no: '',
    latitude: currentLocation.lat,
    longitude: currentLocation.long,
    street_ad: '',
    city: '',
    state: '',
    country: '',
    postcode: '',
    country_code: select_code,
    fcmToken: '',
  });

  const handlecheck = () => {
    if (
      base_info.user_name == '' ||
      base_info.password !== base_info.confirm_password ||
      base_info.email == '' ||
      base_info.first_name == '' ||
      base_info.last_name == '' ||
      base_info.dob == '' ||
      base_info.mobile_no == '' ||
      base_info.alternate_no == '' ||
      base_info.latitude == '' ||
      base_info.longitude == '' ||
      base_info.street_ad == '' ||
      base_info.city == '' ||
      base_info.state == '' ||
      base_info.country == '' ||
      base_info.postcode == '' ||
      base_info.country_code == '' ||
      base_info.fcmToken == ''
    ) {
      
       ToastAndroid.show('some fields are empty! or Confirm Password was incorrect ', ToastAndroid.BOTTOM);
    } else {
      setCurrentIndex(1)
    }
  };

  console.log('base_info  ---------', base_info);
  console.log('Street_Info  ---------', Street_Info);
  console.log('Vehicle_Info  ---------', Vehicle_Info);
  console.log('Driver_Info  ---------', Driver_Info);
  console.log('Business_Info  ---------', Business_Info);

  //  const getServ = async () => {
  //    try {
  //      const res = await axios.get('get-service');
  //      setservData(res.data.data);
  //    } catch (err) {
  //      console.log('get service err ---- ', err);
  //    }
  //  };
  const getServ = () => {
    fetch('https://admin.nootans.com/provider/get-service')
      .then(response => response.json())

      .then(json => {
        var count = Object.keys(json.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: json.data[i].id,
            label: json.data[i].title,
          });
        }
        setservData(stateArray);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  // DL //
  const [visible, setVisible] = useState(false);
  const [VehicleImage, setVehicleImage] = useState('');
  const [DL, setDL] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // end DL //

  // EL //
  const [visible1, setVisible1] = React.useState(false);
  const [VehicleImage2, setVehicleImage2] = useState('');
  const [Driver_selfie, setDriver_Selfie] = useState('');
  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);
  // end EL //

  // IP //
  const [visible2, setVisible2] = React.useState(false);
  const [VehicleImage3, setVehicleImage3] = useState('');
  const [Insurance_card, setInsurance_card] = useState('');
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);
  // end IP//

  // Police Report //
  const [visible3, setVisible3] = React.useState(false);
  const [ReportImage, setReportImage] = useState('');
  const [PR, setPR] = useState('');
  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => setVisible3(false);

  const takePhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage(VehicleImage.path);
      setDL(`data:image/png;base64,${VehicleImage.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        licence_photo: `data:image/png;base64,${VehicleImage.data}`,
      }));
      hideModal();
    });
  };
  const choosePhotofromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage(VehicleImage.path);
      setDL(`data:image/png;base64,${VehicleImage.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        licence_photo: `data:image/png;base64,${VehicleImage.data}`,
      }));
      hideModal();
    });
  };

  const takePhotofromCamera1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage2 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage2(VehicleImage2.path);
      setDriver_Selfie(`data:image/png;base64,${VehicleImage2.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        driver_selfie: `data:image/png;base64,${VehicleImage2.data}`,
      }));
      hideModal1();
    });
  };
  const choosePhotofromLibrary1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage2 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage2(VehicleImage2.path);
      setDriver_Selfie(`data:image/png;base64,${VehicleImage2.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        driver_selfie: `data:image/png;base64,${VehicleImage2.data}`,
      }));
      hideModal1();
    });
  };

  const takePhotofromCamera2 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage3 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage3(VehicleImage3.path);
      setInsurance_card(`data:image/png;base64,${VehicleImage3.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        insurance_card: `data:image/png;base64,${VehicleImage3.data}`,
      }));
      hideModal2();
    });
  };
  const choosePhotofromLibrary2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage3 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage3(VehicleImage3.path);
      setInsurance_card(`data:image/png;base64,${VehicleImage3.data}`);
      setDriver_info(prevstate => ({
        ...prevstate,
        insurance_card: `data:image/png;base64,${VehicleImage3.data}`,
      }));
      hideModal2();
    });
  };

  const takePhotofromCamera3 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(ReportImage => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setReportImage(ReportImage.path);
      setPR(`data:image/png;base64,${ReportImage.data}`);
      hideModal3();
    });
  };
  const choosePhotofromLibrary3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(ReportImage => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setReportImage(ReportImage.path);
      setPR(`data:image/png;base64,${ReportImage.data}`);
      hideModal3();
    });
  };

  // get state -------
  const StateApi = () => {
    fetch('https://elixirgold.in/user/api/getstate.php')
      .then(response => response.json())

      .then(json => {
        var count = Object.keys(json.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: json.data[i].id,
            label: json.data[i].state,
          });
        }
        setStateData(stateArray);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  // get all country codes.

  const get__codes = async () => {
    try {
      const res = await axios.get('getCountryCode');
      setAllCode(res.data.data);
    } catch (err) {
      console.log('get codes ---- ', err);
    }
  };

  // ---- nav func.

  // get fcm token ----

  const getToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      setBaseInfo(prev => ({...prev, fcmToken}));
    } catch (err) {
      console.log('fcm token err -- ', err);
    }
  };

  // -----

  React.useEffect(() => {
    getLocation();
    get__codes();
    StateApi();
    getToken();
    getServ();
  }, []);
  // -----

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
      <ScrollView contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        {/* ----------------Upper Container------------------- */}
        <View style={styles.upper__container}>
          <Text style={styles.upper__text}>Create Account</Text>
        </View>
        {/* -----------------------Middle Container-------------------------- */}
        {CurrentIndex == 0 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <TextInput
                value={base_info.user_name}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, user_name: text}))
                }
                placeholder="User Name"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.password}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, password: text}))
                }
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              {base_info.password == '' ? null : base_info.password.length <
                8 ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: widhtToDp('2.5%'),
                    marginLeft: widhtToDp('1%'),
                    marginTop: heightToDp('1%'),
                  }}>
                  Password should be atleast 8 characters or digits{' '}
                </Text>
              ) : null}
              <TextInput
                value={base_info.confirm_password}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({
                    ...prevstate,
                    confirm_password: text,
                  }))
                }
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.email}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, email: text}))
                }
                placeholder="Email"
                placeholderTextColor={'#858585'}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.middle__text__style}
              />
              {base_info.email == '' ? null : !base_info.email.match(
                  /\S+@\S+\.\S+/,
                ) ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: widhtToDp('2.5%'),
                    marginLeft: widhtToDp('1%'),
                    marginTop: heightToDp('1%'),
                  }}>
                  email is not valid!
                </Text>
              ) : null}
              <TextInput
                value={base_info.first_name}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, first_name: text}))
                }
                placeholder="First Name"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              {base_info.first_name
                .charAt(0)
                .match(/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/) ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: widhtToDp('2.5%'),
                    marginLeft: widhtToDp('1%'),
                    marginTop: heightToDp('1%'),
                  }}>
                  Name should be start with alphabate only!
                </Text>
              ) : null}
              <TextInput
                value={base_info.last_name}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, last_name: text}))
                }
                placeholder="Last Name"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              {base_info.last_name
                .charAt(0)
                .match(/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/) ? (
                <Text
                  style={{
                    color: 'red',
                    fontSize: widhtToDp('2.5%'),
                    marginLeft: widhtToDp('1%'),
                    marginTop: heightToDp('1%'),
                  }}>
                  Name should be start with alphabate only!
                </Text>
              ) : null}

              <View style={styles.date__container}>
                <Text style={{color: '#858585'}}>Select Date of Birth</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  {dob_date == undefined ? (
                    <Text style={{color: '#858585'}}>select Date</Text>
                  ) : (
                    <Text style={{color: '#000'}}>{formatDate(dob_date)}</Text>
                  )}
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={open}
                date={base_info.dob}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setdobDate(date);
                  setBaseInfo(prevstate => ({...prevstate, dob: date}));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={styles.input__style1}>
                <View
                  style={{
                    width: '35%',
                  }}>
                  <SelectPicker
                    selectedValue={Country}
                    onValueChange={(value, index) => {
                      setSelectCode(value.toString(), setCountry(value));
                      setBaseInfo(prevstate => ({
                        ...prevstate,
                        country_code: value.toString(),
                      }));
                    }}
                    style={{width: '100%', borderWidth: 1, color: '#000'}}>
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
                </View>
                <TextInput
                  value={select_code}
                  editable={false}
                  style={{width: '10%', color: '#000'}}
                />
                <TextInput
                  value={base_info.mobile_no}
                  onChangeText={text =>
                    setBaseInfo(prevstate => ({...prevstate, mobile_no: text}))
                  }
                  style={{width: '45%'}}
                  keyboardType="phone-pad"
                  placeholderTextColor="#858585"
                  placeholder="Phone number"
                  maxLength={10}
                />
              </View>

              <View style={styles.input__style1}>
                <View
                  style={{
                    width: '35%',
                  }}>
                  <SelectPicker
                    selectedValue={Country}
                    onValueChange={(value, index) =>
                      setSelectCode(value.toString(), setCountry(value))
                    }
                    style={{width: '100%', borderWidth: 1, color: '#000'}}>
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
                </View>
                <TextInput
                  value={select_code}
                  editable={false}
                  style={{width: '10%', color: '#000'}}
                />
                <TextInput
                  value={base_info.alternate_no}
                  onChangeText={text =>
                    setBaseInfo(prevstate => ({
                      ...prevstate,
                      alternate_no: text,
                    }))
                  }
                  style={{width: '45%'}}
                  keyboardType="phone-pad"
                  placeholderTextColor="#858585"
                  placeholder="Alternate Number"
                  maxLength={10}
                />
              </View>

              <TextInput
                value={base_info.street_ad}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, street_ad: text}))
                }
                keyboardType="default"
                placeholder="Enter Street Address"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.city}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, city: text}))
                }
                keyboardType="default"
                placeholder="Enter City"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.state}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, state: text}))
                }
                keyboardType="default"
                placeholder="Enter state"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.postcode}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, postcode: text}))
                }
                keyboardType="default"
                placeholder="Enter PostCode"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <TextInput
                value={base_info.country}
                onChangeText={text =>
                  setBaseInfo(prevstate => ({...prevstate, country: text}))
                }
                keyboardType="default"
                placeholder="Enter Country"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
            </View>
            {/* <View>
              <GooglePlacesAutocomplete
                placeholder="Search"
                textInputProps={{
                  placeholderTextColor: '#000',
                  returnKeyType: 'search',
                }}
                fetchDetails={true}
                styles={{
                  container: {
                    width: '100%',
                    alignSelf: 'center',
                    marginTop: 10,
                    elevation: 10,
                    position: 'absolute',
                    flex: 1,
                    zIndex: 1,
                  },
                  textInputContainer: {
                    flexDirection: 'row',
                  },
                  textInput: {
                    backgroundColor: '#dfdfdf',
                    height: 44,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    fontSize: 15,
                    flex: 1,
                  },
                  poweredContainer: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderColor: '#c8c7cc',
                    borderTopWidth: 0.5,
                  },
                  powered: {},
                  listView: {},
                  row: {
                    backgroundColor: '#dfdfdf',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                  },
                  separator: {
                    height: 0.5,
                    backgroundColor: '#c8c7cc',
                  },
                  description: {},
                  loader: {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    height: 20,
                  },
                }}
                onPress={(data, details = null) => {
                  get_provider_list(JSON.stringify(data.description));
                  console.log(JSON.stringify(data.description));
                  console.log(JSON.stringify(details.geometry.location));
                }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
              />
            </View> */}
            <View style={styles.lower__Container}>
              <TouchableOpacity
                onPress={handlecheck}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {CurrentIndex == 1 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <Text style={{color: '#000', fontSize: 20}}>
                Driver Licence Information:{' '}
              </Text>
              <TextInput
                value={Driver_Info.Licence_no}
                onChangeText={text =>
                  setDriver_info(prevstate => ({
                    ...prevstate,
                    Licence_no: text,
                  }))
                }
                placeholder="Enter Driver License number"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{fontSize: 14, color: '#000', padding: 0}}
                data={StateData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select State Of Issue' : '...'}
                searchPlaceholder="Search..."
                value={Driver_Info.licence_state}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setState(item.value);
                  setDriver_info(prevstate => ({
                    ...prevstate,
                    licence_state: item.value,
                  }));
                  setIsFocus(false);
                }}
              />
              <View style={styles.date__container}>
                <Text style={{color: '#858585'}}>Select Date Of Issue</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  {Licence_ID == undefined ? (
                    <Text style={{color: '#858585'}}>select Date</Text>
                  ) : (
                    <Text style={{color: '#000'}}>
                      {formatDate(Licence_ID)}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={open}
                date={Driver_Info.Licence_Issue}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setLicence_ID(date);
                  setDriver_info(prevstate => ({
                    ...prevstate,
                    Licence_Issue: date,
                  }));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <View style={styles.date__container}>
                <Text style={{color: '#858585'}}>Select Expire Date</Text>
                <TouchableOpacity onPress={() => setDateOpen(true)}>
                  {Licence_ED == undefined ? (
                    <Text style={{color: '#858585'}}>select Date</Text>
                  ) : (
                    <Text style={{color: '#000'}}>
                      {formatDate(Licence_ED)}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <DatePicker
                modal
                open={DateOpen}
                date={Driver_Info.licence_expire}
                mode="date"
                onConfirm={date => {
                  setDateOpen(false);
                  setLicence_ED(date);
                  setDriver_info(prevstate => ({
                    ...prevstate,
                    licence_expire: date,
                  }));
                }}
                onCancel={() => {
                  setDateOpen(false);
                }}
              />
              <TextInput
                value={Driver_Info.licence_class}
                onChangeText={text =>
                  setDriver_info(prevstate => ({
                    ...prevstate,
                    licence_class: text,
                  }))
                }
                placeholder="Enter License Class"
                placeholderTextColor={'#858585'}
                style={styles.middle__text__style}
              />
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginTop: heightToDp('3%'),
                }}>
                Licence Status:
              </Text>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    color="#000"
                    value="Active"
                    status={checked === 'Active' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('Active'),
                        setDriver_info(prevstate => ({
                          ...prevstate,
                          licence_status: 'Active',
                        }));
                    }}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>Active</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    color="#000"
                    value="Suspended"
                    status={checked === 'Suspended' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('Suspended'),
                        setDriver_info(prevstate => ({
                          ...prevstate,
                          licence_status: 'Suspended',
                        }));
                    }}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>
                    Suspended
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    color="#000"
                    value="Not Active"
                    status={checked === 'Not Active' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked('Not Active'),
                        setDriver_info(prevstate => ({
                          ...prevstate,
                          licence_status: 'Not Active',
                        }));
                    }}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>
                    Not Active
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginTop: heightToDp('3%'),
                }}>
                Upload the following Documents:
              </Text>
              <View style={styles.profileimg__container}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    width: '40%',
                    height: 150,
                    alignSelf: 'center',
                    marginTop: heightToDp('3%'),
                    borderRadius: 8,
                    overflow: 'hidden',
                    margin: 10,
                    elevation: 8,
                  }}
                  onPress={() => {
                    showModal();
                  }}>
                  {VehicleImage === '' ? (
                    <Text
                      style={{
                        color: '#000000',
                        alignSelf: 'center',
                        top: '45%',
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      Upload Photo of Driver’s License
                    </Text>
                  ) : (
                    <Image
                      source={{
                        uri: VehicleImage,
                      }}
                      style={styles.Vehicleimg__style}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    width: '40%',
                    height: 150,
                    alignSelf: 'center',
                    marginTop: heightToDp('3%'),
                    borderRadius: 8,
                    overflow: 'hidden',
                    margin: 10,
                    elevation: 8,
                  }}
                  onPress={() => {
                    showModal1();
                  }}>
                  {VehicleImage2 === '' ? (
                    <Text
                      style={{
                        color: '#000000',
                        alignSelf: 'center',
                        top: '45%',
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      A Selfie picture taken with your Phone
                    </Text>
                  ) : (
                    <Image
                      source={{
                        uri: VehicleImage2,
                      }}
                      style={styles.Vehicleimg__style}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ffff',
                    width: '40%',
                    height: 150,
                    alignSelf: 'center',
                    marginTop: heightToDp('3%'),
                    borderRadius: 8,
                    overflow: 'hidden',
                    margin: 10,
                    elevation: 8,
                  }}
                  onPress={() => {
                    showModal2();
                  }}>
                  {VehicleImage3 === '' ? (
                    <Text
                      style={{
                        color: '#000000',
                        alignSelf: 'center',
                        top: '45%',
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      A copy of your Insurance Card
                    </Text>
                  ) : (
                    <Image
                      source={{
                        uri: VehicleImage3,
                      }}
                      style={styles.Vehicleimg__style}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lower__Container}>
              <TouchableOpacity
                onPress={() => setCurrentIndex(2)}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {CurrentIndex == 2 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <Text style={{color: '#000', fontSize: 20}}>
                Answer these Questions:{' '}
              </Text>

              <View>
                <Text
                  style={{
                    color: '#858585',
                    fontSize: 16,
                    marginTop: heightToDp('3%'),
                  }}>
                  Q.1 Have you had any DUI in the past 3 Years?{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="Yes"
                    status={Ansewer === 'Yes' ? 'checked' : 'unchecked'}
                    onPress={() => setAnsewer('Yes')}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>Yes</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="No"
                    status={Ansewer === 'No' ? 'checked' : 'unchecked'}
                    onPress={() => setAnsewer('No')}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>No</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    color: '#858585',
                    fontSize: 16,
                    marginTop: heightToDp('3%'),
                  }}>
                  Q.2 Have you had any accidents in the past 3 Years? If Yes
                  Upload a Police Report{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="Yes"
                    status={Ansewer1 === 'Yes' ? 'checked' : 'unchecked'}
                    onPress={() => setAnsewer1('Yes')}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>Yes</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="No"
                    status={Ansewer1 === 'No' ? 'checked' : 'unchecked'}
                    onPress={() => setAnsewer1('No')}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>No</Text>
                </View>
                {Ansewer1 == 'Yes' ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffff',
                      width: '40%',
                      height: 150,
                      alignSelf: 'center',
                      marginTop: heightToDp('3%'),
                      borderRadius: 8,
                      overflow: 'hidden',
                      margin: 10,
                      elevation: 8,
                    }}
                    onPress={() => {
                      showModal3();
                    }}>
                    {ReportImage === '' ? (
                      <Text
                        style={{
                          color: '#000000',
                          alignSelf: 'center',
                          top: '45%',
                          width: '80%',
                          textAlign: 'center',
                        }}>
                        Upload Police Report
                      </Text>
                    ) : (
                      <Image
                        source={{
                          uri: ReportImage,
                        }}
                        style={styles.Vehicleimg__style}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={styles.lower__Container}>
              <TouchableOpacity
                onPress={() => setCurrentIndex(3)}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {CurrentIndex == 3 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <Text style={{color: '#000', fontSize: 20}}>
                Vehicle Information:{' '}
              </Text>

              <View>
                <TextInput
                  value={Vehicle_Info.Vehicle_Make}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Vehicle_Make: text,
                    }))
                  }
                  placeholder="Enter Vehicle Make"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Vehicle_Model}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Vehicle_Model: text,
                    }))
                  }
                  placeholder="Enter Vehicle Model"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Year}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Year: text,
                    }))
                  }
                  placeholder="Enter Year"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Tag_Number}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Tag_Number: text,
                    }))
                  }
                  placeholder="Enter Tag Number"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />

                <TextInput
                  value={Vehicle_Info.Vin_Number}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Vin_Number: text,
                    }))
                  }
                  placeholder="Enter Vin Number"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Owner_name}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Owner_name: text,
                    }))
                  }
                  placeholder="Enter Registered Owner name"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Insurance_Company}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Insurance_Company: text,
                    }))
                  }
                  placeholder="Enter Name of Insurance Company"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Insurance_type}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Insurance_type: text,
                    }))
                  }
                  placeholder="Enter Type of Insurance "
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Vehicle_Info.Name_Insured}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Name_Insured: text,
                    }))
                  }
                  placeholder="Enter Name Insured"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />

                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>
                    Select Insurance Start Date
                  </Text>
                  <TouchableOpacity onPress={() => setDateIS(true)}>
                    {Insurance_SD == undefined ? (
                      <Text style={{color: '#858585'}}>select Date</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {formatDate(Insurance_SD)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={DateIS}
                  date={Vehicle_Info.Insurance_start}
                  mode="date"
                  onConfirm={date => {
                    setDateIS(false);
                    setInsurance_SD(date);
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Insurance_start: date,
                    }));
                  }}
                  onCancel={() => {
                    setDateIS(false);
                  }}
                />
                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>
                    Select Insurance Expire Date
                  </Text>
                  <TouchableOpacity onPress={() => setDateIE(true)}>
                    {Insurance_ED == undefined ? (
                      <Text style={{color: '#858585'}}>select Date</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {formatDate(Insurance_ED)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={DateIE}
                  date={Vehicle_Info.Insurance_Expire}
                  mode="date"
                  onConfirm={date => {
                    setDateIE(false);
                    setInsurance_ED(date);
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Insurance_Expire: date,
                    }));
                  }}
                  onCancel={() => {
                    setDateIE(false);
                  }}
                />

                <TextInput
                  value={Vehicle_Info.Liability_limits}
                  onChangeText={text =>
                    setVehicle_Info(prevstate => ({
                      ...prevstate,
                      Liability_limits: text,
                    }))
                  }
                  placeholder="Enter Liability limits"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    marginTop: heightToDp('3%'),
                  }}>
                  Select Type of Tow vehicle you will be using:{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="FLATBED"
                    status={TowType === 'FLATBED' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTowType('FLATBED'),
                        setVehicle_Info(prevstate => ({
                          ...prevstate,
                          Hook_type: 'FLATBED',
                        }));
                    }}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>FLATBED</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: -10,
                    marginBottom: -10,
                  }}>
                  <RadioButton
                    color="#000"
                    value="HOOK"
                    status={TowType === 'HOOK' ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setTowType('HOOK'),
                        setVehicle_Info(prevstate => ({
                          ...prevstate,
                          Hook_type: 'HOOK',
                        }));
                    }}
                  />
                  <Text style={{color: '#858585', fontSize: 18}}>
                    Standard HOOK Type
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.lower__Container}>
              <TouchableOpacity
                onPress={() => setCurrentIndex(4)}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {CurrentIndex == 4 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <Text style={{color: '#000', fontSize: 20}}>Service Area: </Text>

              <View>
                <TextInput
                  value={Street_Info.radius}
                  onChangeText={text =>
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      radius: text,
                    }))
                  }
                  placeholder="Enter Radius of Operation"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Street_Info.city}
                  onChangeText={text =>
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      city: text,
                    }))
                  }
                  placeholder="Enter City"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Street_Info.zipcode}
                  onChangeText={text =>
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      zipcode: text,
                    }))
                  }
                  placeholder="Enter Zipcode"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Street_Info.state}
                  onChangeText={text =>
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      state: text,
                    }))
                  }
                  placeholder="Enter State"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />

                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>Select Open Time</Text>
                  <TouchableOpacity onPress={() => setStartVisible(true)}>
                    {Start_time == undefined ? (
                      <Text style={{color: '#858585'}}>select Open Time</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {format_time(Start_time)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={startvisible}
                  date={Start_time}
                  mode="time"
                  onConfirm={date => {
                    setStartVisible(false);
                    setStart_time(date);
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      open_time: format_time(date),
                    }));
                  }}
                  onCancel={() => {
                    setStartVisible(false);
                  }}
                />
                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>Select Close Time</Text>
                  <TouchableOpacity onPress={() => setEndVisible(true)}>
                    {End_time == undefined ? (
                      <Text style={{color: '#858585'}}>select Close Time</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {format_time(End_time)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={endvisible}
                  date={End_time}
                  mode="time"
                  onConfirm={date => {
                    setEndVisible(false);
                    setEnd_time(date);
                    setStreet_Info(prevstate => ({
                      ...prevstate,
                      close_time: format_time(date),
                    }));
                  }}
                  onCancel={() => {
                    setEndVisible(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.lower__Container}>
              <TouchableOpacity
                onPress={() => setCurrentIndex(5)}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {CurrentIndex == 5 ? (
          <View style={styles.middle__container}>
            <View style={styles.middle__text__container}>
              <Text style={{color: '#000', fontSize: 20}}>
                Business Information:{' '}
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{fontSize: 14, color: '#000', padding: 0}}
                data={BusinessData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Business Type' : '...'}
                searchPlaceholder="Search..."
                value={BusinessType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setBusiness_Info(prevstate => ({
                    ...prevstate,
                    business_type: item.value,
                  }));
                  setBusinessType(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={{fontSize: 14, color: '#000', padding: 0}}
                data={servData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Service Type' : '...'}
                searchPlaceholder="Search..."
                value={Business_Info.servType}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setBusiness_Info(prevstate => ({
                    ...prevstate,
                    servType: item.value,
                  }));
                  setIsFocus(false);
                }}
              />

              <View>
                <TextInput
                  value={Business_Info.license_owner}
                  onChangeText={text =>
                    setBusiness_Info(prevstate => ({
                      ...prevstate,
                      license_owner: text,
                    }))
                  }
                  placeholder="License Owner"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <TextInput
                  value={Business_Info.Issuing_city}
                  onChangeText={text =>
                    setBusiness_Info(prevstate => ({
                      ...prevstate,
                      Issuing_city: text,
                    }))
                  }
                  placeholder="Issuing City"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>Select Issues Date</Text>
                  <TouchableOpacity onPress={() => setDateBLS(true)}>
                    {BusinessL_ID == undefined ? (
                      <Text style={{color: '#858585'}}>select Date</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {formatDate(BusinessL_ID)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={DateBLS}
                  date={Business_Info.date_issued}
                  mode="date"
                  onConfirm={date => {
                    setDateBLS(false);
                    setBusinessL_ID(date);
                    setBusiness_Info(prevstate => ({
                      ...prevstate,
                      date_issued: date,
                    }));
                  }}
                  onCancel={() => {
                    setDateBLS(false);
                  }}
                />
                <View style={styles.date__container}>
                  <Text style={{color: '#858585'}}>Select Expiry Date</Text>
                  <TouchableOpacity onPress={() => setDateBLE(true)}>
                    {BusinessL_ED == undefined ? (
                      <Text style={{color: '#858585'}}>select Date</Text>
                    ) : (
                      <Text style={{color: '#000'}}>
                        {formatDate(BusinessL_ED)}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  open={DateBLE}
                  date={Business_Info.expiry_date}
                  mode="date"
                  onConfirm={date => {
                    setDateBLE(false);
                    setBusinessL_ED(date);
                    setBusiness_Info(prevstate => ({
                      ...prevstate,
                      expiry_date: date,
                    }));
                  }}
                  onCancel={() => {
                    setDateBLE(false);
                  }}
                />

                <TextInput
                  value={Business_Info.state_issue}
                  onChangeText={text =>
                    setBusiness_Info(prevstate => ({
                      ...prevstate,
                      state_issue: text,
                    }))
                  }
                  placeholder="State of Issue"
                  placeholderTextColor={'#858585'}
                  style={styles.middle__text__style}
                />
              </View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  marginTop: heightToDp('3%'),
                }}>
                Select Licence Status:{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: -10,
                }}>
                <RadioButton
                  color="#000"
                  value="Active"
                  status={Licence_status === 'Active' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setLicence_status('Active'),
                      setBusiness_Info(prevstate => ({
                        ...prevstate,
                        licence_status: 'Active',
                      }));
                  }}
                />
                <Text style={{color: '#858585', fontSize: 18}}>Active</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -10,
                  marginBottom: -10,
                }}>
                <RadioButton
                  color="#000"
                  value="Not Active"
                  status={
                    Licence_status === 'Not Active' ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setLicence_status('Not Active'),
                      setBusiness_Info(prevstate => ({
                        ...prevstate,
                        licence_status: 'Not Active',
                      }));
                  }}
                />
                <Text style={{color: '#858585', fontSize: 18}}>Not Active</Text>
              </View>
            </View>
            <View style={styles.lower__Container}>
              {pre_loader && <ActivityIndicator size={'large'} color={'red'} />}
              <TouchableOpacity
                onPress={() => res__func()}
                style={styles.lower__txt__container}>
                <Text style={styles.lower__txt__style}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* -----------------------Lower Container-------------------------- */}
      </ScrollView>

      <Modal transparent={true} visible={visible} onDismiss={hideModal}>
        <View style={styles.container__style}>
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
        </View>
      </Modal>

      <Modal transparent={true} visible={visible1} onDismiss={hideModal1}>
        <View style={styles.container__style}>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => takePhotofromCamera1()}>
            <Text style={styles.btn__style}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => choosePhotofromLibrary1()}>
            <Text style={styles.btn__style}>Choose gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal transparent={true} visible={visible2} onDismiss={hideModal2}>
        <View style={styles.container__style}>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => takePhotofromCamera2()}>
            <Text style={styles.btn__style}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => choosePhotofromLibrary2()}>
            <Text style={styles.btn__style}>Choose gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal transparent={true} visible={visible3} onDismiss={hideModal3}>
        <View style={styles.container__style}>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => takePhotofromCamera3()}>
            <Text style={styles.btn__style}>Take photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imgopt__container}
            onPress={() => choosePhotofromLibrary3()}>
            <Text style={styles.btn__style}>Choose gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#C4C4C473',
    borderRadius: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginTop: heightToDp('3%'),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    color: '#000',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#858585',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  upper__container: {
    marginTop: heightToDp('5%'),
  },
  upper__text: {
    fontSize: widhtToDp('7%'),
    alignSelf: 'center',
    color: '#000000B2',
    fontFamily: 'Montserrat-SemiBold',
  },
  middle__container: {
    paddingHorizontal: widhtToDp('7%'),
    marginTop: heightToDp('2%'),
  },

  input__style1: {
    backgroundColor: 'rgba(196, 196, 196, 0.45)',
    marginTop: heightToDp('2%'),
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
  },

  middle__text__style: {
    backgroundColor: '#C4C4C473',
    paddingHorizontal: widhtToDp('5%'),
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
    color: '#000',
  },
  selector_style: {
    backgroundColor: '#C4C4C473',
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date__container: {
    backgroundColor: '#C4C4C473',
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
    paddingHorizontal: widhtToDp('5%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lower__txt__container: {
    borderRadius: 30,
    backgroundColor: '#000000',
    alignSelf: 'center',
    width: widhtToDp('90%'),
    alignItems: 'center',
    paddingHorizontal: widhtToDp('1.7%'),
    height: 48,
    justifyContent: 'center',
  },
  lower__Container: {
    color: '#FFFFFF',
    marginTop: heightToDp('7%'),
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

  Vehicleimg__style: {
    // alignSelf: 'center',
    height: 380,
    // width: '100%',
    resizeMode: 'cover',
  },

  container__style: {
    backgroundColor: '#fff',
    width: '90%',
    height: heightToDp('20%'),
    marginLeft: widhtToDp('5%'),
    marginTop: heightToDp('30%'),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgopt__container: {
    backgroundColor: '#fff',
    borderColor: '#ecc55b',
    width: widhtToDp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1%'),
    marginTop: heightToDp('2%'),
    elevation: 5,
  },
  btn__style: {
    fontSize: widhtToDp('4%'),
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  profileimg__container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selector_container: {
    backgroundColor: '#C4C4C473',
    justifyContent: 'center',
    marginTop: heightToDp('3%'),
    borderRadius: 8,
    height: 48,
  },
});
