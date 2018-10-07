import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, Linking } from 'react-native'
import { noop} from 'lodash';

import PropTypes from 'prop-types';
import styles from './Styles/ClientListStyle'

import ClientListItem from './ClientListItem'
import { Colors } from '../Themes'

const MINIMUM_DATA = 0;

export default class ClientList extends Component {
  // // Prop type warnings
  static propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    emptyListText: PropTypes.string,
    onDetailPress: PropTypes.func
  }
  
  // Defaults for props
  static defaultProps = {
    items: [],
    isLoading: false,
    emptyListText: 'No data found',
    onDetailPress: noop
  }

  _openWhatsapp = whatsappNumber => () => {
    const number = whatsappNumber.replace('+', '');
    const uri = `https://wa.me/${number}`;
    Linking.openURL(uri);
  }

  _openCall = number => () => {
    const uri = `tel:${number}`;
    Linking.openURL(uri);
  }

  _openDetail = item => () => {
    this.props.onDetailPress(item);
  }

  _renderItem ({ item }) {
    return (
      <ClientListItem
        name={item.name}
        avatar={item.avatar}
        whatsappNumber={item.whatsappNumber}
        phoneNumber={item.phoneNumber}
        whatsappActionHandler={this._openWhatsapp(item.whatsappNumber)}
        callActionHandler={this._openCall(item.phoneNumber)}
        detailActionHandler={this._openDetail(item)}
      />
    )
  }
  

  _renderListView = () => {
    return this.props.items.length > MINIMUM_DATA ? this._renderList() : this._renderEmptyList();
  }

  _renderList = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={this.props.items}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={this.keyExtractor}
        initialNumToRender={this.oneScreensWorth}
        contentInset= {{ bottom: 40 }}
      />
    </View>
  );

  _renderEmptyList = () => (
    <View
      style={styles.emptyListContainer}
    >
      <Text style={styles.emptyLabel}>{this.props.emptyListText}</Text>
    </View>
  );

  _renderLoading = () => (
    <ActivityIndicator size="large" color={Colors.charcoal} />
  );

  keyExtractor = (item, index) => index.toString()

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        {this.props.isLoading ? this._renderLoading() : this._renderListView()}
      </View>
    )
  }
}
