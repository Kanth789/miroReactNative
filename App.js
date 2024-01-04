import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './src/screens/SearchScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import FollowersScreen from './src/screens/FollowersScreen';
import SplashScreen from './src/screens/SplashScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name= 'Splash' component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfileScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Followers" component={FollowersScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
