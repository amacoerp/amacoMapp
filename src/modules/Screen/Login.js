import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import logowhite from '../../../assets/images/logowhite.png';
import {AuthContext} from '../../components/context';


const LoginScreen = () => {
  
  const [email, setemail] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const {signIn}=React.useContext(AuthContext);

  const FormSubmit = () => {
    signIn(email,Password);

    
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image size={100} source={logowhite} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={email}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={text => setemail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={Password}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true} 
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText} onPress={()=>FormSubmit()}>
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2038',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#1976d2',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#000',
    fontSize: 11,
  },
});

export default LoginScreen;
