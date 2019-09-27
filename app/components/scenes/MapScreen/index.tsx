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
        const {location, viewport } = restaurant.geometry
        const {lng , lat} = location
        const { northeast, southwest } = viewport
        const { width, height } = Dimensions.get('window');
        const ASPECT_RATIO = width / height;

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const northeastLat = parseFloat(northeast.latitude);
        const southwestLat = parseFloat(southwest.latitude);5
        const latDelta = northeastLat - southwestLat;
        const lngDelta = latDelta * ASPECT_RATIO;
        return (
            <View>
            <MapView
            style={styles.map}
            showsUserLocation={true}
            showsScale={true}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.003,
            }}  >
                <Marker
                coordinate={{latitude: lat,
                longitude: lng}}
                title={restaurant.name}
                description={restaurant.vincinity} />   
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