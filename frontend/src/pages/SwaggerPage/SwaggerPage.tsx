/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 13:13
 */

import 'swagger-ui-react/swagger-ui.css'

import { Box, Container, Typography, useMediaQuery } from '@material-ui/core'

import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import useStyles from './styles'

const Swagger: React.FC = () => {
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:750px)')

  return (
    <Container className={classes.root}>
      {!matches ? (
        <SwaggerUI
          url={
            typeof process.env.REACT_APP_API_URL !== 'undefined'
              ? `${process.env.REACT_APP_API_URL}/api/docs`
              : '/api/docs'
          }
        />
      ) : (
        <Box
          width="90vw"
          height="60vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5">
            Sorry, Api Docs are not available on mobile devices
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Swagger
