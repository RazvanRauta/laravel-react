import AdvertsApi from '@/services/adverts-api'
import { CancelToken } from 'axios'
import { SetAdvertsThunkAction } from '@/types'

export const SET_ADVERTS_DATA = 'SET_ADVERTS_DATA'

export const fetchAdverts = (
  page?: number,
  cancelToken?: CancelToken
): SetAdvertsThunkAction => async (dispatch) => {
  try {
    const advertsApi = new AdvertsApi()
    const response = await advertsApi.getAdverts(page, cancelToken)
    dispatch({
      type: SET_ADVERTS_DATA,
      advertsData: response,
    })
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
