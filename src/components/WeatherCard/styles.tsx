import React from 'react';
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constans/theme';

const transparentColor = `rgba(${COLORS.darkBlue}, 0.8)`;

export const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignSelf: 'center',
    backgroundColor: 'rgba(1, 1, 22, 0.4)',
    borderRadius: SIZES.radius2,
    padding: SIZES.padding,
    marginVertical: SIZES.margin * 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: SIZES.padding,
  },
  avContainer: {
    alignItems: 'center',
    width: '45%',
  },
  measurContainer: {
    width: '50%',
  },
  measur: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.padding,
  },
  textCenter: {
    alignSelf: 'center',
    color: COLORS.white,
  },
  avText: {
    fontSize: 50,
  },
  color: {
    color: COLORS.gray,
  },
  colorAv: {
    color: COLORS.blue,
  },
});
