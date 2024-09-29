import {StyleSheet} from 'react-native';
import { SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	linearGradient: {
		flex: 1
	},
	infoContainer: {
		flex: 1,
		padding: SIZES.padding * 2,
		paddingTop: 0,
		alignItems: 'center'
	}
});
