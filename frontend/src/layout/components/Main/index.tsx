/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:18
 */

import React, { Fragment } from 'react'

import { Container } from '@material-ui/core'
import useStyles from './styles'

const Main: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Container component="main" className={classes.main} maxWidth="md">
      <Fragment>{children}</Fragment>
    </Container>
  )
}

export default Main
