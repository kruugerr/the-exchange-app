// src/screens/RegisterScreen.js
import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Animated, StyleSheet, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../api/api';
import { AuthContext} from '../navigation/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { login } = useContext(AuthContext);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration:100, 
      useNativeDriver:true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleRegister = async () => {
    try {

        const res = await API.post('/auth/register', { first_name: firstName, last_name: lastName, email, password });

        const token = res.data.token;

        await AsyncStorage.setItem('userToken', token);
        login(token);

        console.log('Register Succesful:', res.data);

        setEmailError('');

    } catch (error) {
        if (error.response) {
            console.log('Error Response:', error.response.data);

            if(error.response.data.error === 'Email is already registered'){
              setEmailError('Email is already in use.');
            }
        } else {
            console.log('Error Message:', error.message);
        }
    }
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Exchange</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
        />

        {emailError !== '' && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleRegister}>
          <Animated.View style={[styles.button, {transform: [{scale: scaleAnim}]}]}>
            <Text style={styles.buttonText}>Register</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
          <Text style={styles.link}>Already have an account? Login.</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F5CC8D',
    paddingLeft:20,
    paddingRight:20,
  },
  title: {
    fontSize: 56,
    color:'#01204E',
    fontFamily:'SuperMagic',
    marginBottom: 20,
  },
  input: {
    width: '95%',
    backgroundColor:'#fff',
    paddingHorizontal:15,
    paddingVertical:12,
    borderRadius:20,
    marginBottom: 12,
    fontSize:16,
  },
  errorText: {
    color: '#D8000C',   // Red color for error
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '4%',
    marginBottom: 10,
},
  button:{
    backgroundColor:'#0d4f4f',
    padding:20,
    borderRadius:20,
    width:'95%',
    alignItems:'center',
    marginBottom:20,
  },
  buttonText:{
    color:'#FAA968',
    fontSize:24,
    fontWeight:'bold',
    fontFamily:'SuperMagic',
  },
  linkContainer: {
    position: 'absolute',
    bottom: 30,
    width: '95%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    borderWidth: 2, 
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  linkText:{
    color:'#000',
    fontSize:16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
