import { TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS } from '../../constans/theme';
import { styles } from './styles';

interface Props {
  text: string;
  onPress: () => void;
  disable?: boolean;
  activeOpacity?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
}

const CustomButton = ({
  text,
  onPress,
  disable = false,
  activeOpacity = 0.2,
  color = COLORS.orange,
  style = {},
  textStyle = {},
}: Props) => {

  const getLuminance = (hex: string) => {
    hex = hex.replace(/#/g, '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return (299 * r + 587 * g + 114 * b) / 1000;
  };

  // Función para verificar la luminosidad y establecer el color del texto
  const determineTextColor = (backgroundColor: string) => {
    const luminance = getLuminance(backgroundColor);
    return luminance > 125 ? COLORS.black : COLORS.white;
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.button, style, {backgroundColor: color}]}
      disabled={disable}
      onPress={onPress}>
      <Text style={[FONTS.h3, {color: determineTextColor(color)}, styles.text, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;