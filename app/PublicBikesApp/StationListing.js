'use strict';

import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native'

/**


 */
class StationListing extends Component {

  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  }

  //----
  _renderRow(station, rowId) {
    return (
        <TouchableHighlight onPress={() => this._rowPressed(station.name)}
            underlayColor='#dddddd'>
          <View>
            <View style={styles.horizontal}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{station.name}</Text>
                <Text style={styles.distance}>{station.distance} miles</Text>
              </View>
            </View>

            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
    );
  }


  //----
  _rowPressed(name) {
    console.log("Pressed " + name);
    /*
    var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

    this.props.navigator.push({
      title: "Property",
      component: PropertyView,
      passProps: {property: property}
    });


    
    */
  }

  //----

  _noDataView() {
    return (
      <View style={[ styles.centering, styles.horizontal ]}>
        <Text style={styles.light}>Find Stations by Tapping Below</Text>
      </View>
    )
  }

  _isLoadingView() {
    return (
      <View style={[ styles.centering, styles.horizontal ]}>
        <ActivityIndicator
          animating={true}
          style={ {paddingRight: 20} }
          size="large" />
        <Text style={styles.light}>Loading nearby stations...</Text>
      </View>
    )
  }

  render() {

    const isLoading  = this.props.isLoading;
    const dataSource = this.dataSource.cloneWithRows(this.props.stations);

    var content = this._noDataView();
    if (isLoading) {
      content = this._isLoadingView();
    }
    else if (this.props.stations.length > 0) {
      content = <ListView
                  enableEmptySections={true}
                  dataSource={dataSource}
                  renderRow={ this._renderRow.bind(this) } />;
    }


    return (
      <View style={styles.container}>
        {content}
      </View>        
    );
  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 250
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  light: {
    color: '#999'
  },
  textContainer: {
    flex: 1
  },
  name: {
    fontSize: 18,
    color: '#656565',
    fontWeight: 'bold'
  },
  distance: {
    fontSize: 12,
    color: '#999'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  }
});

module.exports = StationListing;

