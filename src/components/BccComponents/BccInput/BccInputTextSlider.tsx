import React, { useState } from "react";
import {
  TextField,
  Slider,
  TextFieldProps,
  InputLabelProps,
  OutlinedInputProps,
  Grid,
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import NumberFormat, { NumberFormatProps } from "react-number-format";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "56px",
      border: "1px solid #E8E8E8",
      borderBottom: 0,
      overflow: "hidden",
      borderRadius: 2,
      backgroundColor: "#FFFFFF",
      boxSizing: "border-box",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:hover": {
        backgroundColor: "#fff",
      },
      "&$focused": {
        backgroundColor: "#fff",
      },
    },
    focused: {},
    disabled: {
      backgroundColor: "#E6EAF0",
      color: "#8B98A7",
    },
  })
);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "-6px",
      marginBottom: "1px",
    },
  })
);

interface NumberFormatCustomProps extends NumberFormatProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      isNumericString
      thousandSeparator={" "}
    />
  );
};

const BccInputText = (
  props: TextFieldProps & {
    isNumeric?: boolean;
    maxLength?: number;
    shrink?: boolean;
  }
) => {
  const classes = useStyles();
  const classes2 = useStyles2();

  const {
    isNumeric,
    maxLength,
    shrink,
    inputProps,
    InputProps,
    ...others
  } = props;

  return (
    <TextField
      {...others}
      style={{ height: "56px" }}
      inputProps={{
        ...inputProps,
        maxLength,
      }}
      InputLabelProps={
        { classes: classes2, required: false, shrink: shrink } as Partial<
          InputLabelProps
        >
      }
      InputProps={
        {
          ...(InputProps as Partial<OutlinedInputProps>),
          classes,
          disableUnderline: true,
          inputComponent: isNumeric ? (NumberFormatCustom as any) : undefined,
        } as Partial<OutlinedInputProps>
      }
    />
  );
};

const PrettoSlider = withStyles({
  root: {
    color: "#27AE60",
  },
  thumb: {
    backgroundColor: "#27AE60",
  },
  rail: {
    backgroundColor: "#68c490",
  },
})(Slider);

interface BccInputTextSliderProps {
  unit: string;
  max: number;
  min: number;
  step?: number;
  value?: number;
  onValueChange: (v: number) => void;
}

const useStyles3 = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      marginTop: -13,
    },
    interval: {
      marginTop: -13,
      color: "#7C8793",
      fontSize: 13,
    },
  })
);

const BccInputTextSlider = (
  props: TextFieldProps & BccInputTextSliderProps
) => {
  const { unit, max, min, onValueChange, step, value, ...others } = props;

  const classes = useStyles3();

  const [val, setVal] = useState(value || min);

  return (
    <Grid container>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <BccInputText
          {...others}
          fullWidth={true}
          variant="filled"
          value={`${val} ${unit}`}
          onChange={(e: any) => {
            if (
              parseInt(e.target.value) <= max &&
              parseInt(e.target.value) !== val
            ) {
              onValueChange(parseInt(e.target.value));
              setVal(e.target.value);
            }
          }}
          isNumeric={true}
        />
        <PrettoSlider
          className={classes.slider}
          value={val}
          max={max}
          min={min}
          step={step}
          onChange={(e, newValue) => {
            onValueChange(newValue instanceof Array ? newValue[1] : newValue);
            setVal(newValue instanceof Array ? newValue[1] : newValue);
          }}
        />
      </Grid>
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.interval}
      >
        <Grid container>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Grid container justify="flex-start">
              <Grid item>
                <span>{min.toLocaleString()}</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
            <Grid container justify="flex-end">
              <Grid item>
                <span>{max.toLocaleString()}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BccInputTextSlider;
