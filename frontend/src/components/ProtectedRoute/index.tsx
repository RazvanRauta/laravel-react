/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 19:06
 */

import * as userActions from '@/redux/actions/user'

import React, { useEffect, useState } from 'react'
import axios, { CancelToken } from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Loader'
import { RootState } from '@/redux/rootReducer'
import { SIGN_IN_ROUTE } from '@/routes'
import { useHistory } from 'react-router-dom'

interface Props {
  component: React.ComponentType<any>
  path: string
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)
  const { token, tokenType } = useSelector((state: RootState) => state.auth)
  const Component = props.component
  const history = useHistory()
  const dispatch = useDispatch()

  const getCurrentUser = async (
    token: string,
    tokenType: string,
    cancelToken: CancelToken
  ) => {
    setLoading(true)
    try {
      await dispatch(userActions.setCurrentUser(token, tokenType, cancelToken))
      setLoading(false)
    } catch (error) {
      console.log(error)
      history.push(SIGN_IN_ROUTE)
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    if (token && tokenType) {
      getCurrentUser(token, tokenType, source.token)
    } else if (!token || !tokenType) {
      history.push(SIGN_IN_ROUTE)
    }
    return () => {
      source.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenType])

  return !loading ? <Component /> : <Loader />
}

export default ProtectedRoute
