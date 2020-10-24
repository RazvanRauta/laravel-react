/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:52
 */

import { Grid } from '@material-ui/core'
import React from 'react'
import SignInFrom from '@/components/SignInForm'

const SignInPage: React.FC = () => (
  <Grid container>
    <Grid item>
      <SignInFrom />
    </Grid>
  </Grid>
)

export default SignInPage
