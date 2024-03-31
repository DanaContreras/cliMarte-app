import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ICON_NAME } from '../../constans/constans';
import { COLORS, FONTS, SIZES } from '../../constans/theme';
import { styles } from './styles';

interface Props {
	title: string,
	onPress: () => void
}

export const Header = ({title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Icon
        name={ICON_NAME.arrow}
        color={COLORS.white}
        size={SIZES.icon1}
        onPress={onPress}
      />
			<View style={styles.containerText}>
				<Text style={[FONTS.h1, {color: COLORS.white}]}>
					{title}
				</Text>
			</View>
    </View>
  );
};