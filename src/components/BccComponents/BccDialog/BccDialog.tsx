import Dialog from '@material-ui/core/Dialog'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const BccDialog = withStyles({
  root: {
    '& .MuiPaper-rounded': {
      borderRadius: 0,
    },
  },
})((props: any) => <Dialog {...props} />)

export default BccDialog
