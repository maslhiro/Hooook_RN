import React, {Component, useReducer} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { AppContainer } from './src/configs'
import { StoreContext,reducer,initialState } from './src/contexts'

export default function App() {

  const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{store,dispatch}}>
          <StatusBar backgroundColor="black"/>
          <AppContainer/>
        </StoreContext.Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
