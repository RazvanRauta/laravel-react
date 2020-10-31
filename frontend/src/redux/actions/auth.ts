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

export const signUp = (
  fullName: string,
  email: string,
  password: string
): SetLoginTokenThunkAction => async (dispatch) => {
  try {
    const authApi = new AuthApi()
    await authApi.getCSRFCookie()
    const response = await authApi.signUp(fullName, email, password)
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

export const logout = (
  token: string,
  tokenType: string
): RemoveLoginTokenThunkAction => async (dispatch) => {
  const authApi = new AuthApi()
  await authApi.getCSRFCookie()
  const response = await authApi.logout(token, tokenType)

  if (response.success) {
    dispatch({ type: REMOVE_TOKEN })
  }
}
