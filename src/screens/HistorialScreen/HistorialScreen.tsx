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
          initialNumToRender={4}
          renderItem={({item}) => (
            <SolCard
              sol={item.sol}
              temper={item.AT.av}
              minTemper={item.AT.mn}
              maxTemper={item.AT.mx}
              pr={item.PRE.av}
              minPr={item.PRE.mn}
              maxPr={item.PRE.mx}
              wind={item.HWS.av}
              minWind={item.HWS.mn}
              maxWind={item.HWS.mx}
            />
          )}
          keyExtractor={(item) => item.sol}
          ListHeaderComponent={
            <Header
              title={SCREEN_OPTION.historial}
              onPress={() => navigation.navigate(SCREEN_NAV.home)}
            />
          }
          onEndReached={() => {
            if (hasMore && !loading) loadMoreWeatherData();
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={renderFooter}
        />
      </LinearGradient>
    </View>
  );
};
