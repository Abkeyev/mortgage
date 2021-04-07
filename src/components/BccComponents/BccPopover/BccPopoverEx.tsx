import React from 'react'
import { BccPopover } from '../../BccComponents'
import BccTypography from '../BccTypography/BccTypography'
import BccButton from '../BccButton/BccButton'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {},
    paper: {
      padding: theme.spacing(1),
    },
  })
)

export default function MouseOverPopover() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <BccButton onClick={handleClick}>Кнопка</BccButton>
      <BccPopover
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
        <BccTypography type="p4">I use Popover.</BccTypography>
      </BccPopover>
    </div>
  )
}
