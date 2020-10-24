/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:33
 */

import * as authActions from '@/redux/actions/auth'
import * as userActions from '@/redux/actions/user'

import { Avatar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import { HOME_ROUTE, SETTINGS_ROUTE, SIGN_IN_ROUTE } from '@/routes'
import { Link, useHistory } from 'react-router-dom'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/redux/rootReducer'
import useStyles from './styles'

const Header: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector((state: RootState) => state.user.user)

  const handleLogout = async () => {
    await dispatch(authActions.logout())
    await dispatch(userActions.removeCurrentUser())
    history.push(SIGN_IN_ROUTE)
  }

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
          {!user && (
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
          )}
          {user && (
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
          )}
          {user && (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
          {user && (
            <Box mx={2}>
              <Avatar>{user.name[0].toUpperCase()}</Avatar>
            </Box>
          )}
        </Box>
      </Toolbar>
    </Fragment>
  )
}

export default Header
