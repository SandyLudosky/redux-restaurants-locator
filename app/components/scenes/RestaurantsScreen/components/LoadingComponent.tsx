import React from "react";
import { View, ActivityIndicator, StyleSheet} from 'react-native'

function LoadingComponent() {
  return( <View style={styles.container}>
            <View style={styles.content}>
              <ActivityIndicator />
            </View>
          </View>)
}
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

export default LoadingComponent