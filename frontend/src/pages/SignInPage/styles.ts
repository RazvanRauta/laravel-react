import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      [theme.breakpoints.up('md')]: {
        borderRight: '1px solid white',
      },
      [theme.breakpoints.down('md')]: {
        borderBottom: '1px solid white',
        paddingBottom: '40px',
      },
    },
  })
)

export default useStyles
