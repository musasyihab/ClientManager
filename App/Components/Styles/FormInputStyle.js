import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.smallMargin
  },
  labelStyle: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    marginBottom: Metrics.smallMargin
  },
  inputStyle: {
    backgroundColor: Colors.white,
    color: Colors.darkGrey,
    padding: Metrics.baseMargin,
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
  errorStyle: {
    color: Colors.red,
    fontSize: 12,
    paddingLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin
  }
})
