import React from 'react'
import BccButton from '../BccButton/BccButton'
import BccAlert from '../BccAlert/BccAlert'
import BccSnackbar from '../BccSnackbar/BccSnackbar'

export default function BccSnackbarEx() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <BccButton variant="text" color="primary" onClick={handleClick}>
        Открыть Snackbar
      </BccButton>
      <BccSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <BccAlert onClose={handleClose}>This is a success message!</BccAlert>
      </BccSnackbar>
    </div>
  )
}
