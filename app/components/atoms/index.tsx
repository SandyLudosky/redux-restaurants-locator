import React, { useContext }  from 'react';
import { Button, View, StyleSheet, Text, TextInput, Switch } from 'react-native';
import { Icon } from 'react-native-elements'
import { DataContext, VisibilityFilter } from '../../lib/store/DataProvider'

const FilterLink = (props: any) => {
    const { filter, children, setActive } = props
    return (<Button title={children} onPress={() => setActive(filter)} />)
}

const SwitchOpen = ({onSwitch}: any) => {
    const filterContext = useContext(DataContext); 
    const isOpened = filterContext.filter == VisibilityFilter.SHOW_OPEN
    return(<View style={styles.switch}>
          <Text style={styles.text}>open now : </Text>
          <Switch onValueChange={(e) => onSwitch(e)} 
                  value={isOpened}
                  trackColor={{ false: '#ccc', true: '#16a085'}} />
      </View>)
  }

const SearchInput = ({search, onChange}:any) => {
    return(
    <TextInput
        style={styles.textInputStyleClass}
        onChangeText={(text) => onChange(text)}
        value={search}
        underlineColorAndroid='transparent'
        placeholder="Search Restaurant ..."
      />
      )
}
/* 
Component namespacing 
*/

/* accessory types for items in a list */
const Accessory = ({ children}: any) => {children};
Accessory.Open = ({style}: any) => <View><Icon style={styles.open} type='font-awesome' name='check-circle'/></View>;

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
    textInputStyleClass: {
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#7f8c8d',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"
    },
    open: {
        color: '#2ecc71'
    }
})
export {
    FilterLink,
    SwitchOpen, 
    SearchInput,
    Accessory 
}