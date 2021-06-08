import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Theme,
  makeStyles,
  createStyles,
  Grid,
} from "@material-ui/core";
import api from "../api/Api";
import { Task } from "../api/CamundaController";
import { history } from "../App";
// import { useSelector } from "react-redux";
// import pm from "core/helpers/ProcessManager";

const useStylesCircularProgressWithLabel = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      marginLeft: "auto",
    },
    bottomCircular: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    topCircular: {
      color: "#219653",
      position: "absolute",
      left: 0,
      top: 0,
    },
    text: {
      fontSize: 100,
      color: "#219653",
      fontWeight: "bold",
      position: "absolute",
      top: 0,
      marginTop: 180,
      marginLeft: 190,
    },
  })
);

function CircularProgressWithLabel(props: any) {
  const classes = useStylesCircularProgressWithLabel();

  return (
    <Grid container justify="center">
      <Grid item>
        <Box className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottomCircular}
            size={500}
            {...props}
            value={100}
          />
          <CircularProgress
            size={500}
            className={classes.topCircular}
            variant="static"
            {...props}
            value={props.value}
          />
          <Typography className={classes.text}>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

const CircularPercentLoader = (props: {
  frequency: number;
  frequencyCheckStatus: number;
  businesskey: string;
}) => {
  const { frequency, frequencyCheckStatus, businesskey } = props;
  const [progress, setProgress] = useState(0);
  const [frequencyState, setFrequencyState] = useState(frequency);
  const bKey = businesskey;

  const timerAnimationCallback = (task: Task) => {
    setProgress((prevProgress) => {
      if (!task?.definitionKey) {
        return prevProgress + 1 < 100 ? prevProgress + 1 : prevProgress;
      } else {
        if (task.definitionKey == "loader") {
          return prevProgress + 1 < 100 ? prevProgress + 1 : prevProgress;
        } else {
          if (prevProgress + 1 == 100) {
            history.push(`/${task.definitionKey}/${task.businessKey}`);
          }
          return prevProgress >= 100 ? 1 : prevProgress + 1;
        }
      }
    });
  };

  React.useEffect(() => {
    let timer = setInterval(() => timerAnimationCallback({}), frequencyState);

    const timerCheckStatus = setInterval(() => {
      api.camunda.getTaskBusinessKey(bKey).then((task) => {
        if (!!task) {
          if (task.definitionKey != "loader") {
            setFrequencyState(50);
            clearInterval(timerCheckStatus);
            clearInterval(timer);
            timer = setInterval(() => timerAnimationCallback(task), 50);
          }
        }
      });
    }, frequencyCheckStatus);

    return () => {
      clearInterval(timer);
      clearInterval(timerCheckStatus);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
};

export default CircularPercentLoader;
