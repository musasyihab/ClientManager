import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './Styles/TextInfoStyle';
import { Images } from '../Themes';

export default class TextInfo extends Component {
  // // Prop type warnings
  static propTypes = {
    labelText: PropTypes.string,
    valueText: PropTypes.string,
    buttonIcon: PropTypes.string,
    buttonPressHandler: PropTypes.func
  }
  //
  // // Defaults for props
  static defaultProps = {
    labelText: '',
    valueText: '',
    buttonIcon: null,
    buttonPressHandler: noop
  }

  _renderButton = () => (
    <TouchableOpacity style={styles.iconContainer} onPress={this.props.buttonPressHandler}>
      <Image style={styles.icon} source={this.props.buttonIcon} />
    </TouchableOpacity>
  );

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.labelStyle}>{this.props.labelText}</Text>
          <Text style={styles.valueStyle}>{this.props.valueText}</Text>
        </View>
        {this.props.buttonIcon && this._renderButton()}
      </View>
    )
  }
}
