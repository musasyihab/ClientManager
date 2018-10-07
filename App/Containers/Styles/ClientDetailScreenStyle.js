import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default {
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.ultraLightGrey,
    padding: Metrics.baseMargin
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Metrics.baseMargin,
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
  avatarContainer: {
    padding: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60
  }
}
