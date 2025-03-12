import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './src/navigation/AuthStack';
import MainFeed from './src/screens/MainFeed';
import { useFonts } from 'expo-font';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [fontsLoaded] = useFonts({
        'MagicRetro': require('./assets/fonts/MagicRetro.ttf'),
        'SuperMagic': require('./assets/fonts/SuperMagic.ttf'),
    });

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setIsLoggedIn(!!token); // Convert token to boolean (true if token exists)
        };

        checkLoginStatus();
    }, []);

    if (!fontsLoaded || isLoggedIn === null) {
        return <ActivityIndicator size="large" color="#0D4F4F" />;
    }

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainFeed /> : <AuthStack />}
        </NavigationContainer>
    );
}
