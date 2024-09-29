import React from 'react';
import {View, Text, FlatList, StatusBar} from 'react-native';
import {SCREEN_NAV, SCREEN_OPTION} from '../../constans/constans';
import {COLORS} from '../../constans/theme';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../HistorialScreen/styles';
import {Header} from '../../components/Header/Header';
import {StackScreenProps} from '@react-navigation/stack';
import SolCard from '../../components/SolCard/SolCard';
import { useHistorialViewModel } from '../../viewModels/useHistorialViewModel';
import { ActivityIndicator } from 'react-native';

interface Props extends StackScreenProps<any, any> {}

export const HistorialScreen = ({navigation}: Props) => {

  const { weatherData, loading, loadMoreWeatherData, hasMore } = useHistorialViewModel();

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color='white'/>
    </View>
    )
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.darkBlue} translucent={true} barStyle='light-content' />
      <LinearGradient
        colors={[COLORS.darkBlue, COLORS.orange]}
        start={{x: 0.5, y: 0.5}}
        style={styles.linearGradient}>
        <FlatList
          data={weatherData}
          renderItem={({item}) => (
            <SolCard
              sol={item.sol}
              temper={Math.round(item.AT.av)}
              minTemper={Math.round(item.AT.mn)}
              maxTemper={Math.round(item.AT.mx)}
              pr={Math.round(item.PRE.av)}
              minPr={Math.round(item.PRE.mn)}
              maxPr={Math.round(item.PRE.mx)}
              wind={Math.round(item.HWS.av)}
              minWind={Math.round(item.HWS.mn)}
              maxWind={Math.round(item.HWS.mx)}
            />
          )}
          keyExtractor={item => item.sol}
          ListHeaderComponent={
            <Header
              title={SCREEN_OPTION.historial}
              onPress={() => navigation.navigate(SCREEN_NAV.home)}
            />
          }
          onEndReached={() => {
            if (hasMore && !loading) loadMoreWeatherData();
          }}
          onEndReachedThreshold={1}
          ListFooterComponent={renderFooter}
        />
      </LinearGradient>
    </View>
  );
};
