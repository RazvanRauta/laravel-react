/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 19:19
 */

import {REMOVE_TOKEN, SET_TOKEN} from '@/redux/actions/auth'
import {REMOVE_USER, SET_USER} from '@/redux/actions/user'
import {RESET_FILTERS, SET_ADVERTS_DATA, SET_ADVERTS_FILTERS,} from '@/redux/actions/adverts'

import Advert from '@/models/advert'
import {RootState} from '@/redux/rootReducer'
import {ThunkAction} from 'redux-thunk'
import User from '@/models/user'

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

export interface AdvertImage {
    id: number;
    created_at: Date;
    updated_at: Date;
    advert_id: number;
    imageUrl: string;
}

export interface LoginApiResponse {
    access_token: string
    token_type: string
}

export interface CurrentUserResponse {
    id: number
    name: string
    email: string
    email_verified_at?: any
  created_at?: any
  updated_at?: any
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

export interface AuthState {
  token: string | null
  tokenType: string | null
}

export interface UserState {
  user: User | null
}

export interface SetAdvertsAction {
  type: typeof SET_ADVERTS_DATA
  advertsData: AdvertsApiResponse
}

export interface SetLoginTokenAction {
  type: typeof SET_TOKEN
  token: string
  token_type: string
}

export interface RemoveLoginTokenAction {
  type: typeof REMOVE_TOKEN
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

export interface SetUserAction {
  type: typeof SET_USER
  user: User
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER
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

export type SetLoginTokenThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetLoginTokenAction
>

export type RemoveLoginTokenThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  RemoveLoginTokenAction
>

export type AuthActionTypes = SetLoginTokenAction | RemoveLoginTokenAction

export type SetUserThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetUserAction
>

export type RemoveUserThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  RemoveUserAction
>

export type UserActionTypes = SetUserAction | RemoveUserAction
