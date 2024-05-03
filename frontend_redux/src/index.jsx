import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import App from './main/app'
import reducers from './main/reducers'

/*
// alternativa utilizando o plugin Redux DevTools no Chrome
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)
*/

// aplicando dois middlewares independentes: thunk, multi e promise
const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers)

ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>
, document.getElementById('app'))
