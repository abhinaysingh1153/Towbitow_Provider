import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Ficon from 'react-native-vector-icons/Feather';
import Eicon from 'react-native-vector-icons/Entypo';

import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Components/axios';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {Title} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const TransactionHistory = () => {
  const navigation = useNavigation();
  // state management.

  const [transactionData, setTransactionData] = useState([]);
  const [preloader, setpreloader] = React.useState(false);

  console.log('trans --- ', transactionData);

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

      getWalletHistory(res.data.id);
    } catch (err) {
      console.log('get profile err --- ', err);
    }
  };

  // ----- get profile --

  const getWalletHistory = async uId => {
    try {
      const res = await axios.get('walletHistory', {
        params: {
          id: uId,
        },
      });
      setTransactionData(res.data.data);
    } catch (err) {
      console.log('get trans -- err ', err);
    }
  };

  // time format func ---

  const timeFormat = (date = new Date()) => {
    let dateFormate = new Date(date);

    let hours = dateFormate.getHours();
    let min = dateFormate.getMinutes();

    let result = `${hours < 10 ? `0${hours}` : hours}:${
      min < 10 ? `0${min}` : min
    }`;
    return result;
  };

  React.useEffect(() => {
    getProfile();
  }, []);
  return (
    <View style={styles.main__container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" style={styles.header__icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.header__title}>Transaction History</Text>
        </View>
        <View></View>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}
        showsVerticalScrollIndicator={false}>
        {transactionData.length == 0 ? (
          <ActivityIndicator
            color="red"
            size={40}
            style={{paddingVertical: heightToDp('3%')}}
          />
        ) : transactionData == undefined ? (
          <Text
            style={{
              fontSize: widhtToDp('6%'),
              fontFamily: 'Poppins-SemiBold',
              textTransform: 'capitalize',
              alignSelf: 'center',
              marginTop: heightToDp('5%'),
            }}>
            No Transaction found
          </Text>
        ) : (
          transactionData.map(item => (
            <View key={item.id} style={styles.history__status}>
              <View style={styles.history__container}>
                <View style={styles.historydetail__container}>
                  <TouchableOpacity style={styles.icon__container}>
                    <Ficon
                      name="arrow-up-right"
                      style={styles.transicon__style}
                    />
                  </TouchableOpacity>
                  <View style={styles.text__container}>
                    <Text numberOfLines={1} style={styles.tittle__txt}>{item.remark}</Text>
                    <Text style={styles.des__txt}>{item.via}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.status__container}>
                <Text style={styles.status__txt}>
                  created at {timeFormat(item.created_at)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  main__container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  history__status: {
    paddingHorizontal: widhtToDp('5%'),
    paddingVertical: heightToDp('2%'),
    marginTop: heightToDp('2.5%'),
    backgroundColor: '#fff',
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    // height: '13%',
  },
  history__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightToDp('1.5%'),
  },
  historydetail__container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
  },
  icon__container: {
    backgroundColor: '#58a3d6',
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle__txt: {
    fontSize: widhtToDp('3%'),
    fontWeight:'700',
    
  },
  des__txt: {
    fontSize: widhtToDp('2.5%'),
    color: 'grey',
  },

  icon__style: {
    fontSize: widhtToDp('5%'),
  },
  transicon__style: {
    fontSize: widhtToDp('5%'),
    fontWeight: 'bold',
    color: '#fff',
  },
  status__container: {
    marginTop: heightToDp('1%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  status__txt: {
    fontSize: widhtToDp('2.5%'),
    color: 'grey',
  },
  banktrantxt__style: {
    color: '#000',
  },
  bank__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '40%',
  },
  text__container: {
    width: '100%',
    marginLeft: widhtToDp('3.5%'),
  },
  header__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widhtToDp('5%'),
    height: 55,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 15,
  },
  header__icon: {
    fontSize: widhtToDp('7%'),
    color: '#000',
  },
  header__title: {
    fontSize: widhtToDp('4%'),
    textTransform: 'capitalize',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: widhtToDp('5%'),
    color: '#000',
  },
});
