import React from "react";
import { FlatList, Text, View, StyleSheet, Switch, TouchableOpacity, Alert} from 'react-native'
import { IRestaurant } from "../../../../models/restaurant"
import { useNavigation } from 'react-navigation-hooks'
import { SwitchOpen } from '../../../atoms'

const Item = (restaurant: any) => {
    const { navigate } = useNavigation();
    const { name, id, opening_hours } = restaurant
    const navigateTo = (restaurant: IRestaurant) => {
      navigate('Map', { restaurant })
    }
    return (
      <TouchableOpacity onPress={() => navigateTo(restaurant)} > 
        <View style={styles.item}>
          { (opening_hours !=null) &&
              opening_hours.open_now ? <Text style={styles.open}>open now</Text> : null
          }
          <Text key={id} style={styles.title}>{name}</Text>
        </View>
      </TouchableOpacity>
    )
}
const Restaurants = ({items, onPress}: any) => {
  const resultsAvailable = items.length > 0
    if (resultsAvailable) {
      return(<FlatList
        data={items}
        renderItem={({ item }) => (<Item {...item}/>)}
      keyExtractor={(item: IRestaurant) => item.id}/> )
    } else {
      return(<Text style={styles.noRestaurants}>No Restaurants open now :(</Text>) 
    }
}
const ResultsComponent = ({ restaurants, isOpened, onSwitch, onPress }: any) => {
  return(
  <View style={{flex: 1, flexDirection: 'column'}}>
    <SwitchOpen isOpened={isOpened} onSwitch={onSwitch} />
    <Restaurants items={restaurants} onPress={onPress} />
  </View>)
}

const styles = StyleSheet.create({
    open: {
      color: '#2ecc71',
      fontWeight: '300',
      fontSize: 11
    },
    noRestaurants: {
      fontSize: 18, 
      marginLeft: 20,
      color: '#666'
    },
    item: {
      backgroundColor: '#ecf0f1',
      padding: 20,
      marginVertical: 5,
      marginHorizontal: 15,
      borderRadius: 4
    },
    title: {
      fontSize: 18,
    } 
});
export default ResultsComponent