/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 01 2020
 * @ Time: 13:06
 */

import { Box, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import ParserApi from '@/services/parser-api'
import { RootState } from '@/redux/rootReducer'
import RunParserForm from '../RunParserForm'
import { useSelector } from 'react-redux'
import useStyles from './styles'

interface Props {}

let intervalId = 0

const ParseWebPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const classes = useStyles()

  const { token, tokenType } = useSelector((state: RootState) => state.auth)

  const parserApi = new ParserApi()

  useEffect(() => {
    setLoading(true)
    checkParserStatus()
    return () => clearInterval(intervalId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkParserStatus = () => {
    intervalId = window.setInterval(async () => {
      try {
        if (token && tokenType) {
          const response = await parserApi.getParserStatus(token, tokenType)
          setLoading(false)
          if (response.working) {
            setInProgress(true)
          } else {
            setInProgress(false)
          }
        } else {
          clearInterval(intervalId)
          setInProgress(false)
          setLoading(false)
        }
      } catch (error) {
        console.log({ error })
        clearInterval(intervalId)
        setInProgress(false)
        setLoading(false)
      }
    }, 2000)
  }

  return (
    <Box>
      {!loading ? (
        <>
          <RunParserForm inProgress={inProgress} />
          <Box mt={5}>
            <Typography gutterBottom>
              Current parser status:
              {inProgress ? (
                <span style={{ color: 'green', marginLeft: '10px' }}>
                  Running.
                  <CircularProgress
                    color="secondary"
                    size={20}
                    className={classes.loaderSmall}
                  />
                </span>
              ) : (
                <span style={{ color: 'red', marginLeft: '10px' }}>
                  Not Running.
                </span>
              )}
            </Typography>
          </Box>
        </>
      ) : (
        <Box display="flex" flexDirection="row">
          <Typography>Checking current status of the parser...</Typography>
          <CircularProgress
            color="secondary"
            size={30}
            className={classes.loader}
          />
        </Box>
      )}
    </Box>
  )
}

export default ParseWebPage
