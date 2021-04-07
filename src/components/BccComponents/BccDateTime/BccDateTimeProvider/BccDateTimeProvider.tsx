import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const BccDateTimeProvider = withStyles({})((props: any) => (
  <MuiPickersUtilsProvider {...props} />
))

export default BccDateTimeProvider
