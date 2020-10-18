/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:18
 */

import { Container } from '@material-ui/core'
import React, { Fragment } from 'react'
import useStyles from './styles'

const Main: React.FC = ({ children }) => {
  const classes = useStyles()
  return (
    <Container component="main" className={classes.main} maxWidth="sm">
      <Fragment>{children}</Fragment>
    </Container>
  )
}

export default Main
