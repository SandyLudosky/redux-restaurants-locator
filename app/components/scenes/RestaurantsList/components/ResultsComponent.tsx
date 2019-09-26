  
import React from "react";
import { FlatList, Text, View, StyleSheet } from 'react-native'
import { IRestaurant } from "../../../../models/restaurant";

const Item = (fruit: IRestaurant) => {
    const { name, id} = fruit
    return (
      <View style={styles.item}>
        <Text key={id} style={styles.title}>{name}</Text>
      </View>)
}
  
const ResultsComponent = (props: any) => {
  const { dataSource } = props
  return(<FlatList
    data={dataSource}
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