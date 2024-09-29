import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { Divider } from '@rneui/base';
import { FONTS } from '../../constans/theme';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { MEASUREMENT, MEASU_OPTION } from '../../constans/constans';

interface Props {
  sol: number,
  temper: number,
  minTemper: number,
  maxTemper: number,
  pr: number,
  minPr: number,
  maxPr: number,
  wind: number,
  minWind: number,
  maxWind: number
}

interface MeasurementView {
  name: string,
  av: number,
  min: number,
  max: number
}

const SolCard = memo(({
  sol,
  temper,
  minTemper,
  maxTemper,
  pr,
  minPr,
  maxPr,
  wind,
  minWind,
  maxWind,
}: Props) => {
 
  const MeasurementView = ({name, av, min, max}: MeasurementView) => {
    return(
      <View style={styles.indivMeasuContainer}>
        <View style={styles.row}>
          <Text style={[FONTS.body,styles.colorText1]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>{name}</Text>
          <Text style={[FONTS.body, styles.colorText2]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>{av}°C</Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.body,styles.colorText3]}>{MEASU_OPTION.min}</Text>
          <Text style={[FONTS.body,styles.colorText3]}>{min}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[FONTS.body,styles.colorText3]}>{MEASU_OPTION.max}</Text>
          <Text style={[FONTS.body,styles.colorText3]}>{max}</Text>
        </View>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[FONTS.h2, styles.colorText1]}>Sol {sol}</Text>
        <Divider style={styles.divider}/>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.tempContainer}>
          <WeatherCard name={MEASUREMENT.temper} av={temper} min={minTemper} max={maxTemper}/>
        </View>
        <View style={styles.measuContainer}>
          <MeasurementView name={MEASUREMENT.pr} av={pr} min={minPr} max={maxPr}/>
          <MeasurementView name={MEASUREMENT.wind} av={wind} min={minWind} max={maxWind}/>
        </View>
      </View>
    </View>
  );
});

export default SolCard;
