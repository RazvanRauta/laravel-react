/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 20:40
 */

import {
  AdvertsFilterValues,
  DeleteAdvertThunkAction,
  FiltersState,
  ResetFiltersThunkAction,
  SetAdvertsFiltersThunkAction,
  SetAdvertsThunkAction,
} from '@/types'

import AdvertsApi from '@/services/adverts-api'
import { CancelToken } from 'axios'
import { parseFilters } from '@/utils'

export const SET_ADVERTS_DATA = 'SET_ADVERTS_DATA'
export const SET_ADVERTS_FILTERS = 'SET_ADVERTS_FILTERS'
export const DELETE_ADVERT = 'DELETE_ADVERT'
export const RESET_FILTERS = 'RESET_FILTERS'

export const fetchAdverts = (
  page?: number,
  filters?: FiltersState,
  cancelToken?: CancelToken
): SetAdvertsThunkAction => async (dispatch) => {
  try {
    const advertsApi = new AdvertsApi()
    const response = await advertsApi.getAdverts(page, filters, cancelToken)
    dispatch({
      type: SET_ADVERTS_DATA,
      advertsData: response,
    })
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const setFilters = (
  values: AdvertsFilterValues
): SetAdvertsFiltersThunkAction => async (dispatch) => {
  const filters = parseFilters(values)

  dispatch({
    type: SET_ADVERTS_FILTERS,
    filters,
  })
}

export const deleteAdvert = (
  advertId: number
): DeleteAdvertThunkAction => async (dispatch, getState) => {
  const { token, tokenType } = getState().auth
  const advertsApi = new AdvertsApi()
  if (token && tokenType) {
    const response = await advertsApi.deleteAdvert(advertId, token, tokenType)
    if (!response.message) {
      throw new Error('Something went wrong!')
    }
    dispatch({
      type: DELETE_ADVERT,
      advertId,
    })
  } else {
    throw new Error('Token not found')
  }
}

export const resetFilters = (): ResetFiltersThunkAction => async (dispatch) => {
  dispatch({
    type: RESET_FILTERS,
  })
}
