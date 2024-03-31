import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SCREEN_NAV, SCREEN_OPTION} from '../../constans/constans';
import {COLORS} from '../../constans/theme';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../HistorialScreen/styles';
import {Header} from '../../components/Header/Header';
import {StackScreenProps} from '@react-navigation/stack';
import SolCard from '../../components/SolCard/SolCard';

interface Props extends StackScreenProps<any, any> {}

const data = [
  {
    id: 1,
    sol: 568,
    temper: -58,
    minTemper: -74,
    maxTemper: 74,
    pr: 58,
    minPr: -74,
    maxPr: 74,
    wind: 58,
    minWind: 74,
    maxWind: 74,
  },
  {
    id: 2,
    sol: 567,
    temper: -58,
    minTemper: -74,
    maxTemper: 74,
    pr: 58,
    minPr: -74,
    maxPr: 74,
    wind: 58,
    minWind: 74,
    maxWind: 74,
  },
  {
    id: 3,
    sol: 566,
    temper: -58,
    minTemper: -74,
    maxTemper: 74,
    pr: 58,
    minPr: -74,
    maxPr: 74,
    wind: 58,
    minWind: 74,
    maxWind: 74,
  },
  {
    id: 4,
    sol: 565,
    temper: -58,
    minTemper: -74,
    maxTemper: 74,
    pr: 58,
    minPr: -74,
    maxPr: 74,
    wind: 58,
    minWind: 74,
    maxWind: 74,
  },
];

export const HistorialScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.darkBlue, COLORS.orange]}
        start={{x: 0.5, y: 0.5}}
        style={styles.linearGradient}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <SolCard
              sol={item.sol}
              temper={item.temper}
              minTemper={item.minTemper}
              maxTemper={item.maxTemper}
              pr={item.pr}
              minPr={item.minPr}
              maxPr={item.maxPr}
              wind={item.wind}
              minWind={item.minWind}
              maxWind={item.maxWind}
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={
            <Header
              title={SCREEN_OPTION.historial}
              onPress={() => navigation.navigate(SCREEN_NAV.home)}
            />
          }
        />
      </LinearGradient>
    </View>
  );
};
