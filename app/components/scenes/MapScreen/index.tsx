import React, { Component } from 'react'; 
import { IRestaurant } from '../../../models/restaurant'
import { View, Text, Dimensions, StyleSheet  } from 'react-native'
import MapView, { Marker, LatLng } from 'react-native-maps';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation'

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export interface State {
    restaurant: IRestaurant
    region: any
    marker: LatLng
}
export interface NavigationProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }
  
export default class MapScreen extends Component<NavigationProps, State> { 
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
        const params = this.props.navigation.state.params, restaurant = params.restaurant
        return (
            <View>
            <MapView
            style={styles.map}
            initialRegion={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
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