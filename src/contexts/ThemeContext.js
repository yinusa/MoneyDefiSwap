import React from 'react';

// Context
const State = React.createContext()
const Dispatch = React.createContext()

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'light':
      return {
        ...state,
        on: !state.on,
      }
    default:
      return state
  }
}

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, { on: true })

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

// Export
export const ThemeContext = {
  State,
  Dispatch,
  Provider,
}