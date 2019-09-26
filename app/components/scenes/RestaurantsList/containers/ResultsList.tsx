import { connect } from 'react-redux'
import { setVisibilityFilter } from '../../../../lib/actions'
import ResultsComponent from '../components/ResultsComponent'
import { VisibilityFilters } from '../../../../lib/actions'

/*
Data from store
*/
const getVisibleRestaurants = (restaurants: any[], filter: string) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL: return restaurants
    case VisibilityFilters.SHOW_OPEN: 
    return restaurants.filter(restaurant => {
        return restaurant.opening_hours ? restaurant.opening_hours.open_now : false
    })
    default: throw new Error('Unknown filter: ' + filter)
  }
}
const getFilter = (filter: string): boolean  => {
  const { SHOW_OPEN } = VisibilityFilters
  return filter == SHOW_OPEN ? true : false
}
const mapStateToProps = (state: any) => {
  return {
    restaurants: getVisibleRestaurants(state.restaurants, state.visibilityFilter),
    open: getFilter(state.visibilityFilter)
  }
}
const mapDispatchToProps = (dispatch: any) => {
  const { SHOW_ALL, SHOW_OPEN } = VisibilityFilters
  return {
    onSwitch:(e:boolean) => { 
      console.log(e)
      dispatch(setVisibilityFilter( e ? SHOW_OPEN : SHOW_ALL)) 
    }
  }
}

const ResultsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent)

export default ResultsList 