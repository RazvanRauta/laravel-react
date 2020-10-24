/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 17:39
 */

import { RemoveLoginTokenThunkAction, SetLoginTokenThunkAction } from '@/types'

import AuthApi from '@/services/auth-api'
import { CancelToken } from 'axios'

export const SET_TOKEN = 'SET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'

export const login = (
  email: string,
  password: string,
  cancelToken?: CancelToken
): SetLoginTokenThunkAction => async (dispatch) => {
  try {
    const authApi = new AuthApi()
    await authApi.getCSRFCookie()
    const response = await authApi.login(email, password, cancelToken)
    dispatch({
      type: SET_TOKEN,
      token: response.access_token,
      token_type: response.token_type,
    })
    return Promise.resolve({ response })
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const logout = (): RemoveLoginTokenThunkAction => async (dispatch) =>
  dispatch({ type: REMOVE_TOKEN })
