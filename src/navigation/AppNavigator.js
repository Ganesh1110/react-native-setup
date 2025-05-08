import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Simple tab navigator (no auth checks)
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{title: 'Home Tab'}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Profile Tab'}}
    />
  </Tab.Navigator>
);

// Simplified stack navigator
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Main"
      component={MainTabs}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AppNavigator;
