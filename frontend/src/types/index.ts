import Advert from '@/models/advert'

export interface PaginationLinks {
  url: string
  label: any
  active: boolean
}

export interface AdvertsApiResponse {
  current_page: number
  data: Advert[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PaginationLinks[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}
