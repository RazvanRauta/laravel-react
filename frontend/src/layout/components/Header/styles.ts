/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 12:39
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(3, 2),
    justifyContent: 'space-between',
    background:
      theme.palette.type === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  },
  toolbarTitle: {
    textDecoration: 'none',
  },
  button: {
    margin: '0 5px',
  },
}))

export default useStyles
