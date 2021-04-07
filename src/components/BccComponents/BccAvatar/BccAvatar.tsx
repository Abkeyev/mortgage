import React from 'react'
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: 'white!important',
      backgroundColor: '#27AE60!important',
    },
  })
)

const BccAvatar = withStyles({
  root: {
    backgroundColor: 'white',
    color: '#4D565F',
  },
})((props: any) => {
  const classes = useStyles()
  return <Avatar className={props.green ? classes.green : ''} {...props} />
})

export default BccAvatar
