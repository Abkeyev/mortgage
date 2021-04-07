import { KeyboardDateTimePicker } from '@material-ui/pickers'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'

const BccDateTimePicker = withStyles({
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
  <KeyboardDateTimePicker
    cancelLabel="Отмена"
    inputVariant="outlined"
    {...props}
  />
))

export default BccDateTimePicker
