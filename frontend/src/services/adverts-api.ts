/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 16:55
 */

import { AdvertsApiResponse, FiltersState } from '@/types'

import Advert from '@/models/advert'
import { CancelToken } from 'axios'
import HttpClient from './http-client'

class AdvertsApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

  public getAdverts = (
    page?: number,
    filters?: FiltersState,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<AdvertsApiResponse>('/api/advs', {
      cancelToken,
      params: {
        page,
        rooms: filters?.rooms ? filters?.rooms.join(',') : null,
        price: filters?.price ? filters?.price.join(',') : null,
      },
    })

  public getAdvert = (id: number, cancelToken?: CancelToken) =>
    this.instance.get<Advert>(`/api/adv/${id}`, {
      cancelToken,
    })

  public updateAdvert = (
    id: number,
    title: string,
    description: string,
    price: number,
    priceType: string,
    token: string,
    tokenType: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.put<Advert>(
      `/api/adv/${id}`,
      { title, description, price, priceType },
      {
        cancelToken,
        headers: {
          authorization: `${tokenType} ${token}`,
        },
      }
    )
}

export default AdvertsApi
