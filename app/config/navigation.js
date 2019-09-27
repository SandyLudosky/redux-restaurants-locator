
import { createStackNavigator } from 'react-navigation-stack';
import RestaurantsScreen from '../components/scenes/RestaurantsScreen'
import MapScreen from '../components/scenes/MapScreen'

const AppNavigator = createStackNavigator({
  Home: {
    screen: RestaurantsScreen
  },
  Map: {
    screen: MapScreen
  }
});

export default AppNavigator