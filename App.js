import React, {useReducer, useMemo, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './Src/Components/AuthContext';

import Splash from './Src/Screens/AuthScreens/Splash';
import AuthRoute from './Src/Routes/AuthRoute';
import MainRoute from './Src/Routes/MainRoute';

const App = () => {
  // initial State.

  let initialState = {
    isLoading: true,
    userToken: null,
  };

  // Auth Reducer.

  const authReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          userToken: null,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoading: false,
          userToken: action.userToken,
        };
    }
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Auth Memo.

  const authContext = useMemo(() => ({
    login: async userToken => {
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userToken));
        dispatch({type: 'LOGIN', userToken});
      } catch (err) {
        console.log('log ---- err ', err);
      }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('userData');
        dispatch({type: 'LOGOUT'});
      } catch (err) {}
    },
  }));

  // Retrieve Token.

  useEffect(() => {
    const retrieve_Token = async () => {
      const userToken = await AsyncStorage.getItem('userData');
      dispatch({
        type: 'RETRIEVE_TOKEN',
        userToken: userToken ? JSON.parse(userToken) : null,
      });
    };
    setTimeout(() => {
      retrieve_Token();
    }, 1000);
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.userToken == null ? <AuthRoute /> : <MainRoute />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
