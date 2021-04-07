import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { withStyles } from "@material-ui/core/styles";

const BccCollapseDetails = withStyles({
  root: {
    "& span": {
      color: "#4D565F",
    },
  },
})(ExpansionPanelDetails);

export default BccCollapseDetails;
