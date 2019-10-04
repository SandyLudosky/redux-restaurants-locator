import React, { Component, useContext } from 'react';
import { API } from '../../../services/index'
import { getCurrentPosition } from '../../../config/geolocation'
import { StyleSheet, View } from 'react-native';
import { IRestaurant } from '../../../models/restaurant'
import ListWithLoading from './components/ListWithLoading'
import ResultsComponent from './components/ResultsComponent'
import { Coordinate } from '../../../models/coordinates';
import { DataContext, VisibilityFilter } from '../../../lib/store/DataProvider'

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
    const dataContext = this.context;
    this.setState({ isFetching: true })
    API.searchRestaurants(coordinates)
      .then((restaurants: any) => {
        this.setState({isFetching: false })
        dataContext.setData(restaurants)
        dataContext.setFilter(VisibilityFilter.SHOW_ALL)
      }).catch((err: Error) => console.log(err))
  }

  onPress = (restaurant: IRestaurant) => {
    console.log(restaurant)
    this.props.navigation.navigate('Map', { restaurant })
  }
  onTextChange = (text: string) => {
    const dataContext = this.context
    const emptyResultsText = `Sorry no results for "${text}" :()`
    const { SHOW_ALL, SHOW_FILTERED } = VisibilityFilter
    dataContext.setSearch(text)
    dataContext.setFilter(!text.length ? SHOW_ALL : SHOW_FILTERED)
    this.setState(({ text: emptyResultsText, search: text}))
  }
  onRefresh = () => {
    const dataContext = this.context
    this.fetch(this.state.coordinates)
    this.setState({ search: '' })
    dataContext.setSearch('')
  }
  render() {
    const RestaurantsList = ListWithLoading(ResultsComponent);
    const { search, isFetching, text } = this.state
    return (
      <View style={styles.MainContainer}>
        <SearchHeader search={search} onChange={this.onTextChange} onRefresh={this.onRefresh} />
        <DataContext.Consumer>
        { value => <RestaurantsList dataSource={value.dataHolder} isFetching={isFetching} text={text} onPress={this.onPress} />}
        </DataContext.Consumer>
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
RestaurantsScreen.contextType = DataContext;