import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constans/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    padding: SIZES.padding * 2,
    paddingTop: 0,
    alignItems: 'center',
  },
  divider: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.white,
    marginTop: SIZES.margin * 4,
  },
  questionContainer: {
	  marginTop: SIZES.margin * 4,
  },
  linkText: {
    color: COLORS.lightOrange,
    textDecorationLine: 'underline',
    marginTop: SIZES.margin,
  }
});
