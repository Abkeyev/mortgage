import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chipStyle: {
      fontWeight: 300,
      display: "inline-block",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 12,
      lineHeight: "12px",
      padding: "8px 12px",
      borderRadius: 30,
    },
    block: {
      display: "block",
    },
    filled: {},
    outlined: {},
    fPrimary: {
      color: "white",
      backgroundColor: "#27AE60",
    },
    fSecondary: {
      color: "white",
      backgroundColor: "#4D565F",
    },
    fSale: {
      color: "white",
      backgroundColor: "#E3266A",
    },
    oPrimary: {
      color: "#27AE60",
      border: "1px solid #27AE60",
    },
    oSecondary: {
      color: "#4D565F",
      border: "1px solid #4D565F",
    },
    oSale: {
      color: "#E3266A",
      border: "1px solid #E3266A",
    },
  })
);

interface BccChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: any;
  weight?: "normal" | "medium" | "bold";
  block?: boolean;
  mt?: string | "0";
  mr?: string | "0";
  mb?: string | "0";
  ml?: string | "0";
  type: "filled" | "outlined";
  color: "primary" | "secondary" | "sale";
  className?: string;
}

const BccChip = (props: BccChipProps) => {
  const classes = useStyles();
  const { type, color, block, mt, mr, mb, ml, className, children } = props;
  const typeOfChip = () => {
    if (type === "filled") {
      if (color === "primary") return classes.fPrimary;
      else if (color === "secondary") return classes.fSecondary;
      else if (color === "sale") return classes.fSale;
      else return classes.fPrimary;
    } else if (type === "outlined") {
      if (color === "primary") return classes.oPrimary;
      else if (color === "secondary") return classes.oSecondary;
      else if (color === "sale") return classes.oSale;
      else return classes.oPrimary;
    } else return classes.fPrimary;
  };
  return (
    <span
      className={`${classes.chipStyle} ${typeOfChip()} ${
        block ? classes.block : ""
      } ${className ? className : ""} `}
      style={{
        marginTop: mt,
        marginRight: mr,
        marginBottom: mb,
        marginLeft: ml,
      }}
    >
      {children}
    </span>
  );
};

export default BccChip;
