// src/screens/LoginScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Animated, StyleSheet, Keyboard } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handleLogin = async () => {
    try {
        const res = await axios.post('http://172.20.10.2:5002/api/auth/login', {
            email,
            password,
        });

        const token = res.data.token

        console.log('Login Sucessful:', res.data);

        await AsyncStorage.setItem('userToken', token);

        navigation.reset({
          index:0,
          routes:[{name:"MainFeed"}],
        });

    } catch (error) {
        if (error.response) {
            console.log('Error Response:', error.response.data);
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
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />

        <TextInput 
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize='none'
        />

        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleLogin}>
          <Animated.View style={[styles.button, {transform: [{scale: scaleAnim}]}]}>
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.linkContainer}>
          <Text style={styles.link}>Create new account</Text>
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
    padding:20,
  },
  title: {
    fontSize: 56,
    color:'#01204E',
    fontFamily:'SuperMagic',
    marginBottom: 20,
  },
  input: {
    width: '92%',
    backgroundColor:'#fff',
    padding:15,
    borderRadius:10,
    marginBottom: 15,
    fontSize:16,
  },
  button:{
    backgroundColor:'#0d4f4f',
    padding:15,
    borderRadius:10,
    width:'92%',
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

export default LoginScreen;
