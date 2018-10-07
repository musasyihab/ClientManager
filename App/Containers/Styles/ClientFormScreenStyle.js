import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ultraLightGrey,
    padding: Metrics.baseMargin
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarBtnStyle: {
    width: 150,
    height: 150,
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  }
}
