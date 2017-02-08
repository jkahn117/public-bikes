/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';


const MainPage = require('./MainPage');

export default class PublicBikesApp extends Component {
  render() {
    return (
      
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Public Bikes",
          component: MainPage
        }} />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('PublicBikesApp', () => PublicBikesApp);
