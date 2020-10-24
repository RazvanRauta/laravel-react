/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 17:38
 */

import { AuthActionTypes, AuthState } from '@/types'
import { REMOVE_TOKEN, SET_TOKEN } from '../actions/auth'

const initialState: AuthState = {
  token: null,
  tokenType: null,
}

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.token,
        tokenType: action.token_type,
      }

    case REMOVE_TOKEN:
      return {
        token: null,
        tokenType: null,
      }

    default:
      return state
  }
}
