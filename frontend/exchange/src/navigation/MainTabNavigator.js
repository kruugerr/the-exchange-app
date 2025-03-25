import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainFeedScreen from '../screens/MainFeedScreen';
import SavedScreen from '../screens/SavedScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return(
        <Tab.Navigator
        initialRouteName='Feed'
        screenOptions={({route}) => ({
            headerShown:false,
            tabBarIcon: ({color, size}) => {
                let iconName;

                if(route.name === 'Feed'){
                    iconName = 'home-outline';
                } else if (route.name === 'Saved'){
                    iconName = 'bookmark-outline';
                } else if(route.name === 'Messages'){
                    iconName = 'chatbubble-outline';
                } else if (route.name === 'Profile'){
                    iconName = 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0D4F4F',
            tabBarInactiveTintColor: 'gray',
        })}
        >
            <Tab.Screen name='Feed' component={MainFeedScreen} />
            <Tab.Screen name='Saved' component={SavedScreen} />
            <Tab.Screen name='Messages' component={MessagesScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;