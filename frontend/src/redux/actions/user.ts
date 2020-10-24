/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 16:25
 */

import { RemoveUserThunkAction, SetUserThunkAction } from '@/types'

import AuthApi from '@/services/auth-api'
import { CancelToken } from 'axios'
import User from '@/models/user'

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const setCurrentUser = (
  token: string,
  tokenType: string,
  cancelToken?: CancelToken
): SetUserThunkAction => async (dispatch) => {
  try {
    const authApi = new AuthApi()
    const response = await authApi.getCurrentUser(token, tokenType, cancelToken)

    if (response) {
      const { name, email } = response
      const user = new User(name, email)

      dispatch({
        type: SET_USER,
        user,
      })
    }
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const removeCurrentUser = (): RemoveUserThunkAction => async (
  dispatch
) =>
  dispatch({
    type: REMOVE_USER,
  })
