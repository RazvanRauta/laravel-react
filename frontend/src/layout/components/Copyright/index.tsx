/**
 * @author: Razvan Rauta
 * Date: Oct 18 2020
 * Time: 12:05
 */

import { Link, Typography } from '@material-ui/core'

import React from 'react'

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://rrazvan.dev" target="_blank">
        RRazvan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
