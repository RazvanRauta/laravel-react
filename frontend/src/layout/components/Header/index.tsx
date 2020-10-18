/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:33
 */

import { Box, Button, Toolbar, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'
import useStyles from './styles'

const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component={Link}
          to={'/'}
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Amazing Real Estates
        </Typography>
        <Box display="flex">
          <Button
            component={Link}
            to={'/login'}
            variant="outlined"
            size="small"
          >
            Login
          </Button>
          <Button
            component={Link}
            to={'/signUp'}
            variant="outlined"
            size="small"
          >
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </Fragment>
  )
}

export default Header
