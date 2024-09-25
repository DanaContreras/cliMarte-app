import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './navigation/Menu/Menu';
import SplashScreen from 'react-native-splash-screen'
import { useCommentsViewModel } from './viewModels/useCommentsViewModel';

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

  // const { handleAddComment } = useCommentsViewModel();
  // useEffect(() => {
  //   const testFunction = async () => {
      
  //     await handleAddComment('test', 'test', 'test');
  //   };

  //   testFunction();
  // }, []);

  return null;
}

export default App;
