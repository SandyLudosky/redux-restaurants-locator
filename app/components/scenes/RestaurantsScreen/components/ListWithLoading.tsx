import React, { FunctionComponent } from "react";
import Animatable from 'react-native-animatable'
import LoadingComponent from './LoadingComponent'
import EmptyComponent from './EmptyComponent'

/* HOC to handle conditional rendering on homepage */
function ListWithLoading(Component: FunctionComponent) {
  return function WihLoadingComponent({ ...props }: any) {
    const { dataSource, isFetching, text, onPress } = props
    if (!isFetching) {
      return  dataSource.length != 0  ? 
          <Animatable.View animation="fadeIn" duration={2}> 
            <Component {...props} onPress={onPress}/>
          </ Animatable.View> : 
          <EmptyComponent text={text}/>
  }  else {
    return <LoadingComponent/>
  }
  }
}
export default ListWithLoading;