import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constans/theme';

export const styles = StyleSheet.create({
  drawContainer: {
    paddingTop: 0,
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: SIZES.padding * 2,
  },
  button: {
    width: '100%',
    textAlign: 'left',
  },
  containerButtonEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonEnd: {
    marginBottom: SIZES.margin * 2,
  },
  divider: {
    backgroundColor: COLORS.orange,
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
