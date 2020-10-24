/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 16:26
 */

import { REMOVE_USER, SET_USER } from '../actions/user'
import { UserActionTypes, UserState } from '@/types'

const initialState: UserState = {
  user: null,
}

export default (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.user,
      }
    case REMOVE_USER:
      return {
        user: null,
      }

    default:
      return state
  }
}
