/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:33
 */

import { Box, Button, Toolbar, Typography } from '@material-ui/core'
import { HOME_ROUTE, SETTINGS_ROUTE, SIGN_IN_ROUTE } from '@/routes'
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
          to={HOME_ROUTE}
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Amazing Real Estates
        </Typography>
        <Box display="flex" alignContent="center" justifyContent="space-around">
          <Button
            component={Link}
            to={SIGN_IN_ROUTE}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.button}
          >
            Sign In
          </Button>
          <Button
            component={Link}
            to={SETTINGS_ROUTE}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.button}
          >
            Settings
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.button}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </Fragment>
  )
}

export default Header
