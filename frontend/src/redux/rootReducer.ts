/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:37
 */

import advertsReducer from './reducers/adverts'
import authReducer from './reducers/auth'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducers/user'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'], // only navigation will be persisted
}

const rootReducer = combineReducers({
  advertsData: advertsReducer,
  auth: authReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(persistConfig, rootReducer)
