/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 16:55
 */

import Advert from '@/models/advert'
import { AdvertsApiResponse } from '@/types'
import HttpClient from './http-client'

class AdvertsApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

  public getAdverts = () => this.instance.get<AdvertsApiResponse>('/adverts')

  public getAdvert = (id: number) => this.instance.get<Advert>(`/adverts/${id}`)
}

export default AdvertsApi
