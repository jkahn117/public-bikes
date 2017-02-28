/**
 * public-bikes
 * @jkahn
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const MainPage = require('./MainPage');

export default class PublicBikesApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MainPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('PublicBikesApp', () => PublicBikesApp);
