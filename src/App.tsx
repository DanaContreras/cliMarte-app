import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './navigation/Menu/Menu';
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Menu/>
      </NavigationContainer>
    </View>
  );
}

export default App;
