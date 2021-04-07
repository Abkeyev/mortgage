import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";

const BccCollapseTitle = withStyles({
  root: {
    "& span": {
      color: "#000D1A",
    },
  },
})(ExpansionPanelSummary);

export default BccCollapseTitle;
