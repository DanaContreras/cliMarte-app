import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
	container: {
		
	},
	input: {
		borderRadius: SIZES.radius2,
		backgroundColor: COLORS.blue,
		width: 300,
    marginTop: SIZES.margin,
    paddingHorizontal: SIZES.padding,
    color: COLORS.white,
	},
  inputComment: {
    borderRadius: SIZES.radius3,
    backgroundColor: COLORS.lightBlue,
    textAlignVertical: 'top',
    height: 300,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.margin,
  },
  error: {
    paddingHorizontal: SIZES.padding
  },
});
