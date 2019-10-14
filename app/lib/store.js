import { createStore } from 'redux'
import restaurantsApp from './reducers'
const store = createStore(restaurantsApp)
export default store