/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 20 2020
 * @ Time: 21:42
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '40px 0',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: 5,
  },
}))

export default useStyles
