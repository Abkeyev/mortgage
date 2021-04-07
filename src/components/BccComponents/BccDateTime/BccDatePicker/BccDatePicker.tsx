import { KeyboardDatePicker } from '@material-ui/pickers'
import { withStyles, createMuiTheme } from '@material-ui/core/styles'
import React from 'react'

const BccDatePicker = withStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#CCCFD1',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#80868C',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#27AE60',
      borderWidth: 1,
    },
  },
})((props: any) => (
  <KeyboardDatePicker cancelLabel="Отмена" inputVariant="outlined" {...props} />
))

export default BccDatePicker
