import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../navigation/AuthContext';

const MainFeedScreen = ({ navigation }) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { logout } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          if (!token) {
            logout(); // Redirect if not authenticated
          }
        } catch (error) {
          console.log('Auth check error:', error);
        } finally {
          setIsCheckingAuth(false);
        }
      };

      checkAuth();
    }, [logout])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Remove token
      logout();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0D4F4F" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Main Feed</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default MainFeedScreen;
