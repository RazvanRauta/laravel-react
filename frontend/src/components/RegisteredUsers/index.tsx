/**
 *  @author: Razvan Rauta
 *  Date: Nov 01 2020
 *  Time: 16:22
 */

import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios, { CancelToken } from 'axios'

import { RootState } from '@/redux/rootReducer'
import { SupervisedUserCircle } from '@material-ui/icons'
import User from '@/models/user'
import UserApi from '@/services/user-api'
import { useSelector } from 'react-redux'
import useStyles from './styles'

interface UsersState {
  users: User[] | null
}

const RegisteredUsers: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [usersList, setUsersList] = useState<UsersState>({ users: null })
  const { token, tokenType } = useSelector((state: RootState) => state.auth)
  const classes = useStyles()

  const getUsersList = async (cancelToken: CancelToken) => {
    try {
      setLoading(true)
      if (token && tokenType) {
        const userApi = new UserApi()
        const data = await userApi.getAllUsers(token, tokenType, cancelToken)
        setLoading(false)
        if (data) {
          const listOfUser: User[] = []
          data.forEach((usr) => {
            const user = new User(usr.name, usr.email)
            listOfUser.push(user)
          })
          if (listOfUser.length) {
            setUsersList({ users: [...listOfUser] })
          }
        }
      }
    } catch (error) {
      console.log({ error })
      setLoading(false)
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    getUsersList(source.token)
    return () => {
      source.cancel()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="20px auto"
      className={classes.container}
    >
      <Typography variant="h5">List of Users</Typography>
      {!loading && usersList.users ? (
        <>
          <div className={classes.root}>
            <List>
              {usersList.users.map((user) => (
                <ListItem key={user.email}>
                  <ListItemAvatar>
                    <Avatar>
                      <SupervisedUserCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
              ))}
            </List>
          </div>
          <Typography
            className={classes.infoTip}
            gutterBottom
            variant="subtitle2"
          >
            All registered users will receive e-mails when a new advert is found
            by the parser
          </Typography>
        </>
      ) : (
        <Box
          display="flex"
          width="50%"
          height="200px"
          mx="auto"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" size={20} />
        </Box>
      )}
    </Box>
  )
}

export default RegisteredUsers
