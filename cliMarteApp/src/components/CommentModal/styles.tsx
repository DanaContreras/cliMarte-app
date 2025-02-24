import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constans/theme';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(1, 1, 22, 0.8)',
  },
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.darkBlue,
    borderRadius: SIZES.radius2,
    height: 750,
    width: '90%',
  },
  titleContainer: {
    width: '100%',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  textContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    padding: SIZES.padding * 2,
  },
  buttonContainer: {
    marginVertical: SIZES.margin,
  },
});
