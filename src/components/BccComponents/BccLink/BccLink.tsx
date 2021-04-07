import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";

const BccLink = withStyles({
  root: {
    fontSize: "inherit",
    color: "#27AE60",
    cursor: "pointer",
    fontWeight: "normal",
    textTransform: "none",
    letterSpacing: 0,
  },
})(Link);

export default BccLink;
