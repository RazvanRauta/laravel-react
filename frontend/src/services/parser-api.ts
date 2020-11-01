import { ParserRunApiResponse, ParserStatusApiResponse } from '@/types'

import { CancelToken } from 'axios'
import HttpClient from './http-client'

class ParserApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL ?? '')
  }

  public getParserStatus = (
    token: string,
    tokenType: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.get<ParserStatusApiResponse>('/api/parserStatus', {
      cancelToken,
      headers: {
        authorization: `${tokenType} ${token}`,
      },
    })

  public startParser = (
    startingPageNumber: number,
    maxNumberOfPages: number,
    token: string,
    tokenType: string,
    cancelToken?: CancelToken
  ) =>
    this.instance.post<ParserRunApiResponse>(
      '/api/parserRun',
      {
        startingPageNumber,
        maxNumberOfPages,
      },
      {
        cancelToken,
        headers: {
          authorization: `${tokenType} ${token}`,
        },
      }
    )
}

export default ParserApi
