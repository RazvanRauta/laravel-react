/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:37
 */

import { AdvertsActionTypes, AdvertsState } from '@/types'
import {
  DELETE_ADVERT,
  RESET_FILTERS,
  SET_ADVERTS_DATA,
  SET_ADVERTS_FILTERS,
} from '../actions/adverts'

import Advert from '@/models/advert'

const initialState: AdvertsState = {
  advertsData: null,
  adverts: null,
  filters: {
    price: null,
    rooms: null,
  },
}

export default (
  state = initialState,
  action: AdvertsActionTypes
): AdvertsState => {
  switch (action.type) {
    case SET_ADVERTS_DATA:
      const listOfAds: Advert[] = []
      const advertsDatum = action.advertsData.data

      advertsDatum.forEach((ad) => listOfAds.push(new Advert({ ...ad })))

      return {
        ...state,
        advertsData: action.advertsData,
        adverts: [...listOfAds],
      }

    case SET_ADVERTS_FILTERS:
      return {
        ...state,
        filters: action.filters,
      }

    case DELETE_ADVERT:
      return {
        ...state,
        adverts: state.adverts
          ? state.adverts.filter((advert) => advert.id !== action.advertId)
          : null,
      }

    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          price: null,
          rooms: null,
        },
      }

    default:
      return state
  }
}
