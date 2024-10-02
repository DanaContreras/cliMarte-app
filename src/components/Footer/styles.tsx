import React from 'react';
import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: SIZES.margin * 2,
	},
	icon: {
		fontSize: SIZES.bigIcon,
		color: COLORS.white,
		marginBottom: SIZES.margin,
		alignSelf: 'center',
	}
});
