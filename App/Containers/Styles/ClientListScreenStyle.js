import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default {
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ultraLightGrey,
    padding: Metrics.baseMargin
  },
  fab: {
    position: 'absolute',
    bottom: Metrics.baseMargin,
    right: Metrics.baseMargin
  }
}
