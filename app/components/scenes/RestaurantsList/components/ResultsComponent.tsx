  
import React from "react";
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { IRestaurant } from "../../../../models/restaurant";
import { data } from '../../../../config/data'

const Item = (restaurant: IRestaurant) => {
    const { name, id } = restaurant
    return (
      <View style={styles.item}>
        <Text key={id} style={styles.title}>{name}</Text>
      </View>)
}
  
const ResultsComponent = ({ restaurants }: any) => {
  return(<FlatList
    data={restaurants}
    renderItem={({ item }) => (<Item {...item}/>)}
    keyExtractor={(item: IRestaurant) => item.id}/>)
}

const styles = StyleSheet.create({
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