import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    right: Metrics.fabIconMargin,
    bottom: Metrics.fabIconMargin
  },
  iconContainer: {
    width: Metrics.fabIconSize,
    height: Metrics.fabIconSize,
    borderRadius: Metrics.fabIconBorder,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconImage: {
    width: Metrics.fabIconImageSize,
    height: Metrics.fabIconImageSize
  }
})
