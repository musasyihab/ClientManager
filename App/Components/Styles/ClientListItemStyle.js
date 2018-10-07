import { Metrics, Colors } from '../../Themes'

export default {
  row: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    marginBottom: Metrics.baseMargin
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconContainer: {
    padding: Metrics.smallMargin
  },
  icon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium
  },
  avatar: {
    width: Metrics.images.large,
    height: Metrics.images.large,
    borderRadius: Metrics.imageRadius.large,
    resizeMode: 'cover',
    margin: Metrics.baseMargin
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.ultraLightGrey
  },
  name: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    paddingRight: Metrics.baseMargin
  }
}
