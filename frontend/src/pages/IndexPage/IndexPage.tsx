/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import { Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import AdvertsApi from '@/services/adverts-api'

const IndexPage: React.FC = () => {
  const [adverts, setAdverts] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const advertsApi = new AdvertsApi()
    try {
      const res = await advertsApi.getAdverts()
    } catch (error) {
      console.log({ error })
    }
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  return !loading ? (
    <Typography variant="body1">IndexPage Component</Typography>
  ) : (
    <Loader />
  )
}

export default IndexPage
