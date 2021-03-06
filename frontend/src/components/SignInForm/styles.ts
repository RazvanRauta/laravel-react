/**
 * @ @author: Razvan Rauta
 * @ Date: Oct 24 2020
 * @ Time: 19:45
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
      '& > *': {
        width: '100%',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
  })
)

export default useStyles
