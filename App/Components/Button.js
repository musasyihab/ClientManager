import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/ButtonStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes';

// Note that this file (App/Components/Button) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Button', () =>
  <Button
    text='button text here'
    onPress={() => window.alert('Button Pressed!')}
  />
)

export default class Button extends Component {
  static defaultProps = {
    isRounded: false,
    backgroundColor: Colors.primary,
    textColor: Colors.white,
    isUppercase: true,
    disabled: false,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object
  }
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object,
    isRounded: PropTypes.bool,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    isUppercase: PropTypes.bool,
    disabled: PropTypes.bool,
    buttonStyle: {},
    textStyle: {}
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return this.props.isUppercase ? buttonText.toUpperCase() : buttonText;
  }

  render () {
    const buttonStyle = {
      ...styles.button(this.props.isRounded, this.props.disabled, this.props.backgroundColor),
      ...this.props.buttonStyle
    }
    const textStyle = {
      ...styles.buttonText(this.props.textColor),
      ...this.props.textStyle
    }
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <Text style={textStyle}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
