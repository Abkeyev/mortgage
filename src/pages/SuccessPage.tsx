import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import api from "../api/Api";
import { useHistory } from "react-router-dom";
import { Grid, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      resultDesc: {
        textAlign: "end",
        lineHeight: "20px",
      },
      resultText: {
        textAlign: "start",
        color: "#00A755",
        fontSize: "16px",
        fontStyle: "normal",
        fontFamily: "Roboto",
        lineHeight: "20px",
        marginLeft: "10px",
      },
      BccText: {
        width: "720px",
        height: "auto",
        fontSize: "15px",
        padding: "10px",
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
      resultDesc: {
        textAlign: "end",
        fontSize: "13px",
        lineHeight: "15px",
      },
      resultText: {
        textAlign: "start",
        color: "#00A755",
        fontSize: "13px",
        fontStyle: "normal",
        fontFamily: "Roboto",
        lineHeight: "15px",
        marginLeft: "10px",
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

const SuccessPage = (props: { processInstanceId: string }) => {
  const classes = useStyles({});
  const history = useHistory();

  const { processInstanceId } = props;

  const [fullName, setFullName] = useState("");
  const [creditSum, setCreditSum] = useState("");
  const [term, setTerm] = useState("");
  const [mPayment, setPayment] = useState("");
  const [branchAddress, setBranchAddress] = useState("");

  const handleClick = () => {
    history.push("/");
  };

  api.camunda.getTaskProcessInstanceId(processInstanceId).then((task) => {
    setFullName(task.variables.resultClientSearch[0].firstName);

    setCreditSum(task.variables.creditSum);
    setTerm(task.variables.term);
    setPayment(task.variables.mPayment);
    setBranchAddress(task.variables.client.branchAddress);
  });

  return (
    <Grid className={classes.root} justify="center">
      <Grid container justify="center">
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper} elevation={5}>
            <img src={process.env.PUBLIC_URL + "/img/success.svg"} />
            <h1 className={classes.h1}>Поздравляем, {fullName}!</h1>
            <h3 className={classes.h3}>
              Банк одобрил Вашу заявку* на ипотечный заем
              <br />
              на следующих условиях:
            </h3>
            <Grid container justify="center">
              <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={5}
                xs={5}
                className={classes.resultDesc}
              >
                <b>Сумма:</b>
                <br />
                <b>Срок:</b>
                <br />
                <b>Ежемесячный платеж:</b>
              </Grid>
              <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={5}
                xs={5}
                className={classes.resultText}
              >
                {creditSum} тг
                <br />
                {term} мес.
                <br />
                <br />
                {mPayment} тг
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid className={classes.BccText}>
                <p>
                  Мы с радостью ответим на Ваши вопросы и расскажем подробнее об
                  ипотечной программе! Ждем Вас в отделении Банка ЦентрКредит по
                  адресу:
                </p>
                <p>{branchAddress}</p>
                <p>
                  *Уведомляем Вас, что условия выдачи займа по предварительному
                  решению могут отличаться от условий, установленных
                  окончательным решением
                </p>
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                onClick={handleClick}
                style={{
                  backgroundColor: "#4DC188",
                  color: "white",
                  padding: "17px",
                  width: "200px",
                  borderRadius: "8px",
                  marginBottom: "30px",
                }}
              >
                Отлично!
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuccessPage;
