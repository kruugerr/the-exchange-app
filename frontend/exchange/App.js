import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { AuthProvider, AuthContext } from './src/navigation/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    const [fontsLoaded] = useFonts({
        'MagicRetro': require('./assets/fonts/MagicRetro.ttf'),
        'SuperMagic': require('./assets/fonts/SuperMagic.ttf'),
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0D4F4F" />;
    }

    return (
        <AuthProvider>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
        </AuthProvider>
    );
}

// Handles login status check and decides what to render
const AppContent = () => {
    const { userToken, login } = useContext(AuthContext);
    const [checkingToken, setCheckingToken] = React.useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) login(token);
            setCheckingToken(false);
        };
        checkLoginStatus();
    }, []);

    if (checkingToken) {
        return <ActivityIndicator size="large" color="#0D4F4F" />;
    }

    return <AppNavigator />;
};
