import { Text, View } from 'react-native'
import { styles } from './styles'
import { FONTS } from '../../constans/theme'
import { Divider } from '@rneui/base'
import { MEASU_OPTION } from '../../constans/constans'

interface Props{
	name: string,
	av: number,
	min: number,
	max: number
}

type MeasuView = {
  type: string;
  value: number;
};

export const WeatherCard = ({name, av, min, max}: Props) => {

  const MeasurView = ({type, value}: MeasuView) => {
    return (
      <View style={styles.measur}>
        <Text style={[FONTS.h3, styles.color]}>{type}</Text>
        <Text style={[FONTS.h3, styles.color]}>{value}</Text>  
      </View>
    )
  }

  return (
    <View style={styles.container}>
			<Text style={[FONTS.h2, styles.textCenter]}>{name}</Text>
      <Divider width={0.7}/>
      <View style={styles.rowContainer}>
        <View style={styles.avContainer}>
          <Text style={[FONTS.fontRegular, styles.avText, styles.colorAv]} numberOfLines={1} adjustsFontSizeToFit>{av}°C</Text>
          <Text style={[FONTS.h3, styles.colorAv]} numberOfLines={1} adjustsFontSizeToFit>{MEASU_OPTION.av}</Text>
        </View>
        <View style={styles.measurContainer}>
          <MeasurView type={MEASU_OPTION.min} value={min}/>
          <Divider/>
          <MeasurView type={MEASU_OPTION.max} value={max}/>
        </View>
      </View>
    </View>
  )
}