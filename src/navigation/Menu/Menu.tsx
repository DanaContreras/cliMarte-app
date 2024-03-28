import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { DailyImageScreen } from '../../screens/DailyImageScreen/DailyImageScreen';
import { MenuContent } from './MenuContent/MenuContent';
import { COLORS } from '../../constans/theme';
import { SCREEN_NAV } from '../../constans/constans';
import { HistorialScreen } from '../../screens/HistorialScreen/HistorialScreen';

const Drawer = createDrawerNavigator();

const Menu = () => {
  return (
    <Drawer.Navigator
      drawerContent={ (props) => <MenuContent {...props}/>}
      screenOptions={{
        overlayColor: 'transparent',
        drawerType: 'slide',
        headerShown: false,

        // headerStyle: {elevation:0, backgroundColor:"transparent"}
      }
    }
    >
        <Drawer.Screen name={SCREEN_NAV.home} component={HomeScreen}/>
        <Drawer.Screen name={SCREEN_NAV.historial} component={HistorialScreen}/>
        <Drawer.Screen name={SCREEN_NAV.dailyImg} component={DailyImageScreen}/>
    </Drawer.Navigator>
  )
}

export default Menu
