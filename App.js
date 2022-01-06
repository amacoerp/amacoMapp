import { Provider } from 'react-redux';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator, StyleSheet,Text } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';
import { AuthContext } from './src/components/context';



import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';
import LoginScreen from './src/modules/Screen/LoginContainer';



export default function App() {
  // const [loading, setloading] = React.useState(true);
  // const [usertoken, setuserToken] = React.useState(null);
  const authContext = React.useMemo(
    () => ({
      signIn: async(userName,password) => {
       let userToken;
       userToken =null;
      
        const url = axios.create({
        baseURL: 'http://www.amacoerp.com/amaco_test/public/api/',
      });
      const data ={
        email:userName,
        password: password,
      }
        try {
          const response = await url.post("/auth/login",data);
          
          
          const { accessToken} = response.data;
          userToken=accessToken;
        
          await AsyncStorage.setItem('userToken', userToken);
         
          
        } catch(e) {
          console.log(e);
          alert(e);
        }
       
       
       dispatch({type:'LOGIN',id:userName,token:userToken})
      },
      signOut: async() => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch(e) {
          console.log(e);
        }
        dispatch({type:'LOGOUT'})
      },
      signUp: () => {
      
      },
    }),
    [],
  );
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
        default:
          return (
            <View style={styles.lvl2}>
              <Text>Null</Text>
            </View>
            );
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  React.useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);
  // if (loading) {
  //   return (
  //     <Provider store={store}>
  //       <NavigationContainer>
  //         <PersistGate
  //           loading={
  //             // eslint-disable-next-line react/jsx-wrap-multilines
  //             <View style={styles.container}>
  //               <ActivityIndicator color={colors.red} />
  //             </View>
  //           }
  //           persistor={persistor}
  //         >
  //           <LoginScreen />
  //         </PersistGate>
  //       </NavigationContainer>
  //     </Provider>
  //   );
  // }
  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? (
        <Provider store={store}>
          <NavigationContainer>
            <PersistGate
              loading={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <View style={styles.container}>
                  <ActivityIndicator color={colors.red} />
                </View>
              }
              persistor={persistor}
            >
              <AppView />
            </PersistGate>
          </NavigationContainer>
        </Provider>
      ) : (
        <LoginScreen />
      )}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
