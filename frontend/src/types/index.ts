/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 19:19
 */

import {
  RESET_FILTERS,
  SET_ADVERTS_DATA,
  SET_ADVERTS_FILTERS,
} from '@/redux/actions/adverts'

import Advert from '@/models/advert'
import { RootState } from '@/redux/rootReducer'
import { ThunkAction } from 'redux-thunk'

export interface PaginationLinks {
  url: string
  label: any
  active: boolean
}

export interface AdvertsFilterValues {
  priceRange: number[]
  '1Room': boolean
  '2Room': boolean
  '3Room': boolean
  '4Room': boolean
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
  adverts: Advert[] | null
  filters: FiltersState
}

export interface FiltersState {
  rooms: number[] | null
  price: number[] | null
}

export interface SetAdvertsAction {
  type: typeof SET_ADVERTS_DATA
  advertsData: AdvertsApiResponse
}

export interface SetAdvertsFiltersAction {
  type: typeof SET_ADVERTS_FILTERS
  filters: {
    rooms: number[]
    price: number[]
  }
}

export interface ResetFiltersAction {
  type: typeof RESET_FILTERS
}

export type SetAdvertsThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetAdvertsAction
>

export type SetAdvertsFiltersThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetAdvertsFiltersAction
>

export type ResetFiltersThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  ResetFiltersAction
>

export type AdvertsActionTypes =
  | SetAdvertsAction
  | SetAdvertsFiltersAction
  | ResetFiltersAction
