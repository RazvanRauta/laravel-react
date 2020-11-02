import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white',
      '& .swagger-ui .info .title, & .swagger-ui table thead tr td,& .swagger-ui .tab li, & .swagger-ui .opblock .opblock-summary-description,& .swagger-ui .response-col_status,& .swagger-ui a.nostyle': {
        color: 'white !important',
      },
      '& .swagger-ui .btn,& .swagger-ui div.opblock-section-header h4,& .swagger-ui select': {
        color: '#202020',
      },
      '& .swagger-ui .scheme-container': {
        background: 'darkslateblue',
      },
    },
  })
)

export default useStyles
