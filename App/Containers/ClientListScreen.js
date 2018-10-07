import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { get } from 'lodash'

import ClientList from '../Components/ClientList'
import FloatingButton from '../Components/FloatingButton'
import Button from '../Components/Button'

// Styles
import styles from './Styles/ClientListScreenStyle'
import { Images } from '../Themes';
import Constants from '../Constants/Constants';
import ClientActions from '../Redux/ClientRedux';

class ClientListScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Client List',
    /* No more header config here! */
  };

  _goToFormPage = () => {
    this.props.selectClient(null);
    const { navigation: { navigate } } = this.props;
    const headerTitle = 'Add New Client';
    navigate(Constants.Routes.ClientFormScreen, { headerTitle });
  }

  _goToDetailPage = (client) => {
    this.props.selectClient(client);
    const { navigation: { navigate } } = this.props;
    const headerTitle = client.name || 'Client Detail';
    navigate(Constants.Routes.ClientDetailScreen, { headerTitle });
  }

  render () {
    return (
      <View style={styles.container}>
        <ClientList
          items={this.props.clientList}
          isLoading={false}
          onDetailPress={this._goToDetailPage}
        />
        <FloatingButton
          icon={Images.addPerson}
          onPress={this._goToFormPage}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clientList: state.client.clients
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewClient: (newClient) => dispatch(ClientActions.addNewClient(newClient)),
    selectClient: (client) => dispatch(ClientActions.selectClient(client)),
    clearAll: () => dispatch(ClientActions.clearAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientListScreen)
