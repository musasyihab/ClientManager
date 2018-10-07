import React, { Component, PureComponent } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { isEmpty, get } from 'lodash'
import ImagePicker from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';

// Styles
import styles from './Styles/ClientFormScreenStyle';

import FormInput from '../Components/FormInput';
import Button from '../Components/Button';
import { Images } from '../Themes';

import ClientActions from '../Redux/ClientRedux';
import Constants from '../Constants/Constants';
import { resetNavigator } from '../Utils/NavigationUtils'
import { findClientByPhoneNumber } from '../Utils/ClientUtils'

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ClientFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('headerTitle', 'Client Form'),
    /* No more header config here! */
  });

  constructor(props) {
    super(props);

    const { client, editMode } = props;

    const initialState = {
      clientName: '',
      whatsappNumber: '',
      phoneNumber: '',
      emailAddress: '',
      avatar: null
    };

    this.state = editMode ? {
      clientName: client.name,
      whatsappNumber: client.whatsappNumber,
      phoneNumber: client.phoneNumber,
      emailAddress: client.emailAddress,
      avatar: client.avatar
    } : initialState;
  }

  _validateEmail = (email) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = isEmpty(this.state.emailAddress) || pattern.test(email);
    return isValid;
  }

  _validateForm = () => (
    !isEmpty(this.state.clientName) && !isEmpty(this.state.phoneNumber)
      && this._validateEmail(this.state.emailAddress)
  )

  _onNameChange = (text) => {
    this.setState({ clientName: text });
  }

  _onEmailChange = (text) => {
    this.setState({ emailAddress: text });
  }

  _onPhoneChange = (text) => {
    this.setState({ phoneNumber: text });
  }

  _onWhatsappChange = (text) => {
    this.setState({ whatsappNumber: text });
  }

  _showImagePicker = () => {
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const res = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatar: response.uri
        });
      }
    });
  }

  _checkForExisting = () => {
    const { editMode } = this.props;
    const oldPhoneNumber = get(this.props, 'client.phoneNumber');
    let found;
    let isFound;
    if (editMode) {
      found = findClientByPhoneNumber(this.props.clientList, this.state.phoneNumber);
      isFound = found.phoneNumber !== oldPhoneNumber;
    } else {
      found = findClientByPhoneNumber(this.props.clientList, this.state.phoneNumber);
      isFound = found !== null && found !== undefined;
    }
    if (isFound) {
      Alert.alert(
        'Client Manager',
        'Already found client with this phone number. Update existing?',
        [
          {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: this._submit},
        ],
        { cancelable: true }
      );
    } else {
      this._submit();
    }
  }

  _submit = () => {
    const { clientName, whatsappNumber, avatar, phoneNumber, emailAddress } = this.state;
    const { navigation: { navigate }, editMode } = this.props;
    const oldPhoneNumber = get(this.props, 'client.phoneNumber');
    const payload = {
      name: clientName,
      avatar,
      whatsappNumber: isEmpty(whatsappNumber) ? undefined : whatsappNumber,
      phoneNumber: phoneNumber,
      emailAddress: isEmpty(emailAddress) ? undefined : emailAddress
    };
    let snackbarText;
    if (editMode) {
      this.props.updateClient(oldPhoneNumber, payload);
      snackbarText = `${clientName} successfuly updated as client`;
    } else {
      snackbarText = `${clientName} successfuly added as client`;
      this.props.addNewClient(payload);
    }
    Snackbar.show({
      title: snackbarText,
      duration: Snackbar.LENGTH_SHORT,
    });
    resetNavigator(this.props.navigation);
    this.props.selectClient(payload);
    const headerTitle = clientName || 'Client Detail';
    navigate(Constants.Routes.ClientDetailScreen, { headerTitle });
  }

  _clearData = () => {
    this.props.clearAll();
    resetNavigator(this.props.navigation);
  }

  render () {
    const { clientName, whatsappNumber, avatar, phoneNumber, emailAddress } = this.state;
    const avatarUri = avatar ? { uri: avatar } : Images.defaultAvatar;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatarBtnStyle} onPress={this._showImagePicker}>
              <Image style={styles.avatarImageStyle} source={avatarUri}/>
            </TouchableOpacity>
          </View>
          <FormInput
            placeholder={'Client Name*'}
            onChangeText={this._onNameChange}
            mandatory={true}
            value={clientName}
          />
          <FormInput
            placeholder={'Email Address'}
            onChangeText={this._onEmailChange}
            keyboardType={'email-address'}
            validation={this._validateEmail}
            validationErrorText={'Invalid Email Address'}
            value={emailAddress}
          />
          <FormInput
            placeholder={'Phone Number*'}
            onChangeText={this._onPhoneChange}
            mandatory={true}
            keyboardType={'phone-pad'}
            value={phoneNumber}
          />
          <FormInput
            placeholder={'Whatsapp Number'}
            onChangeText={this._onWhatsappChange}
            keyboardType={'phone-pad'}
            value={whatsappNumber}
          />
          <Button disabled={!this._validateForm()} onPress={this._checkForExisting} >
            {'Submit'}
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedClient } = state.client;
  const editMode = selectedClient !== null;
  return {
    clientList: state.client.clients,
    client: selectedClient,
    editMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewClient: (newClient) => dispatch(ClientActions.addNewClient(newClient)),
    updateClient: (clientPhoneNumber, updatedClient) => dispatch(ClientActions.updateClient(clientPhoneNumber, updatedClient)),
    selectClient: (client) => dispatch(ClientActions.selectClient(client))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientFormScreen)
