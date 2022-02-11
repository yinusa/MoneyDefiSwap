import React, { cloneElement } from 'react'
import { ThemeContext } from './ThemeContext'

const providers = [<ThemeContext.Provider />]

const Store = ({ children: initial }) =>
  providers.reduce((children, parent) => cloneElement(parent, { children }), initial)

export { Store, ThemeContext }