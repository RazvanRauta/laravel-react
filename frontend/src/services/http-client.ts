/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 18:49
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
    })

    this._initializeResponseInterceptor()
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleResponse = ({ data: { data } }: AxiosResponse) => data

  protected _handleError = (error: any) => Promise.reject(error)
}

export default HttpClient
