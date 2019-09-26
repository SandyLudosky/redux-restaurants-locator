  
import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  text: string;
}
const EmptyComponent: FunctionComponent<Props> = ({text}) => (
  <View style={styles.container}>
     <View style={styles.content}>
          <Text>{ text }</Text>
      </View>
  </View>
);
const styles = StyleSheet.create({
    cover: {
      width: '100%',
      height: '100%',
      alignSelf: 'center'
    },
    container: {
      flex: 1,
      flexDirection: 'row', 
      alignItems: 'stretch'
    },
    content: {
      flex: 1,
      width: 200, 
      height: 200,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

export default EmptyComponent