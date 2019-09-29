import React from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './config/navigation'
import { createAppContainer } from 'react-navigation';
import store from './lib/store'

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
       <AppContainer />
    </Provider>
    )
  }
}