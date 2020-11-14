import { createStore, applyMiddleware, Middleware, compose } from 'redux'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const middleware: Middleware[] = [thunk]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))
