import React, { Component } from 'react';
import { API } from '../../../services/index'
import store from '../../../lib/store'
import { getCurrentPosition } from '../../../config/geolocation'
import { saveList } from '../../../lib/actions'
import { StyleSheet, View, TextInput, Button} from 'react-native';
import { IRestaurant } from '../../../models/restaurant'
import ListWithLoading from './components/ListWithLoading'
import ResultsList from './containers/ResultsList'
import { Coordinate } from '../../../models/coordinates';
import * as helpers from '../../../utils/helpers'
import { ButtonRefresh } from '../../../utils/styles'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  dataSource: IRestaurant[]
  dataHolder: IRestaurant[]
  coordinates: Coordinate
  isFetching: boolean
  search: string
  text: string
}

export default class RestaurantsScreen extends Component<NavigationProps, State> {
   state = {
      dataSource: [],
      dataHolder: [],
      coordinates: {} as Coordinate,
      isFetching: true,
      search: '',
      text: '' 
  }
  componentDidMount() {
    getCurrentPosition()
    .then((position: any) => {
      this.fetch(new Coordinate(position))
      this.setState({coordinates : new Coordinate(position)})
    })
    .catch(e => console.log(e))
  }
  onPress = (restaurant: IRestaurant) => {
    console.log(restaurant)
    this.props.navigation.navigate('Map', { restaurant })
  }
  fetch = (coordinates: Coordinate) => {
    this.setState({isFetching: true})
    API.searchRestaurants(coordinates)
    .then((restaurants: any) => {
      this.setState({dataSource: restaurants, isFetching: false}, () => {
        const unsubscribe = store.subscribe(() => console.log(store.getState()))
        this.setState({ dataHolder: this.state.dataSource})
        store.dispatch(saveList(restaurants))
      })
    }).catch((err:Error) => console.log(err))
  } 
  onTextChange =(text: string) => {
    const filtered = helpers.filterResults(text, this.state.dataSource)
    const emptyResultsText = `Sorry no results for "${text}" :()`
    this.setState(({ dataSource: !text.length ? this.state.dataHolder : filtered, text: emptyResultsText, search: text}), () => {
      store.dispatch(saveList(filtered))
    })
    if (!text.length) { this.setState({})}
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  render() {
    const RestaurantsList = ListWithLoading(ResultsList);
    const { dataSource, isFetching, text } = this.state
    return (
      <View style={styles.MainContainer}>
          <TextInput 
            style={styles.TextInputStyleClass}
            onChangeText={(text) => this.onTextChange(text)}
            value={this.state.search}
            underlineColorAndroid='transparent'
            placeholder="Search Restaurant ..."
          />
          <ButtonRefresh>
              <Button title="refresh" onPress={() => {
                this.fetch(this.state.coordinates)
                this.setState({ search: ''})
              }} />
          </ButtonRefresh>
          <RestaurantsList dataSource={dataSource} isFetching={isFetching} text={text} onPress={this.onPress} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
  },
 MainContainer :{
 
  justifyContent: 'center',
  flex:1,
  margin: 7,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },
 
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#7f8c8d',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});