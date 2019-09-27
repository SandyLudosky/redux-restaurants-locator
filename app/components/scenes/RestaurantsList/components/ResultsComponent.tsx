  
import React from "react";
import { FlatList, Text, View, StyleSheet, Switch } from 'react-native'
import { IRestaurant } from "../../../../models/restaurant";
import { VisibilityFilters } from '../../../../lib/actions'

const Item = (restaurant: IRestaurant) => {
    const { name, id } = restaurant
    return (
      <View style={styles.item}>
        <Text key={id} style={styles.title}>{name}</Text>
      </View>)
}
const ResultsComponent = ({ restaurants, isOpened, onSwitch }: any) => {
  const resultsAvailable = restaurants.length > 0
  return(
  <View style={{flex: 1, flexDirection: 'column'}}>
    <View style={styles.switch}>
        <Text style={styles.text}>open now : </Text>
        <Switch onValueChange={(e) => onSwitch(e)} 
                value={isOpened}
                trackColor={{ false: '#ccc', true: '#16a085'}} />
    </View>
    {resultsAvailable ?
    <FlatList
    data={restaurants}
    renderItem={({ item }) => (<Item {...item}/>)}
    keyExtractor={(item: IRestaurant) => item.id}/> :
    <Text style={styles.noRestaurants}>No Restaurants open now :(</Text>
    }
  </View>)
}

const styles = StyleSheet.create({
    switch: {
       marginTop: 20,
       marginBottom: 20, 
       marginRight: 20,
       flexDirection: 'row',
       justifyContent: 'flex-end'
    },
    text: {
      fontSize: 18, 
      fontWeight: '600',
      paddingTop: 5,
      color: '#333'
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