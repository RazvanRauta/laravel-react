/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 18 2020
 * @ Time: 12:39
 */

import { Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
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
    cursor: 'pointer',
  },
  button: {
    margin: '0 5px',
  },
  [theme.breakpoints.down('xs')]: {
    toolbarTitle: {
      fontSize: 20,
    },
  },
}))

export default useStyles
