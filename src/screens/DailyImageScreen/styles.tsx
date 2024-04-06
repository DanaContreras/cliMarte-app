import {StyleSheet} from 'react-native';
import { COLORS, SIZES } from '../../constans/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInfo: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 2,

  },
  containerImg: {
    flex: 1,
    width: '100%',
    height: 300,
  },
  containerInfoText: {
    paddingVertical: SIZES.padding * 2
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  titleText: {
    color: COLORS.lightOrange,
    alignSelf: 'center',
    textAlign: 'center'
  },
  infoText: {
    color: COLORS.gray
  },
  containerComment: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  noCommentsText: {
    color: COLORS.gray,
    alignSelf: 'center',
  },
  divider: {
    color: COLORS.white,
    width: '80%',
    alignSelf: 'center',
    margin: SIZES.margin
  },
});