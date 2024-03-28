import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './navigation/Menu/Menu';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle='light-content' />
      <NavigationContainer>
        <Menu/>
      </NavigationContainer>
    </View>
  );
}

export default App;
