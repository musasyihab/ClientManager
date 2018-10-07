import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { noop } from 'lodash'
import styles from './Styles/ClientListItemStyle'
import { Images } from '../Themes'

export default class ClientListItem extends Component {
  // // Prop type warnings
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    whatsappNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    whatsappActionHandler: PropTypes.func,
    callActionHandler: PropTypes.func,
    detailActionHandler: PropTypes.func
  }
  //
  // // Defaults for props
  static defaultProps = {
    avatar: null, /*'https://www.fancyhands.com/images/default-avatar-250x250.png'*/
    whatsappActionHandler: noop,
    callActionHandler: noop,
    detailActionHandler: noop,
    whatsappNumber: null,
    phoneNumber: null,
    email: null
  }

  _renderWhatsappIcon = () => (
    <TouchableOpacity style={styles.iconContainer} onPress={this.props.whatsappActionHandler}>
      <Image style={styles.icon} source={Images.whatsappIcon} />
    </TouchableOpacity>
  );

  _renderCallIcon = () => (
    <TouchableOpacity style={styles.iconContainer} onPress={this.props.callActionHandler}>
      <Image style={styles.icon} source={Images.callIcon} />
    </TouchableOpacity>
  );

  render () {
    const avatarSrc = this.props.avatar ? { uri: this.props.avatar } : Images.defaultAvatar
    return (
      <TouchableOpacity style={styles.row} onPress={this.props.detailActionHandler}>
        <View style={styles.rowContainer}>  
          <Image
            style={styles.avatar}
            source={avatarSrc}
          />
          <Text style={styles.name} >{this.props.name}</Text>
          <View style={styles.buttons}>
            { this.props.whatsappNumber && this._renderWhatsappIcon() }
            { this.props.phoneNumber && this._renderCallIcon() }
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
