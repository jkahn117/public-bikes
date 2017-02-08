'use strict';

import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet,
  View
} from 'react-native'
import MapView from 'react-native-maps';


/**


 */

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE  = 41.8802596;
const LONGITUDE = -87.6346818;
const LATITUDE_DELTA  = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class StationMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    }
  }

  //----
  render() {

    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          scrollEnabled={false}
          initialRegion={this.state.region}>

          {this.props.stations.map(station => (

            <MapView.Marker
              key={station.name}
              title={station.name}
              description={station.distance + " miles"}
              coordinate={station.coordinates} />

          ))}

        </MapView>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 250
  },
  map: {
    minHeight: 250,
    minWidth: 250
  }
});


module.exports = StationMap;

