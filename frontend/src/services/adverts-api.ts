/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 16:55
 */

import Advert from '@/models/advert'
import { AdvertsApiResponse } from '@/types'
import { CancelToken } from 'axios'
import HttpClient from './http-client'

class AdvertsApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

  public getAdverts = (page?: number, cancelToken?: CancelToken) =>
    this.instance.get<AdvertsApiResponse>('/adverts', {
      cancelToken,
      params: {
        page,
      },
    })

  public getAdvert = (id: number, cancelToken?: CancelToken) =>
    this.instance.get<Advert>(`/adverts/${id}`, {
      cancelToken,
    })
}

export default AdvertsApi
