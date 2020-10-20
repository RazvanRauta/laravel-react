/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import * as advertsActions from '@/redux/actions/adverts'

import { Box, Grid } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdvertCard from '@/components/AdvertCard'
import Loader from '@/components/Loader'
import Pagination from '@material-ui/lab/Pagination'
import { RootState } from '@/redux/rootReducer'
import useStyles from './styles'

const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const advertsData = useSelector(
    (state: RootState) => state.advertsData.advertsData
  )
  const dispatch = useDispatch()

  const adverts = advertsData?.data!
  const last_page = advertsData?.last_page ?? 1
  const current_page = advertsData?.current_page

  const getData = async (page?: number) => {
    setLoading(true)
    try {
      await dispatch(advertsActions.fetchAdverts(page))
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (_: any, page: number) => {
    getData(page)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="space-between"
    >
      {!loading ? (
        <Fragment>
          <Grid container alignItems="stretch" spacing={3} justify="center">
            {adverts &&
              adverts.map((advert) => (
                <Grid key={advert.id} item xs={12} md={6}>
                  <AdvertCard {...advert} />
                </Grid>
              ))}
          </Grid>
          <Pagination
            className={classes.pagination}
            page={current_page}
            count={last_page}
            siblingCount={1}
            onChange={handlePageChange}
            variant="outlined"
            color="secondary"
            hidePrevButton={current_page === 1}
            hideNextButton={current_page === last_page}
          />
        </Fragment>
      ) : (
        <Loader />
      )}
    </Box>
  )
}

export default IndexPage
