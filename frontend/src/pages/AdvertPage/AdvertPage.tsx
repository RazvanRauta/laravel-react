/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:52
 */

import React, { useEffect, useState } from 'react'
import axios, { CancelToken } from 'axios'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Advert from '@/models/advert'
import AdvertsApi from '@/services/adverts-api'
import { NOT_FOUND_ROUTE } from '@/routes'

const AdvertPage: React.FC = () => {
  const [adv, setAdv] = useState<Advert>()
  const [loading, setLoading] = useState<boolean>(false)
  
  console.log({adv,loading})

  const match = useRouteMatch()
  const history = useHistory()

  const fetchAdvData = async (id: number, cancelToken: CancelToken) => {
    try {
      setLoading(true)
      const advertsApi = new AdvertsApi()
      const response = await advertsApi.getAdvert(id, cancelToken)
      setAdv(new Advert({ ...response }))
      setLoading(false)
    } catch (err) {
      history.push(NOT_FOUND_ROUTE)
      console.log(err?.response?.data ?? 'Adv not found')
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    //@ts-ignore
    const { id } = match.params
    if (id) {
      fetchAdvData(parseInt(id), source.token)
    } else {
      history.push(NOT_FOUND_ROUTE)
    }

    return () => {
      source.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>AdvertPage Component</div>
}

export default AdvertPage
