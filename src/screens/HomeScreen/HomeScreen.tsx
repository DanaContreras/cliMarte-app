import React from 'react';
import {ActivityIndicator, Image, ScrollView, StatusBar, Text, useWindowDimensions, View} from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../../constans/theme';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { WeatherCard } from '../../components/WeatherCard/WeatherCard';
import { BUTTON_OPTION, ICON_NAME, MEASUREMENT, SCREEN_NAV } from '../../constans/constans';
import CustomButton from '../../components/CustomButton/CustomButton';
import { place } from '../../constans/information';
import { useDailyImageViewModel } from '../../viewModels/useDailyImageViewModel';
import { useWeatherHomeViewModel } from '../../viewModels/useHomeViewModel';
import * as Animatable from 'react-native-animatable';

interface Props extends StackScreenProps<any,any>{}

export const HomeScreen = ({navigation}: Props) => {
  const { dailyImage, error } = useDailyImageViewModel();
  const { weatherToday, loading } = useWeatherHomeViewModel();
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width;

  return(
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle='light-content' />
      <View style={styles.containerImg}>
        {error || dailyImage == null || dailyImage.media_type != 'image' ?
          <Image source={require('../../assets/images/imagenMarte1.jpg')} style={isPortrait? styles.imgPortrait : styles.imgLandscape}/>
          :
          <Image source={{ uri: dailyImage.url }} style={isPortrait? styles.imgPortrait : styles.imgLandscape} />
        }
        <View style={isPortrait? styles.tempContainer : styles.tempContainerLandscape}>
          <View style={styles.celsiusContainer}>
            <Animatable.Text animation='pulse' iterationCount='infinite' iterationDelay={1000} style={[styles.textTemp, {color: 'white'}]}>
              {loading? 0 : (Math.round(weatherToday.AT.av))}
            </Animatable.Text>
            <Text style={[FONTS.h1, styles.fixMargin, {color: 'white'}]}>°C</Text>
          </View>
          <Text style={[FONTS.h2, {color: 'white'}]}>{loading? ('-') : (`Sol ${weatherToday.sol}`)}</Text>
        </View>
        <View style={isPortrait? styles.footerImg : styles.footerImgLandscape}>
          <Icon name={ICON_NAME.camera} color={COLORS.white} size={SIZES.icon2} onPress={() => navigation.navigate(SCREEN_NAV.dailyImg)}/>
          <Text style={[FONTS.h2, styles.textPlace]}>{place}</Text>
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
        {loading? (
          <ActivityIndicator size='large'/>
          ) : (
          <View>
            <WeatherCard name={MEASUREMENT.temper} av={weatherToday.AT.av} min={weatherToday.AT.mn} max={weatherToday.AT.mx}/>
            <WeatherCard name={MEASUREMENT.pr} av={weatherToday.PRE.av} min={weatherToday.PRE.mn} max={weatherToday.PRE.mx}/>
            <WeatherCard name={MEASUREMENT.wind} av={weatherToday.HWS.av} min={weatherToday.HWS.mn} max={weatherToday.HWS.mx}/>
            <CustomButton 
              text={BUTTON_OPTION.historial}
              color={COLORS.blue}
              onPress={() => navigation.navigate(SCREEN_NAV.historial)}
            />
          </View>
          )
        }
      </LinearGradient>
    </ScrollView>
  );
};
