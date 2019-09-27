import React, { Component } from 'react'; 
import { IRestaurant } from '../../../models/restaurant'
import { View, Text, Dimensions, StyleSheet  } from 'react-native'
import MapView, { Marker, LatLng } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
interface State { }
export interface RestaurantProps {
    restaurant: IRestaurant
    region: any
    marker: LatLng
}
export default class MapScreen extends Component<RestaurantProps, State> { 
    constructor(props: any) {
        super(props)
    }
    state = {
        restaurant: {} as IRestaurant,
        region: {},
        marker: []
    }
    onRegionChange(region: {}) {
        this.setState({ region });
    }
    render() {
        return (
            <View>
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.props.restaurant.geometry.location.lat,
              longitude: this.props.restaurant.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
                 
                {/* <Marker
                coordinate={this.state.marker}
                title={this.state.restaurant.name}
                description={this.state.restaurant.vincinity}
                />)) */}
            </MapView>
        </View>
        );
      }
}
const styles = StyleSheet.create({
    map: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
  });