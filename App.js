import React, {Component, useReducer} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppContainer } from './src/configs'
import { StoreContext,reducer,initialState } from './src/contexts'

export default function App() {

  const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{store,dispatch}}>
          <AppContainer/>
        </StoreContext.Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
