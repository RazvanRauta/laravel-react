import { Store, applyMiddleware, createStore } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistStore } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import rootReducer from './rootReducer'

let store: Store

if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  )
} else {
  store = createStore(rootReducer, applyMiddleware(reduxThunk))
}

export const persistor = persistStore(store)

export default store
