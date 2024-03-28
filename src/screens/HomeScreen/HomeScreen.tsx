import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constans/theme';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { BUTTON_OPTION, ICON_NAME, MEASUREMENT, SCREEN_NAV } from '../../constans/constans';
import CustomButton from '../../components/CustomButton/CustomButton';
import { place } from '../../constans/information';

interface Props extends StackScreenProps<any,any>{}

export const HomeScreen = ({route, navigation}: Props) => {
  return(
    <ScrollView style={styles.container}>
      <View style={styles.containerImg}>
        <Image source={require('../../assets/images/imagenMarte1.jpg')} style={styles.img}/>
        <View style={styles.tempContainer}>
          <View style={styles.celsiusContainer}>
            <Text style={[styles.textTemp, {color: 'white'}]}>-58</Text>
            <Text style={[FONTS.h1, styles.fixMargin, {color: 'white'}]}>°C</Text>
          </View>
          <Text style={[FONTS.h2, {color: 'white'}]}>Sol 325</Text>
        </View>
        <View style={styles.footerImg}>
          <Icon name={ICON_NAME.camera} color={COLORS.white} size={SIZES.icon1} onPress={() => navigation.navigate(SCREEN_NAV.dailyImg)}/>
          <Text style={[FONTS.h2, styles.textPlace, {color: COLORS.gray}]}>{place}</Text>
        </View>
      </View>
      <View style={styles.menuIconContainer}>
        <Icon name={ICON_NAME.menu} color={COLORS.white} size={SIZES.icon1} onPress={() => navigation.openDrawer()}/>
      </View>
      <LinearGradient
        colors={[COLORS.darkBlue, COLORS.orange]}
        start={{x: 0.5, y: 0.5}}
        style={styles.linearGradient}
      >
        <WeatherCard name={MEASUREMENT.temper} av={51} min={-74} max={74}/>
        <WeatherCard name={MEASUREMENT.pr} av={51} min={-74} max={74}/>
        <WeatherCard name={MEASUREMENT.wind} av={51} min={-74} max={74}/>
        <CustomButton 
          text={BUTTON_OPTION.historial}
          color={COLORS.blue}
          onPress={() => navigation.navigate(SCREEN_NAV.historial)}/>
      </LinearGradient>
    </ScrollView>
  );
};
