/**
 *  @author: Razvan Rauta
 *  Date: Oct 21 2020
 *  Time: 21:46
 */

import { Grid } from '@material-ui/core'
import ParseWebPage from '@/components/ParseWebPage'
import React from 'react'
import RegisteredUsers from '@/components/RegisteredUsers'

const SettingsPage: React.FC = () => (
  <Grid container>
    <Grid item>
      <ParseWebPage />
    </Grid>
    <Grid item>
      <RegisteredUsers />
    </Grid>
  </Grid>
)

export default SettingsPage
