import Badge from '@material-ui/core/Badge'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const BccBadge = withStyles({
  badge: {
    color: 'white',
    fontSize: 12,
  },
})((props: any) => <Badge {...props} />)

export default BccBadge
