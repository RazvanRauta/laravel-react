/**
 * @ @author: Razvan Rauta
 * @ Date: Nov 01 2020
 * @ Time: 14:49
 */

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      marginTop: '20px',
      '& > *': {
        width: '100%',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 0,
      padding: 0,
    },
    successMessage: {
      color: 'green',
    },
    errorMessage: {
      color: 'red',
    },
    helperText: {
      marginTop: 20,
    },
  })
)

export default useStyles
