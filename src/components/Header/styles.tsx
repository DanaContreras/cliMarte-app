import { StyleSheet } from 'react-native';
import { SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: SIZES.padding,
		paddingTop: SIZES.padding * 3,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	containerText: {
		paddingLeft: SIZES.padding
	}
});
