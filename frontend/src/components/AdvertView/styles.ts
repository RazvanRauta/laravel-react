/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 29 2020
 * @ Time: 18:13
 */

import { Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    width: 600,
    maxWidth: '100%',
    margin: '20px 0',
    justifySelf: 'center',
    alignSelf: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      color: '#f44336',
    },
  },
  chip: {
    [theme.breakpoints.down('md')]: {
      fontSize: '11px',
    },
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
