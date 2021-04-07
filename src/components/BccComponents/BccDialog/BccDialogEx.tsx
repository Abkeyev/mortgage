import React from 'react'
import BccDialog from '../BccDialog/BccDialog'
import BccDialogActions from '../BccDialog/BccDialogActions/BccDialogActions'
import BccDialogTitle from '../BccDialog/BccDialogTitle/BccDialogTitle'
import BccDialogContent from '../BccDialog/BccDialogContent/BccDialogContent'
import BccButton from '../BccButton/BccButton'
import BccTypography from '../BccTypography/BccTypography'

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <BccButton variant="outlined" onClick={handleClickOpen}>
        Открыть
      </BccButton>
      <BccDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BccDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <BccTypography type="h5">Заголовок</BccTypography>
        </BccDialogTitle>
        <BccDialogContent dividers>
          <BccTypography type="p1">
            Сохранить введенные вами данные и перейти к следуюшему шагу?
          </BccTypography>
        </BccDialogContent>
        <BccDialogActions>
          <BccButton
            autoFocus
            onClick={handleClose}
            variant="contained"
            size="small"
            color="primary"
          >
            Надпись
          </BccButton>
        </BccDialogActions>
      </BccDialog>
    </div>
  )
}
