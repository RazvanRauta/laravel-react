/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 16:55
 */

import { CurrentUserResponse, LoginApiResponse, LogoutResponse } from '@/types'

import { CancelToken } from 'axios'
import HttpClient from './http-client'

class AuthApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

  public getCSRFCookie = () => this.instance.get('/sanctum/csrf-cookie')

  public login = (email: string, password: string, cancelToken?: CancelToken) =>
    this.instance.post<LoginApiResponse>(
      '/api/login',
      {
        email,
        password,
      },
      { cancelToken }
    )

  public signUp = (
    name: string,
    email: string,
    password: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.post<LoginApiResponse>(
      '/api/register',
      {
        name,
        email,
        password,
      },
      { cancelToken }
    )

  public logout = (token: string, tokenType: string) =>
    this.instance.get<LogoutResponse>('/api/logout', {
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    })

  public getCurrentUser = (
    token: string,
    tokenType: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<CurrentUserResponse>('/api/currentUser', {
      cancelToken,
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    })
}

export default AuthApi
