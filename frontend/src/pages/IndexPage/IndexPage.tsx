/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:14
 */

import * as advertsActions from '@/redux/actions/adverts'

import { AdvertsFilterValues, FiltersState } from '@/types'
import { Box, Fab, Grid, Snackbar, SwipeableDrawer } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import axios, { CancelToken } from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import AdvertCard from '@/components/AdvertCard'
import { Alert } from '@material-ui/lab'
import DrawerContent from '@/components/DrawerContent'
import { FilterList } from '@material-ui/icons'
import Loader from '@/components/Loader'
import { NOT_FOUND_ROUTE } from '@/routes'
import Pagination from '@material-ui/lab/Pagination'
import { RootState } from '@/redux/rootReducer'
import { parseFilters } from '@/utils'
import useStyles from './styles'

const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpened] = useState(false)
  const [error, setError] = useState(null)
  const classes = useStyles()
  const match = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()

  const advertsData = useSelector(
    (state: RootState) => state.advertsData.advertsData
  )

  const adverts = useSelector((state: RootState) => state.advertsData.adverts)
  const filters = useSelector((state: RootState) => state.advertsData.filters)
  const last_page = advertsData?.last_page ?? 1
  const current_page = advertsData?.current_page

  let filterForm: any = null

  const handleFiltersForm = async (e: any) => {
    if (filterForm) {
      await filterForm.submitForm(e)
    }
  }
  const bindSubmitForm = (
    submitForm: (() => Promise<void>) & (() => Promise<any>)
  ) => {
    filterForm = { submitForm }
  }

  const handleSubmit = async (values: AdvertsFilterValues) => {
    setLoading(true)
    try {
      const filters = parseFilters(values)
      await dispatch(advertsActions.setFilters(values))
      await dispatch(advertsActions.fetchAdverts(1, filters))
      window.history.pushState({}, ' 1', `/page/1`)
    } catch (error) {
      setError(error)
      await dispatch(advertsActions.resetFilters())
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getData = async (
    page?: number,
    filters?: FiltersState,
    cancelToken?: CancelToken
  ) => {
    setLoading(true)
    try {
      await dispatch(advertsActions.fetchAdverts(page, filters, cancelToken))
      setLoading(false)
    } catch (err) {
      console.log(err)
      history.push(NOT_FOUND_ROUTE)
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    //@ts-ignore
    const { id } = match.params

    getData(id, filters, source.token)

    return () => {
      source.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (_: any, page: number) => {
    getData(page, filters)
    window.history.pushState({}, `Page ${page}`, `/page/${page}`)
  }

  const toggleDrawer = (open: boolean) => async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    if (!open) {
      await handleFiltersForm(event)
    }

    setOpened(open)
  }

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setError(null)
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
          <Fab
            variant="extended"
            className={classes.fab}
            color="default"
            onClick={toggleDrawer(true)}
          >
            <FilterList className={classes.extendedIcon} />
            Filter
          </Fab>
          <SwipeableDrawer
            anchor={'left'}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <DrawerContent
              bindFiltersForm={bindSubmitForm}
              handleSubmit={handleSubmit}
            />
          </SwipeableDrawer>
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity="error">
              {`${error}`}
            </Alert>
          </Snackbar>
        </Fragment>
      ) : (
        <Loader />
      )}
    </Box>
  )
}

export default IndexPage
