// App.js
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

export default function App() {
    const [fontsLoaded] = useFonts({
        'MagicRetro': require('./assets/fonts/MagicRetro.ttf'),
        'SuperMagic': require('./assets/fonts/SuperMagic.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0D4F4F" />;
    }

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}
