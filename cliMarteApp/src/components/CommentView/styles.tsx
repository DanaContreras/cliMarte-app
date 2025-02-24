import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constans/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
  },
  containerIcon: {
    flex: 0.7,
    width: '30%',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  containerComment: {
    flex: 2,
    padding: SIZES.padding,
  },
  circle: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 110,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  comment: {
    paddingVertical: SIZES.padding,
  },
});
