import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// theme for the application

export const COLORS = {
    darkBlue: 'rgb(1, 1, 22)',
    blue: 'rgb(60, 71, 103)',
    lightBlue: 'rgb(85, 97, 135)',
    gray: 'rgb(135, 135, 143)',
    lightOrange: 'rgb(236, 141, 85)',
    orange: 'rgb(212, 100, 34)',
    white: 'rgb(255, 255, 255)',
    black: 'rgb(0,0,0)',
    transparent: 'transparent'
}

export const SIZES = {
    // global sizes
    padding: 15,
    margin: 15,
    radius1: 90,
    radius2: 50,
    radius3: 20,

    // font sizes
    h1: 28,
    h2: 24,
    h3: 18,
    body: 15,
    number1: 96,
    number2: 50,

    // icon sizes
    icon1: 40,

    // app dimensions
    width,
    height
}

export const FONTS = {
    h1: { fontFamily: 'LeagueSpartan-Bold', fontSize: SIZES.h1, lineHeight: 36, color: COLORS.white },
    h2: { fontFamily: 'LeagueSpartan-Bold', fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: 'LeagueSpartan-SemiBold', fontSize: SIZES.h3, lineHeight: 22 },
    body: { fontFamily: 'LeagueSpartan-Regular', fontSize: SIZES.body, lineHeight: 30 },
    fontRegular: {fontFamily: 'LeagueSpartan-Regular'},
};