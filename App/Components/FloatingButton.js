import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { noop } from 'lodash'

import styles from './Styles/FloatingButtonStyle'
import { Images } from '../Themes';

export default class FloatingButton extends Component {
  // // Prop type warnings
  static propTypes = {
    icon: PropTypes.string,
    onPress: PropTypes.func
    // someSetting: PropTypes.bool.isRequired,
  }
  //
  // // Defaults for props
  static defaultProps = {
    icon: Images.addIcon,
    onPress: noop
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} onPress={this.props.onPress}>
          <Image style={styles.iconImage} source={this.props.icon}/>
        </TouchableOpacity>
      </View>
    )
  }
}
