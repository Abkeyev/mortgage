import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Theme,
  makeStyles,
  createStyles,
  Grid,
  TextField,
} from "@material-ui/core";
import api from "../api/Api";
import { Task } from "../api/CamundaController";
import { history } from "../App";
import { BccTypography } from "./BccComponents";

const useStylesCircularProgressWithLabel = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      left: 0,
      top: 50,
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
    textNotif: {
      fontSize: 22,
      color: "#219653",
      position: "relative",
      textAlign: "center",
      left: 0,
      top: 70,
    },
  })
);

function CircularProgressWithLabel(props: any) {
  const classes = useStylesCircularProgressWithLabel();

  return (
    <Grid container alignItems="center" justify="center">
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
        <Typography className={classes.textNotif}>
          Ожидайте, мы принимаем решение
        </Typography>
      </Grid>
    </Grid>
  );
}

const CircularPercentLoader = (props: {
  frequency: number;
  frequencyCheckStatus: number;
  processInstanceId: string;
}) => {
  const { frequency, frequencyCheckStatus, processInstanceId } = props;
  const [progress, setProgress] = useState(0);
  const [frequencyState, setFrequencyState] = useState(frequency);

  const timerAnimationCallback = (task: Task) => {
    setProgress((prevProgress) => {
      if (!task?.definitionKey) {
        return prevProgress + 1 < 100 ? prevProgress + 1 : prevProgress;
      } else {
        if (task.definitionKey == "loader") {
          return prevProgress + 1 < 100 ? prevProgress + 1 : prevProgress;
        } else {
          if (prevProgress + 1 == 100) {
            history.push(`/${task.definitionKey}/${task.processInstanceId}`);
          }
          return prevProgress >= 100 ? 1 : prevProgress + 1;
        }
      }
    });
  };

  React.useEffect(() => {
    let timer = setInterval(() => timerAnimationCallback({}), frequencyState);

    const timerCheckStatus = setInterval(() => {
      api.camunda.getTaskProcessInstanceId(processInstanceId).then((task) => {
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
