import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'

const BccInputLabel = withStyles({
  root: {
    color: '#4D565F',
    padding: '0 20px',
    fontSize: '16px',
    '& .MuiInputLabel-filled': {
      fontSize: 13,
    },
    '&.Mui-focused': {
      paddingTop: 10,
    },
  },
})(InputLabel)

export default BccInputLabel
