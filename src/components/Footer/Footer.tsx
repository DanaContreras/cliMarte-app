import React from 'react';
import {Linking, Text, View} from 'react-native';
import {copyright, developer} from '../../constans/information';
import {FONTS} from '../../constans/theme';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ICON_NAME } from '../../constans/constans';
import { developerLink } from '../../constans/information';

export const Footer = () => {

	const handlePress = (url: string) => {
		Linking.openURL(url);
	};

  return (
    <View style={styles.container}>
      <View>
				<Icon name={ICON_NAME.github} style={styles.icon} onPress={() => handlePress(developerLink)}/>
				<Text style={FONTS.body}>{developer}</Text>
			</View>
      <Text style={FONTS.body}>{copyright}</Text>
    </View>
  );
};
