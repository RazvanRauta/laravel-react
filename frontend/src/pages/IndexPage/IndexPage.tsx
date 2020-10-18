/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import * as advertsActions from '@/redux/actions/adverts'

import { Container, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '@/components/Loader'
import { Pagination } from 'react-laravel-paginex'
import { RootState } from '@/redux/rootReducer'

const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const advertsData = useSelector(
    (state: RootState) => state.advertsData.advertsData
  )
  const dispatch = useDispatch()

  const adverts = advertsData?.data!

  const getData = async (data?: any) => {
    setLoading(true)
    try {
      await dispatch(advertsActions.fetchAdverts(data?.page))
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!loading ? (
        <Container style={{ width: '100%', height: '100%' }}>
          {adverts &&
            adverts.map((advert) => (
              <Typography key={advert.id}>{advert.title}</Typography>
            ))}
        </Container>
      ) : (
        <Loader />
      )}
      <Pagination changePage={getData} data={advertsData ?? {}} />
    </>
  )
}

export default IndexPage
