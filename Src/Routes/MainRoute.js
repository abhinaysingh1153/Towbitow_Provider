import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// -----
import Maploading from '../Screens/MainScreens/Maploading';
import DrawerContent from '../Components/DrawerContent';
import Payment from '../Screens/MainScreens/Payment';
import AddCard from '../Screens/MainScreens/AddCard';
import AddFund from '../Screens/MainScreens/AddFund';
import MyWallet from '../Screens/MainScreens/MyWallet';
import BookingList from '../Screens/MainScreens/BookingList';
import BookingDetail from '../Screens/MainScreens/BookingDetail';
import Setting from '../Screens/MainScreens/Setting';
import EditProfile from '../Screens/MainScreens/EditProfile';
import BusinessProfile from '../Screens/MainScreens/BusinessProfile';
import Review from '../Screens/MainScreens/Review';
import TransactionHistory from '../Screens/MainScreens/TransactionHistory';
import Legal from '../Screens/MainScreens/Legal';
import RouteMap from '../Screens/MainScreens/RouteMap';
import Feedback from '../Screens/MainScreens/Feedback';
import Profile from '../Screens/MainScreens/Profile';
import PaymentSuccess from '../Screens/MainScreens/PaymentSuccess';


const mainstack = createDrawerNavigator();

const Authroute = () => {
  return (
    <mainstack.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName="Maploading">
      <mainstack.Screen
        name="Maploading"
        component={Maploading}
        options={{unmountOnBlur: true}}
      />
      <mainstack.Screen name="Payment" component={Payment} />
      <mainstack.Screen name="AddCard" component={AddCard} />
      <mainstack.Screen name="AddFund" component={AddFund} />
      <mainstack.Screen name="MyWallet" component={MyWallet} />
      <mainstack.Screen name="BookingList" component={BookingList} />
      <mainstack.Screen name="BookingDetail" component={BookingDetail} />
      <mainstack.Screen name="Setting" component={Setting} />
      <mainstack.Screen name="EditProfile" component={EditProfile} />
      <mainstack.Screen name="BusinessProfile" component={BusinessProfile} />
      <mainstack.Screen name="Review" component={Review} />
      <mainstack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
      />
      <mainstack.Screen name="Legal" component={Legal} />
      <mainstack.Screen name="RouteMap" component={RouteMap} />
      <mainstack.Screen name="feedback" component={Feedback} />
      <mainstack.Screen name="Profile" component={Profile} />
      <mainstack.Screen name="PaymentSuccess" component={PaymentSuccess} />
    </mainstack.Navigator>
  );
};

export default Authroute;
