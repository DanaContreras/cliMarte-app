import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_NAME} from '../../constans/constans';
import {COLORS, FONTS, SIZES} from '../../constans/theme';

interface Props {
  name: string;
  date: string;
  comment: string;
}

export const CommentView = ({name, date, comment}: Props) => {
  const getRandomColor = () => {
    // Genera un número aleatorio entre 0 y 2
    const randomNum = Math.floor(Math.random() * 3);

    let color = '';
    // Dependiendo del número aleatorio, retorna un color
    switch (randomNum) {
      case 0:
        color = COLORS.orange;
        break;
      case 1:
        color = COLORS.lightOrange;
        break;
      case 2:
        color = COLORS.lightBlue;
        break;
    }

    return color;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerIcon}>
        <View style={styles.circle}>
          <Icon
            name={ICON_NAME.alien}
            size={SIZES.bigIcon}
            color={getRandomColor()}
          />
        </View>
      </View>
      <View style={styles.containerComment}>
        <Text style={[FONTS.h2]}>{name}</Text>
        <Text style={[FONTS.body, {color: COLORS.gray}]}>{date}</Text>
        <View style={styles.comment}>
          <Text style={[FONTS.body, {color: COLORS.white}]}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};
