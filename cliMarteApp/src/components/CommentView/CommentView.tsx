import React, { useEffect, useState } from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ICON_NAME} from '../../constans/constans';
import {COLORS, FONTS, SIZES} from '../../constans/theme';

interface Props {
  name: string;
  date: Date;
  comment: string;
}

export const CommentView = ({name, date, comment}: Props) => {

  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(getTimeAgo(new Date(date)));

    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(new Date(date)));
    }, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  const getRandomColor = () => {
    const randomNum = Math.floor(Math.random() * 3);
    let color = '';
    
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

  const getTimeAgo = (commentDate: Date): string => {
    const now = new Date();
    const elapsed = now.getTime() - commentDate.getTime();
    const minutes = Math.floor(elapsed / (1000 * 60));
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 365.25));

    if (minutes < 1) {
        return 'Hace unos segundos';
    } else if (minutes < 60) {
        return 'Hace unos minutos';
    } else if (hours < 24) {
        return 'Hace unas horas';
    } else if (days < 7) {
        return days === 1 ? 'Hace un día' : 'Hace unos días';
    } else if (weeks < 4) {
        return weeks === 1 ? 'Hace una semana' : 'Hace unas semanas';
    } else if (months < 12) {
        return months === 1 ? 'Hace un mes' : 'Hace unos meses';
    } else {
        return years === 1 ? 'Hace un año' : 'Hace mucho tiempo';
    }
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
        <Text style={[FONTS.body, {color: COLORS.gray}]}>{timeAgo}</Text>
        <View style={styles.comment}>
          <Text style={[FONTS.body, {color: COLORS.white}]}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};
