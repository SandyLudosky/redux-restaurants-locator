import { combineReducers } from 'redux'
import {
  SAVE_LIST,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

initialState = {
    results: [], 
    filter: VisibilityFilters.SHOW_ALL
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: return action.filter
    default: return state
  }
}

function restaurants(state = [], action) {
  switch (action.type) {
    case SAVE_LIST: return action.results
    default: return state
  }
}

const restaurantsApp = combineReducers({
  visibilityFilter,
  restaurants
})

export default restaurantsApp