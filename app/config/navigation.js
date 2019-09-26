
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import RestaurantsList from '../components/scenes/RestaurantsList'

const AppNavigator = createStackNavigator({
  Home: {
    screen: RestaurantsList,
  },
});

export default AppNavigator