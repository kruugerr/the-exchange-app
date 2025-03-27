import React, { useContext } from 'react';
import { AuthContext } from '../navigation/AuthContext';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';

const AppNavigator = () => {
    const { userToken } = useContext(AuthContext);
    return userToken ? <MainTabNavigator /> : <AuthStack />;
};

export default AppNavigator;