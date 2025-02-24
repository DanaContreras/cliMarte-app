import { View } from 'react-native';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import Menu from './navigation/Menu/Menu';

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
