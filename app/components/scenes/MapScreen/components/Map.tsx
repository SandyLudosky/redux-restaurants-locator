import React,  { FunctionComponent } from "react";
import { StyleSheet, Dimensions,} from 'react-native'
import MapView from 'react-native-maps';
import { Pin } from './Pin'
import { IRestaurant } from "../../../../models/restaurant";
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const styles = StyleSheet.create({
    map: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
});
interface RestaurantProps {
    restaurant: IRestaurant;
}

const getCoords = (restaurant: IRestaurant) => {
    console.log('props ' + restaurant)
    const {location } = restaurant.geometry
    const {lng , lat} = location
    const latitude = parseFloat(`${lat}`);
    const longitude = parseFloat(`${lng}`);
    return {latitude: latitude, longitude: longitude}
}
const Map: FunctionComponent<RestaurantProps> = ({ restaurant }) => ( 
        <MapView
        style={styles.map}
        showsUserLocation={true}
        showsScale={true}
        initialRegion={{
          latitude:  getCoords(restaurant).latitude,
          longitude: getCoords(restaurant).longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.003 }}>  
            <Pin restaurant={restaurant} /> 
        </MapView>
);

export {
    Map
}
