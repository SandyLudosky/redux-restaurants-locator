import React, { Component } from 'react'; 
import { IRestaurant } from '../../../models/restaurant'
import { View, Dimensions } from 'react-native'
import { Map } from './components/Map'
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
        region: {}
    }
    onRegionChange(region: {}) {
        this.setState({ region });
    }
    render() {
        const params = this.props.navigation.state.params, restaurant = params.restaurant
        return (
            <View>
                <Map restaurant={restaurant}/>
            </View>
        );
      }
}
