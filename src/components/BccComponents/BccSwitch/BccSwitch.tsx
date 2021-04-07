import React from 'react'
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}

interface Props extends SwitchProps {
  classes: Styles
}

const BccSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 36,
      height: 16,
      padding: 0,
      margin: theme.spacing(1),
      overflow: 'visible',
    },
    switchBase: {
      padding: 2,
      '&$checked': {
        transform: 'translateX(20px)',
        color: 'white',
        '& + $track': {
          backgroundColor: '#27AE60',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#27AE60',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 12,
      height: 12,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: '#CCCFD1',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

export default BccSwitch
