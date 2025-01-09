import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
  ActivityIndicator,
  ToastAndroid,
  Image,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
// import DressCard from '../../components/DressCard';
import axios from '../../Components/axios';
import {Provider, Portal, Modal} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

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

const DocumentUpload = ({route}) => {
  const navigation = useNavigation();
  const {user_info, selCode} = route.params;
  
  // DL //
  const [visible, setVisible] = React.useState(false);
  const [VehicleImage, setVehicleImage] = useState('');
  const [DL, setDL] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // end DL //

  // EL //
  const [visible1, setVisible1] = React.useState(false);
  const [VehicleImage2, setVehicleImage2] = useState('');
  const [EL, setEL] = useState('');
  const showModal1 = () => setVisible1(true);
  const hideModal1 = () => setVisible1(false);
  // end EL //

  // IP //
  const [visible2, setVisible2] = React.useState(false);
  const [VehicleImage3, setVehicleImage3] = useState('');
  const [IP, setIP] = useState('');
  const showModal2 = () => setVisible2(true);
  const hideModal2 = () => setVisible2(false);
  // end IP//

  // AP //
  const [visible3, setVisible3] = React.useState(false);
  const [VehicleImage4, setVehicleImage4] = useState('');
  const [AP, setAP] = useState('');
  const showModal3 = () => setVisible3(true);
  const hideModal3 = () => setVisible3(false);
  // End AP //

  // RC //
  const [visible4, setVisible4] = React.useState(false);
  const [VehicleImage5, setVehicleImage5] = useState('');
  const [RC, setRC] = useState('');
  const showModal4 = () => setVisible4(true);
  const hideModal4 = () => setVisible4(false);
  // End RC //

  const navFunc = () => {
    if (
        DL == '' ||
        EL == '' ||
        IP == '' ||
        AP == '' ||
        RC == ''
        ) {
      ToastAndroid.show('Please upload  image!', ToastAndroid.BOTTOM);
    } else {
      navigation.navigate('Create1', {
        user_info,
        DL,
        EL,
        IP,
        AP,
        RC,
        selCode,
      });
    }
  };

  //EDIT PROFILE---

  const takePhotofromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage(VehicleImage.path);
      setDL(`data:image/png;base64,${VehicleImage.data}`);
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
      hideModal();
    });
  };

  const takePhotofromCamera1 = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage2 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage2(VehicleImage2.path);
      setEL(`data:image/png;base64,${VehicleImage2.data}`);
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
      setEL(`data:image/png;base64,${VehicleImage2.data}`);
      hideModal1();
    });
  };

  const takePhotofromCamera2 = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage3 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage3(VehicleImage3.path);
      setIP(`data:image/png;base64,${VehicleImage3.data}`);
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
      setIP(`data:image/png;base64,${VehicleImage3.data}`);
      hideModal2();
    });
  };

  const takePhotofromCamera3 = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 200,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage4 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage4(VehicleImage4.path);
      setAP(`data:image/png;base64,${VehicleImage4.data}`);
      hideModal3();
    });
  };
  const choosePhotofromLibrary3 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 450,
      cropping: true,
      includeBase64: true,
    }).then(VehicleImage4 => {
      // setVehicleImage(prev => ({
      //   ...prev,
      //   profilephoto: `data:image/png;base64,${image.data}`,
      // }));
      setVehicleImage4(VehicleImage4.path);
      setAP(`data:image/png;base64,${VehicleImage4.data}`);
      hideModal3();
    });
  };


   const takePhotofromCamera4 = () => {
     ImagePicker.openCamera({
       width: 500,
       height: 200,
       cropping: true,
       includeBase64: true,
     }).then(VehicleImage5 => {
       // setVehicleImage(prev => ({
       //   ...prev,
       //   profilephoto: `data:image/png;base64,${image.data}`,
       // }));
       setVehicleImage5(VehicleImage5.path);
       setRC(`data:image/png;base64,${VehicleImage5.data}`);
       hideModal4();
     });
   };
   const choosePhotofromLibrary4 = () => {
     ImagePicker.openPicker({
       width: 300,
       height: 450,
       cropping: true,
       includeBase64: true,
     }).then(VehicleImage5 => {
       // setVehicleImage(prev => ({
       //   ...prev,
       //   profilephoto: `data:image/png;base64,${image.data}`,
       // }));
       setVehicleImage5(VehicleImage5.path);
       setRC(`data:image/png;base64,${VehicleImage5.data}`);
       hideModal4();
     });
   };
  // ----

  // React.useEffect(() => {
  //   getDressCode();
  // }, []);

  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* ------- header part -------- */}
      <View style={styles.header__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FIcon name="arrow-left" style={styles.header__icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.upper__title}>Upload Your Document</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        {/* ----------------header end------------------ */}
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
                Upload Driving Licence
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
                Experience Letter
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
                Identification Proof
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
              showModal3();
            }}>
            {VehicleImage4 === '' ? (
              <Text
                style={{
                  color: '#000000',
                  alignSelf: 'center',
                  top: '45%',
                  width: '80%',
                  textAlign: 'center',
                }}>
                Address Proof
              </Text>
            ) : (
              <Image
                source={{
                  uri: VehicleImage4,
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
              showModal4();
            }}>
            {VehicleImage5 === '' ? (
              <Text
                style={{
                  color: '#000000',
                  alignSelf: 'center',
                  top: '45%',
                  width: '80%',
                  textAlign: 'center',
                }}>
                Upload Your RC.
              </Text>
            ) : (
              <Image
                source={{
                  uri: VehicleImage5,
                }}
                style={styles.Vehicleimg__style}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navFunc()}
          style={styles.continuebtn__style}>
          <Text style={styles.btntxt_style}>Continue</Text>
        </TouchableOpacity>
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
      <Provider>
        <Portal>
          <Modal
            visible={visible1}
            onDismiss={hideModal1}
            style={styles.container__style}>
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
          </Modal>
        </Portal>
      </Provider>
      <Provider>
        <Portal>
          <Modal
            visible={visible2}
            onDismiss={hideModal2}
            style={styles.container__style}>
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
          </Modal>
        </Portal>
      </Provider>
      <Provider>
        <Portal>
          <Modal
            visible={visible3}
            onDismiss={hideModal3}
            style={styles.container__style}>
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
          </Modal>
        </Portal>
      </Provider>
      <Provider>
        <Portal>
          <Modal
            visible={visible4}
            onDismiss={hideModal4}
            style={styles.container__style}>
            <TouchableOpacity
              style={styles.imgopt__container}
              onPress={() => takePhotofromCamera4()}>
              <Text style={styles.btn__style}>Take photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imgopt__container}
              onPress={() => choosePhotofromLibrary4()}>
              <Text style={styles.btn__style}>Choose gallery</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
};

export default DocumentUpload;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header__container: {
    paddingHorizontal: widthToDp('5%'),
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
    alignItems:'center',
    height:55
  },
  header__icon: {
    fontSize: widthToDp('7%'),
    color: '#000',
  },
  header__title: {
    fontSize: widthToDp('5%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('5%'),
    color: '#000',
  },
  Vehicleimg__style: {
    // alignSelf: 'center',
    height: 380,
    // width: '100%',
    resizeMode: 'cover',
  },
  upper__title: {
    fontSize: widthToDp('5.5%'),
    fontFamily: 'Montserrat-Medium',
    marginLeft: widthToDp('10%'),
    color: '#000',
  },
  upper__container: {
    paddingBottom: heightToDp('3%'),
  },
  main__content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: heightToDp('3%'),
    // paddingHorizontal: widthToDp('5%'),
  },
  textarea_container: {
    paddingHorizontal: widthToDp('7%'),
    top: 20,
  },
  textarea__style: {
    borderWidth: 0.3,
    height: heightToDp('20%'),
    textAlignVertical: 'top',
    paddingHorizontal: widthToDp('5%'),
    borderRadius: 3,
    backgroundColor: '#f7f7f7',
    borderColor: '#c4c4c4',
    color: '#000',
  },
  continuebtn__style: {
    backgroundColor: '#000000',
    borderColor: '#ecc55b',
    width: '90%',
    alignSelf: 'center',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightToDp('5%'),
  },
  btntxt_style: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
  },
  container__style: {
    backgroundColor: '#fff',
    width: '90%',
    height: heightToDp('30%'),
    marginLeft: widthToDp('5%'),
    marginTop: heightToDp('30%'),
    borderRadius: 16,
    alignItems: 'center',
  },
  imgopt__container: {
    backgroundColor: '#fff',
    borderColor: '#ecc55b',
    width: widthToDp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: heightToDp('1%'),
    marginTop: heightToDp('3%'),
    elevation: 5,
  },
  btn__style: {
    fontSize: widthToDp('4%'),
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  profileimg__container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
