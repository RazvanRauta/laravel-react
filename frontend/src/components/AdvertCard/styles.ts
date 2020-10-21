/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 20 2020
 * @ Time: 20:58
 */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  media: {
    height: 220,
  },
  content: {
    height: '100%',
  },
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },
  divider: {
    margin: '10px 0 !important',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    margin: 0,
    padding: 0,
  },
})

export default useStyles
