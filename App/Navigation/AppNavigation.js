import { StackNavigator } from 'react-navigation'
import ClientDetailScreen from '../Containers/ClientDetailScreen'
import ClientFormScreen from '../Containers/ClientFormScreen'
import ClientListScreen from '../Containers/ClientListScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import Constants from '../Constants/Constants'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ClientDetailScreen: { screen: ClientDetailScreen },
  ClientFormScreen: { screen: ClientFormScreen },
  ClientListScreen: { screen: ClientListScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: Constants.INITIAL_ROUTE_NAME,
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle
  }
})

export default PrimaryNav
