import React from 'react'
import BccInput from '../BccInput/BccInput'
import { BccSlider } from '../index'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {
      display: 'grid',
      gridGap: 10,
    },
    bccSlider: {
      position: 'relative',
    },
    slider: {
      position: 'absolute',
      left: 6,
      right: 6,
      padding: 0,
      bottom: -1,
      width: 'calc(100% - 12px)',
    },
  })
)

const BccSliderEx = (props: any) => {
  const [sum, setSum] = React.useState(0)
  const [period, setPeriod] = React.useState(0)
  const classes = useStyles()
  return (
    <div className={classes.wrap}>
      <div className={classes.bccSlider}>
        <BccInput
          label="Выберите сумму"
          InputLabelProps={{
            shrink: true,
          }}
          value={sum + ' ₸'}
          variant="filled"
        />
        <BccSlider
          className={classes.slider}
          min={0}
          max={1000000}
          step={50000}
          valueLabelDisplay="off"
          defaultValue={sum}
          onChange={(e: any, val: any) =>
            setSum(val instanceof Array ? val[1] : val)
          }
        />
      </div>
      <div className={classes.bccSlider}>
        <BccInput
          label="Выберите срок"
          InputLabelProps={{
            shrink: true,
          }}
          value={period + ' год'}
          variant="filled"
        />
        <BccSlider
          marks
          className={classes.slider}
          min={0}
          max={4}
          step={1}
          onChange={(e: any, val: any) =>
            setPeriod(val instanceof Array ? val[1] : val)
          }
        />
      </div>
    </div>
  )
}

export default BccSliderEx
