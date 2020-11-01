/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 01 2020
 * @ Time: 16:30
 */

import { CancelToken } from 'axios'
import { CurrentUserResponse } from '@/types'
import HttpClient from './http-client'

class UserApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

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

  public getAllUsers = (
    token: string,
    tokenType: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<CurrentUserResponse[]>('/api/users', {
      cancelToken,
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    })
}

export default UserApi
