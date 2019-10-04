
import React, { createContext, Component } from "react"; // on importe createContext qui servira à la création d'un ou plusieurs contextes
import * as helpers from '../../utils/helpers'
/**
 * `createContext` contient 2 propriétés :
 * `Provider` et `Consumer`. Nous les rendons accessibles
 * via la constante `UserContext` et on initialise une
 * propriété par défaut "name" qui sera une chaîne vide.
 * On exporte ce contexte afin qu'il soit exploitable par
 * d'autres composants par la suite via le `Consumer`
 */

export const VisibilityFilter = {
  SHOW_ALL : 'SHOW_ALL', 
  SHOW_OPEN: 'SHOW_OPEN', 
  SHOW_FILTERED: 'SHOW_FILTERED'
}

export const DataContext = createContext({
  data: [],
  dataHolder: [],
  filter:'',
  search: '',
  setData: data => {},
  setFilter: filter => {},
  setSearch: text => {}
});

/**
 * la classe Provider fera office de... Provider (!)
 * en englobant son enfant direct
 * dans le composant éponyme. De cette façon, ses values
 * seront accessibles de manière globale via le `Consumer`
 */
class DataProvider extends Component {
  state = {
    data: [], 
    dataHolder: [],
    filter: '',
    search: '',
    setData: data => this.setState({ data: data }),
    setFilter: filter => this.setState({ dataHolder: this.get(filter), filter: filter}),
    setSearch: text => this.setState({ search: text })
  };

  get = (filter) => {
    console.log('set filter ' + filter)
    switch(filter) {
        case VisibilityFilter.SHOW_ALL: return this.state.data.map(restaurant => {
          console.log(restaurant)
          return restaurant
        })
        case VisibilityFilter.SHOW_OPEN: return this.state.data.filter(restaurant => {
            console.log(this.state.data)
            return restaurant.opening_hours ? restaurant.opening_hours.open_now : false
        })
        case VisibilityFilter.SHOW_FILTERED: return helpers.filterResults(this.state.search, this.state.data)
    }
  }
  render() {
    return (
      /**
       * la propriété value est très importante ici, elle rend
       * le contenu du state disponible aux `Consumers` de l'application
       */
      <DataContext.Provider value={this.state}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
/**
 * HOC, qui se chargera d'injecter les propriétés de notre contexte
 * à n'importe quel composant qui l'appellera
 */
export const withData = Component => props => (
  <DataContext.Consumer>
    {store => <Component {...props} {...store} />}
  </DataContext.Consumer>
)

export default DataProvider;