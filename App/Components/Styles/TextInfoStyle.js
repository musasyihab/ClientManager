import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: Metrics.baseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    padding: Metrics.smallMargin
  },
  labelStyle: {
    color: Colors.lightGrey,
    fontWeight: 'bold',
    marginBottom: Metrics.smallMargin
  },
  valueStyle: {
    backgroundColor: Colors.white,
    color: Colors.darkGrey
  },
  iconContainer: {
    padding: Metrics.smallMargin
  },
  icon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium
  }
})
