// src/screens/LoginScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import axios from 'axios';

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
        console.log('Login Response:', res.data);

    } catch (error) {
        if (error.response) {
            console.log('Error Response:', error.response.data);
        } else {
            console.log('Error Message:', error.message);
        }
    }
};

  return (
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

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>
    </View>
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
  link:{
    color:'#000',
    fontSize:14,
    textDecorationLine: 'underline'
  },
});

export default LoginScreen;
