/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:52
 */

import { Grid } from '@material-ui/core'
import React from 'react'
import SignInFrom from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'
import useStyles from './styles'

const SignInPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item className={classes.item}>
        <SignInFrom />
      </Grid>
      <Grid item>
        <SignUpForm />
      </Grid>
    </Grid>
  )
}

export default SignInPage
