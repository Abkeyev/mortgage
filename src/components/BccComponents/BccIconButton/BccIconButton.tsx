import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

const BccIconButton = withStyles({
  root: {},
})((props: any) => <IconButton disableRipple disableFocusRipple {...props} />)

export default BccIconButton
