import React, { Component } from 'react'
import { ScrollView, Alert, Image, View, Linking } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';

// Styles
import styles from './Styles/ClientDetailScreenStyle'
import { Images } from '../Themes';
import TextInfo from '../Components/TextInfo';
import Button from '../Components/Button';
import ClientActions from '../Redux/ClientRedux';
import { resetNavigator } from '../Utils/NavigationUtils'
import Constants from '../Constants/Constants';

class ClientDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('headerTitle', 'Client Detail'),
    /* No more header config here! */
  });

  _openWhatsapp = () => {
    const { whatsappNumber } = this.props.client;
    const number = whatsappNumber.replace('+', '');
    const uri = `https://wa.me/${number}`;
    Linking.openURL(uri);
  }

  _openCall = () => {
    const { phoneNumber } = this.props.client;
    const uri = `tel:${phoneNumber}`;
    Linking.openURL(uri);
  }

  _openEmail = () => {
    const { emailAddress } = this.props.client;
    const uri = `mailto:${emailAddress}`;
    Linking.openURL(uri);
  }

  _renderNameInfo = (name) => (
    <TextInfo
      labelText={'Client Name'}
      valueText={name}
    />
  )

  _renderWhatsappInfo = (whatsappNumber) => (
    <TextInfo
      labelText={'Whatsapp Number'}
      valueText={whatsappNumber}
      buttonIcon={Images.whatsappIcon}
      buttonPressHandler={this._openWhatsapp}
    />
  )

  _renderEmailInfo = (emailAddress) => (
    <TextInfo
      labelText={'Email Address'}
      valueText={emailAddress}
      buttonIcon={Images.mailIcon}
      buttonPressHandler={this._openEmail}
    />
  )

  _renderPhoneInfo = (phoneNumber) => (
    <TextInfo
      labelText={'Phone Number'}
      valueText={phoneNumber}
      buttonIcon={Images.callIcon}
      buttonPressHandler={this._openCall}
    />
  )

  _removeClient = () => {
    const { phoneNumber, name } = this.props.client;
    this.props.removeClient(phoneNumber);
    const toastText = `${name} successfuly removed from client list.`;
    Toast.show(toastText, Toast.SHORT);
    resetNavigator(this.props.navigation);
  }

  _showRemoveClientModal = () => {
    Alert.alert(
      'Client Manager',
      'Are you sure want to remove this client??',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: this._removeClient},
      ],
      { cancelable: true }
    )
  }

  _goToFormPage = () => {
    const { navigation: { navigate } } = this.props;
    const headerTitle = 'Update Client';
    navigate(Constants.Routes.ClientFormScreen, { headerTitle });
  }

  render () {
    const { name, emailAddress, phoneNumber, whatsappNumber, avatar } = this.props.client;
    const avatarUri = avatar ? { uri: avatar } : Images.defaultAvatar;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatarImageStyle} source={avatarUri}/>
          </View>
          {name && this._renderNameInfo(name)}
          {emailAddress && this._renderEmailInfo(emailAddress)}
          {phoneNumber && this._renderPhoneInfo(phoneNumber)}
          {whatsappNumber && this._renderWhatsappInfo(whatsappNumber)}
          <Button onPress={this._goToFormPage} >
            {'Edit Client'}
          </Button>
          <Button onPress={this._showRemoveClientModal} >
            {'Remove Client'}
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    client: state.client.selectedClient
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeClient: (clientPhoneNumber) => dispatch(ClientActions.removeClient(clientPhoneNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetailScreen)
