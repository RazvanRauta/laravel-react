/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:37
 */

import advertsReducer from './reducers/adverts'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  advertsData: advertsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
