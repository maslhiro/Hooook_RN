import React from 'react'

export const initialState = { token : "", data : []};

export const reducer = (action, state) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setToken":
      return { ...state, token: action.token };
    case "setData":
      return { ...state, data: action.data };
    // case "decrement":
    //   return { count: state.count - 1 };
    default:
      return state;
  }
};

export const StoreContext = React.createContext()