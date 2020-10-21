/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:37
 */

import { AdvertsActionTypes, AdvertsState } from '@/types'

import Advert from '@/models/advert'
import { SET_ADVERTS_DATA } from '../actions/adverts'

const initialState: AdvertsState = {
  advertsData: null,
  adverts: null,
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
        advertsData: action.advertsData,
        adverts: [...listOfAds],
      }

    default:
      return state
  }
}
