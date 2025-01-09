import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import axios from '../../Components/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import HTML from 'react-native-render-html';

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

const Legal = () => {
  const navigation = useNavigation();

  // state management.

  const [legalData, setLegalData] = React.useState('');

  console.log('legalD --', legalData);

  // ----- get legal data ---

  const getLegal = async () => {
    try {
      const res = await axios.get('getLegal');
      setLegalData(res.data.data[0]);
      
    } catch (err) {
      console.log('get legal err --- ', err);
    }
  };

  React.useEffect(() => {
    getLegal();
  }, []);

  return (
    <View style={styles.legal__container}>
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />
      {/* ------- header ------ */}
      <View style={styles.header__container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MIcon name="arrow-back" style={styles.header__icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.header__title}>{legalData.title}</Text>
        </View>
        <View></View>
      </View>
      {/* ------- header end ------ */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: heightToDp('10%')}}>
        <View style={styles.main__container}>
          <View style={styles.upperContainer}>
            <Avatar.Icon icon="feather" size={90} style={styles.avatarStyle} />
          </View>
          <View style={styles.info_content}>
            <HTML
              source={{html: legalData.description || `<p></p>`}}
              contentWidth={useWindowDimensions().width}
              baseFontStyle={{
                fontSize: widthToDp('3%'),
                lineHeight: 20,
                textAlign: 'justify',
                color:'#000'
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Legal;

const styles = StyleSheet.create({
  legal__container:{
    flex:1,
    backgroundColor:'#fff'
  },
  header__container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthToDp('5%'),
    height: 55,
    backgroundColor:'#fff',
    elevation:5
  },
  header__icon: {
    fontSize: widthToDp('7%'),
    color:'#000'
  },
  header__title: {
    fontSize: widthToDp('5%'),
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: widthToDp('5%'),
    color:'#000'
  },
  main__container: {},
  upperContainer: {
    marginTop: heightToDp('5%'),
  },
  avatarStyle: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  info_content: {
    paddingHorizontal: widthToDp('5%'),
    marginTop: heightToDp('5%'),
  },
});
