import React, { Component } from 'react';
import { API } from '../../../services/index'
import store from '../../../lib/store'
import { getCurrentPosition } from '../../../config/geolocation'
import { saveList } from '../../../lib/actions'
import { StyleSheet, View, Button } from 'react-native';
import { IRestaurant } from '../../../models/restaurant'
import ListWithLoading from './components/ListWithLoading'
import ResultsList from './containers/ResultsList'
import { Coordinate } from '../../../models/coordinates';
import * as helpers from '../../../utils/helpers'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { SearchHeader } from '../../molecules';

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
        this.setState({ coordinates: new Coordinate(position) })
      })
      .catch(e => console.log(e))
  }
  fetch = (coordinates: Coordinate) => {
    this.setState({ isFetching: true })
    API.searchRestaurants(coordinates)
      .then((restaurants: any) => {
        this.setState({ dataSource: restaurants, isFetching: false }, () => {
          this.setState({ dataHolder: this.state.dataSource })
          store.dispatch(saveList(restaurants))
        })
      }).catch((err: Error) => console.log(err))
  }

  onPress = (restaurant: IRestaurant) => {
    console.log(restaurant)
    this.props.navigation.navigate('Map', { restaurant })
  }
  onTextChange = (text: string) => {
    const filtered = helpers.filterResults(text, this.state.dataSource)
    const emptyResultsText = `Sorry no results for "${text}" :()`
    this.setState(({ dataSource: !text.length ? this.state.dataHolder : filtered, text: emptyResultsText, search: text }), () => {
      store.dispatch(saveList(filtered))
    })
    if (!text.length) { this.setState({}) }
  }
  onRefresh = () => {
    this.fetch(this.state.coordinates)
    this.setState({ search: '' })
  }
  render() {
    const RestaurantsList = ListWithLoading(ResultsList);
    const { dataSource, search, isFetching, text } = this.state
    return (
      <View style={styles.MainContainer}>
        <SearchHeader search={search} onChange={this.onTextChange} onRefresh={this.onRefresh} />
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
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 7,
  },
  rowViewContainer: {
    fontSize: 17,
    padding: 10
  }
});