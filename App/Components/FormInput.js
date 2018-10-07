import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, TextInput } from 'react-native'
import { noop, isEmpty } from 'lodash';

import styles from './Styles/FormInputStyle'

export default class FormInput extends Component {
  // // Prop type warnings
  static propTypes = {
    placeholder: PropTypes.string,
    onChangeText: PropTypes.func,
    mandatory: PropTypes.bool,
    keyboardType: PropTypes.string,
    validation: PropTypes.func,
    validationErrorText: PropTypes.string,
    value: PropTypes.string
  }
  //
  // // Defaults for props
  static defaultProps = {
    placeholder: '',
    onChangeText: noop,
    mandatory: false,
    keyboardType: 'default',
    validation: () => true,
    validationErrorText: 'Invalid value',
    value: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      text: props.value,
      isError: false,
      errorText: ''
    }
  }

  _validateForm = () => {
    const isTextEmpty = this.props.mandatory && isEmpty(this.state.text);

    const isValid = this.props.validation(this.state.text);

    let errorText = !isValid ? this.props.validationErrorText : '';
    errorText = isTextEmpty ? 'This field is required.' : errorText;

    this.setState({ isError: isTextEmpty || !isValid, errorText })
  }

  _onChangeText = (text) => {
    this.props.onChangeText(text);
    this.setState({ text }, this._validateForm)
  }

  _renderError = () => (
    <Text style={styles.errorStyle}>{this.state.errorText}</Text>
  )

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.labelStyle}>{this.props.placeholder}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={this.props.placeholder}
          onChangeText={this._onChangeText}
          keyboardType={this.props.keyboardType}
          onBlur={this._validateForm}
          value={this.state.text}
        />
        {this.state.isError && this._renderError()}
      </View>
    )
  }
}
