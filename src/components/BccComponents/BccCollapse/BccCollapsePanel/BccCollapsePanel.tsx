import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import { withStyles } from "@material-ui/core/styles";

const BccCollapsePanel = withStyles({
  root: {
    marginBottom: 24,
    backgroundColor: "#FAFAFA",
    borderRadius: 4,
    minWidth: 350,
    borderColor: "transparent",
    boxShadow: "none",
    "&:before": {
      height: 0,
    },
  },
})(ExpansionPanel);

export default BccCollapsePanel;
