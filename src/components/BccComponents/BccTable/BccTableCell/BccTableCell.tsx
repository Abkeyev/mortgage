import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const BccTableCell = withStyles({
  root: {
    color: "inherit",
    fontSize: 14,
    padding: 20,
    borderColor: "#F3F3F3",
  },
})((props: any) => <TableCell {...props} />);

export default BccTableCell;
