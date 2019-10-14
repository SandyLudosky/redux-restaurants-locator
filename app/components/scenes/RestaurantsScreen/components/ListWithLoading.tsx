import React, { FunctionComponent } from "react";
import Animatable from 'react-native-animatable'
import LoadingComponent from './LoadingComponent'
import EmptyComponent from './EmptyComponent'

/* HOC to handle conditional rendering on homepage */
function ListWithLoading(Component: FunctionComponent) {
  return function WithLoadingComponent({ ...props }: any) {
    const { dataSource, isFetching, text, onPress } = props
    if (!isFetching) {
      return  dataSource.length != 0 ? 
          <Component {...props} onPress={onPress}/> : 
          <EmptyComponent text={text}/>
  }  else {
    return <LoadingComponent/>
  }
  }
}
export default ListWithLoading;