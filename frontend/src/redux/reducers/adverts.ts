/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:37
 */

import { AdvertsActionTypes, AdvertsState } from '@/types'

import { SET_ADVERTS_DATA } from '../actions/adverts'

const initialState: AdvertsState = {
  advertsData: null,
}

export default (
  state = initialState,
  action: AdvertsActionTypes
): AdvertsState => {
  switch (action.type) {
    case SET_ADVERTS_DATA:
      return {
        advertsData: action.advertsData,
      }

    default:
      return state
  }
}
