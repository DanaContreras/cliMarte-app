import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedLogo } from '../../../components/AnimatedLogo/AnimatedLogo';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { COLORS } from '../../../constans/theme';
import { styles } from './styles';
import { SCREEN_NAV, SCREEN_OPTION } from '../../../constans/constans';
import { Divider } from '@rneui/base';

interface MenuButton {
  title: string,
  screenNav: string
}

export const MenuContent = ({navigation}: DrawerContentComponentProps) => {

  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  const MenuButton = ({title, screenNav}: MenuButton) => {
    return (
      <CustomButton
        text={title}
        onPress={() => navigation.navigate(screenNav)}
        color={COLORS.transparent}
        style={styles.button}
        textStyle={styles.button}
      />
    );
  }

  return (
    <DrawerContentScrollView contentContainerStyle={styles.drawContainer}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[COLORS.darkBlue, COLORS.blue]}
          start={{x: 0.5, y: 0.6}}
          style={styles.linearGradient}>
          <View style={styles.logoContainer}>
            <AnimatedLogo height={180} width={180} autoplay loop/>
          </View>
          <View style={styles.container}>
            <MenuButton title={SCREEN_OPTION.home} screenNav={SCREEN_NAV.home}/>
            <MenuButton title={SCREEN_OPTION.historial} screenNav={SCREEN_NAV.historial}/>
            <MenuButton title={SCREEN_OPTION.dailyImg} screenNav={SCREEN_NAV.dailyImg}/>
            <View style={styles.containerButtonEnd}>
              <Divider style={isPortrait? styles.divider : styles.dividerLandscape} />
              <CustomButton
                text={SCREEN_OPTION.aboutUs}
                onPress={() => navigation.navigate(SCREEN_NAV.aboutUs)}
                color={COLORS.transparent}
                style={[styles.button, styles.buttonEnd]}
                textStyle={styles.button}
              />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </DrawerContentScrollView>
  );
};
