/*
 * action types
 */
export const SAVE_LIST = 'SAVE_LIST'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_OPEN: 'SHOW_OPEN'
}

/*
 * action creators
 */
function saveList(results) {
  return { type: SAVE_LIST, results}
}
function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
export {
  saveList, 
  setVisibilityFilter
}