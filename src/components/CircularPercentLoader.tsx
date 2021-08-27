import React, { useState, useEffect } from "react";
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
    [theme.breakpoints.down("sm")]: {
      root: {
        position: "relative",
        left: "50%",
        top: 50,
        transform: "TranslateX(-50%)",
        width: 200,
        height: "300px",
      },
      textNotif: {
        fontSize: 16,
      },
      text: {
        fontSize: 50,
        marginTop: 50,
        left: "50%",
        top: "15px",
        marginLeft: 0,
        transform: "TranslateX(-50%)",
      },
      rootWrapper: {
        height: "100vh",
      },
    },
  })
);

function CircularProgressWithLabel(props: any) {
  const classes = useStylesCircularProgressWithLabel();
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile: boolean = width <= 768;
  const sizeDesktop = 500;
  const sizeMobile = 200;
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.rootWrapper}
    >
      <Grid item>
        <Box className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottomCircular}
            size={isMobile ? sizeMobile : sizeDesktop}
            {...props}
            value={100}
          />
          <CircularProgress
            size={isMobile ? sizeMobile : sizeDesktop}
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
