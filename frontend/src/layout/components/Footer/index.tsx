/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 12:00
 */

import { Container } from '@material-ui/core'
import React from 'react'
import Copyright from '../Copyright'
import useStyles from './styles'

const Footer: React.FC = () => {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  )
}

export default Footer
