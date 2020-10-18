import AdvertsApi from '@/services/adverts-api'
import { SetAdvertsThunkAction } from '@/types'

export const SET_ADVERTS_DATA = 'SET_ADVERTS_DATA'

export const fetchAdverts = (page?: number): SetAdvertsThunkAction => async (
  dispatch
) => {
  try {
    const advertsApi = new AdvertsApi()
    const response = await advertsApi.getAdverts(page)
    dispatch({
      type: SET_ADVERTS_DATA,
      advertsData: response,
    })
  } catch (error) {
    console.log({ error })
  }
}
