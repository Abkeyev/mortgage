import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const BccTooltip = withStyles({
  popper: {
    marginTop: 5,
  },
  tooltip: {
    backgroundColor: "#E9F7EF",
    color: "#000D1A",
    padding: "14px 16px",
    marginTop: 0,
    fontSize: 14,
    fontWeight: "normal",
    maxWidth: "360px",
    boxShadow: "0px 4px 8px rgba(31, 112, 66, 0.2)",
  },
  arrow: {
    color: "#E9F7EF",
  },
})((props: any) => <Tooltip {...props} />);

export default BccTooltip;
