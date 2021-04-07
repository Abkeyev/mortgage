import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const BccBreadcrumbs = withStyles({
  root: {
    "& span": {
      color: "#4D565F",
    },
  },
})((props: any) => (
  <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} {...props} />
));

export default BccBreadcrumbs;
