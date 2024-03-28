import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';


export type RootStackParams = {
    HomeScreen: undefined,
    DailyImageScreen: undefined;
    AboutUsScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
    </Stack.Navigator>
  )
};
