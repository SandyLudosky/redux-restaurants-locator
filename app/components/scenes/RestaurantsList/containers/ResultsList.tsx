import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../../../lib/actions'
import ResultsComponent from '../components/ResultsComponent'
import { IRestaurant } from '../../../../models/restaurant'
import { data } from '../../../../config/data'
import { VisibilityFilters } from '../../../../lib/actions'

const getVisibleRestaurants = (restaurants: any[], filter: string) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL: return restaurants
    case VisibilityFilters.SHOW_OPEN: return restaurants.filter(t => t.opening_hours.open_now)
    default: throw new Error('Unknown filter: ' + filter)
  }
}
const mapStateToProps = (state: any) => {
  return {
    restaurants: getVisibleRestaurants(state.restaurants, state.visibilityFilter)
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onSwitch:(filter:string) => { dispatch(setVisibilityFilter(filter)) }
  }
}

const ResultsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent)

export default ResultsList 