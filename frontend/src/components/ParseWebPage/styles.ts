/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 01 2020
 * @ Time: 14:20
 */

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginLeft: 40,
    },
    loaderSmall: {
      marginLeft: 20,
    },
  })
)

export default useStyles
