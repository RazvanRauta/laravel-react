/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 01 2020
 * @ Time: 17:01
 */

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '450px',
      maxWidth: '90vw',
    },
    root: {
      width: '300px',
      maxWidth: '100%',
      margin: '20px auto',
      height: 300,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    },
    infoTip: {
      maxWidth: '80%',
      margin: '0 auto 20px',
    },
  })
)

export default useStyles
