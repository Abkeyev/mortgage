import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

const BccAlert = withStyles({
  root: {
    fontSize: "16px",
    padding: 8,
  },
  action: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 16,
  },
  standardError: {
    border: "1px solid #C84F4F",
    backgroundColor: "white",
    "& > div": {
      color: "#C84F4F!important",
    },
  },
  standardSuccess: {
    color: "#27AE60",
  },
})((props: any) => <MuiAlert {...props} />);

export default BccAlert;
