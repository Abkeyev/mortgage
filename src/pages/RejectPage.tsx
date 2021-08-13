import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import api from "../api/Api";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      backgroundColor: "#4DC188",
      color: "white",
      padding: "17px",
      width: "250px",
      borderRadius: "8px",
      marginBottom: "30px",
      marginTop: "20px",
    },
    [theme.breakpoints.between("md", "xl")]: {
      root: {
        flexGrow: 1,
        padding: theme.spacing(5),
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        height: "auto",
        boxSizing: "border-box",
      },
      BccText: {
        width: "720px",
        height: "auto",
        fontSize: "15px",
        padding: "0px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        color: "#000D1A",
      },
    },

    [theme.breakpoints.between("xs", "sm")]: {
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(5),
        textAlign: "center",
        height: "auto",
        boxSizing: "border-box",
      },
      h1: {
        fontSize: "24px",
      },
      h3: {
        fontSize: "16px",
      },
      BccText: {
        width: "auto",
        height: "auto",
        fontSize: "15px",
        padding: "10px",
        fontFamily: "Roboto",
        fontStyle: "normal",
        color: "#000D1A",
      },
    },
  })
);

const RejectPage = (props: { processInstanceId: string }) => {
  const classes = useStyles({});
  const history = useHistory();

  const { processInstanceId } = props;
  const [fullName, setFullName] = useState("");
  const [sex, setSex] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const handleClick = () => {
    history.push("/");
  };

  api.camunda.getTaskProcessInstanceId(processInstanceId).then((task) => {
    setFullName(task.variables.resultClientSearch[0].fullName);
    setSex(task.variables.resultClientSearch[0].sex);
    setBranchAddress(task.variables.client.branchAddress);
  });

  return (
    <Grid className={classes.root} justify="center">
      <Grid container justify="center">
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <img src={process.env.PUBLIC_URL + "/img/reject.svg"} />
            <h1 className={classes.h1}>
              {sex != "F" ? "Уважаемый" : "Уважаемая"} {fullName}!
            </h1>
            <h3 className={classes.h3}>
              К сожалению, при предварительном рассмотрении Вам
              <br />
              отказано в предоставлении ипотечного займа.
            </h3>
            <Grid container justify="center">
              <Grid className={classes.BccText}>
                <p>
                  Но данное решение не является окончательным и подлежит <br />
                  пересмотру.
                </p>
                <p>
                  Мы с радостью поможем Вам и ответим на все вопросы <br />в
                  отделении Банка ЦентрКредит по адресу:
                </p>
                <p>{branchAddress}</p>
                <p>
                  Также Вы можете подать заявку повторно, пересмотрев параметры
                  <br />
                  приобретаемой недвижимости.
                </p>
              </Grid>
            </Grid>
            <Grid>
              <Button
                className={classes.btn}
                variant="contained"
                onClick={handleClick}
              >
                Подать заявку повторно
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RejectPage;
