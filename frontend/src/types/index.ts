/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 19:19
 */

import Advert from '@/models/advert'
import { RootState } from '@/redux/rootReducer'
import { SET_ADVERTS_DATA } from '@/redux/actions/adverts'
import { ThunkAction } from 'redux-thunk'

export interface PaginationLinks {
  url: string
  label: any
  active: boolean
}

export interface AdvertsApiResponse {
  current_page: number
  data: Advert[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLinks[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}

export interface AdvertsState {
  advertsData: AdvertsApiResponse | null
}

export interface SetAdvertsAction {
  type: typeof SET_ADVERTS_DATA
  advertsData: AdvertsApiResponse
}

export type SetAdvertsThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetAdvertsAction
>

export type AdvertsActionTypes = SetAdvertsAction
