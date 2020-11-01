/**
 *  @author: Razvan Rauta
 *  Date: Oct 18 2020
 *  Time: 12:33
 */

import * as authActions from '@/redux/actions/auth'
import * as userActions from '@/redux/actions/user'

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import React, { Fragment, useEffect } from 'react'
import { SETTINGS_ROUTE, SIGN_IN_ROUTE } from '@/routes'
import { useDispatch, useSelector } from 'react-redux'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import { RootState } from '@/redux/rootReducer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useStyles from './styles'

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const matches = useMediaQuery('(max-width:600px)')

  const user = useSelector((state: RootState) => state.user.user)
  const { token, tokenType } = useSelector((state: RootState) => state.auth)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    if (token && tokenType) await dispatch(authActions.logout(token, tokenType))
    await dispatch(userActions.removeCurrentUser())
    history.push(SIGN_IN_ROUTE)
  }

  const handleReset = async () => {
    history.push('/')
    window.location.reload()
  }

  const getCurrentUser = async (token: string, tokenType: string) => {
    try {
      await dispatch(userActions.setCurrentUser(token, tokenType))
    } catch (error) {
      await dispatch(authActions.removeTokens())
      await dispatch(userActions.removeCurrentUser())
    }
  }

  useEffect(() => {
    if (token && tokenType) getCurrentUser(token, tokenType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenType])

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          onClick={handleReset}
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Amazing Real Estates
        </Typography>
        {!matches ? (
          <Box
            display="flex"
            alignContent="center"
            justifyContent="space-around"
          >
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
                to={{ pathname: 'https://ama.rrazvan.dev:28778' }}
                target="_blank"
                variant="outlined"
                color="secondary"
                size="small"
                className={classes.button}
              >
                Live Logs
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
        ) : user ? (
          <>
            {user && (
              <Box mx={2}>
                <Avatar>{user.name[0].toUpperCase()}</Avatar>
              </Box>
            )}
            <IconButton
              aria-label="more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: 130,
                  height: 180,
                },
              }}
            >
              {user && (
                <MenuItem onClick={handleClose}>
                  <Button
                    component={Link}
                    to={{ pathname: 'https://ama.rrazvan.dev:28778' }}
                    target="_blank"
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.button}
                  >
                    Live Logs
                  </Button>
                </MenuItem>
              )}
              {user && (
                <MenuItem onClick={handleClose}>
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
                </MenuItem>
              )}
              {user && (
                <MenuItem onClick={handleClose}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
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
      </Toolbar>
    </Fragment>
  )
}

export default Header
