import React, { FunctionComponent }  from "react";
import { Marker } from 'react-native-maps';
import { IRestaurant } from "../../../../models/restaurant";

interface RestaurantProps {
    restaurant: IRestaurant;
}


const getInfo = (restaurant: IRestaurant) => {
    const {location } = restaurant.geometry
    const {lng , lat} = location
    const open = restaurant.opening_hours != null && restaurant.opening_hours.open_now ?  'open now': ''
    return {latitude: lat, longitude: lng, open: open}
}
const Pin: FunctionComponent<RestaurantProps> = ({ restaurant }) => ( 
    <Marker
        coordinate={{latitude: getInfo(restaurant).latitude,
        longitude: getInfo(restaurant).longitude}}
        title={`${restaurant.name}\n${getInfo(restaurant).open}`}
        description={restaurant.vincinity} />   
)
export {
    Pin
}