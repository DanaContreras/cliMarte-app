import {Dimensions, StyleSheet} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constans/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    marginTop: (-SIZES.margin * 3),
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES. padding * 2,
    borderTopLeftRadius: SIZES.radius2,
    borderTopRightRadius: SIZES.radius2,
  },
	containerImg: {
		flex: 1,
	},
  imgPortrait: {
    width: SIZES.width,
    height: SIZES.width * 1.8,
  },
  imgLandscape: {
    width: '100%',
    height: height + 50
  },
  footerImg: {
    position: 'absolute',
    top: SIZES.height / 1.28,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerImgLandscape: {
    position: 'absolute',
    top: height - 70,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuIconContainer: {
    position: 'absolute',
    top: SIZES.padding * 3,
    left: SIZES.padding
  },
  tempContainer: {
    position: 'absolute',
    top: SIZES.height / 3,
    left: 0,
    right: 0,
    alignContent: 'center',
    alignItems: 'center',
  },
  tempContainerLandscape: {
    position: 'absolute',
    top: height / 3,
    left: 0,
    right: 0,
    alignContent: 'center',
    alignItems: 'center',
  },
  celsiusContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  textTemp: {
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: SIZES.number1,
  },
  fixMargin: {
    marginTop: 30,
  },
  textPlace: {
    margin: 10,
    color: COLORS.gray
  },
});
