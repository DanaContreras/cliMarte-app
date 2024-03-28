import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
  container: {
		flex: 1,
    alignSelf: 'center',
    width: '90%',
		height: '25%',
    marginVertical: SIZES.margin * 2,
		alignItems: 'center',
  },
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute'
	},
	infoContainer: {
		flexDirection: 'row',
		height: '100%',
	},
	tempContainer: {
		width: '67%'
	},
	measuContainer: {
		flex: 1,
		height: '55%',
		alignSelf: 'center',
		justifyContent: 'center'
	},
	indivMeasuContainer: {
		flex: 1,
		width: '100%',
		alignSelf: 'center',
		backgroundColor: 'rgba(1, 1, 22, 0.4)',
		borderRadius: SIZES.radius3,
		padding: SIZES.padding * 0.5,
		marginTop: SIZES.padding * 0.3
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	divider: {
		backgroundColor: COLORS.gray,
		height: 1,
		width: '70%',
		alignSelf: 'center',
	},
	colorText1: {
		color: COLORS.white
	},
	colorText2: {
		color: COLORS.blue
	},
	colorText3: {
		color: COLORS.gray
	}
});
