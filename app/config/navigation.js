
import { createStackNavigator } from 'react-navigation-stack';
import { RestaurantsScreen, MapScreen} from '../components/scenes'
const AppNavigator = createStackNavigator({
  Home: {
    screen: RestaurantsScreen
  },
  Map: {
    screen: MapScreen
  }
});

export default AppNavigator