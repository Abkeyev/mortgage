import React, { useState } from "react";
import { BccTypography } from "../components/BccComponents";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import api from "../api/Api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerContainer: {
      background: "#FAFAFA",
    },
    container: {
      maxWidth: 1280,
      margin: "0 auto",
      boxSizing: "border-box",
      padding: "30px 48px 80px",
    },
    code: {
      margin: 0,
      "& input": {
        height: 62,
        boxSizing: "border-box",
      },
    },
    timer: {
      fontSize: 16,
      color: "#4D565F",
    },
    paymentWrap: {
      position: "relative",
      marginBottom: 40,
      width: 360,
    },
    sliderWrap: {
      position: "relative",
      width: "100%",
    },
    input: {
      display: "block",
      width: "100%",
      "& > div": {
        width: "inherit",
      },
    },
    inputSlider: {
      display: "block",
      width: "100%",
      "& > div": {
        width: "inherit",
      },
    },
    sliderRange: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -20,
      color: "#b3b6ba",
      display: "flex",
      justifyContent: "space-between",
      fontSize: 12,
    },
    privateDate: {
      "& > div": {
        display: "flex",
        flexDirection: "column",
      },
    },
    inputStyle: {
      marginBottom: 24,
      textAlign: "left",
      "& p": {
        fontSize: 14,
        marginTop: 4,
        whiteSpace: "break-spaces",
        opacity: 0.7,
        padding: 0,
        margin: 0,
      },
    },
    inputStyleLast: {
      width: 360,
      textAlign: "left",
    },
    sum: {
      marginLeft: 140,
      marginTop: 52,
      backgroundColor: "white",
      padding: 20,
      height: "max-content",
      borderRadius: 8,
    },
    firstBlock: {
      width: 360,
    },
    checkboxText: {
      alignItems: "center",
      marginBottom: 48,
    },
    btn: {
      minWidth: 320,
    },
    btnCode: {
      width: "100%",
    },
    block: {
      display: "block",
      margin: "36px auto 0",
      width: "60%",
      boxSizing: "border-box",
      backgroundColor: "white",
      padding: 48,
      boxShadow:
        "0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
    },
    blockInner: {
      margin: "0 36px",
      padding: "26px 26px 16px",
      textAlign: "center",
      backgroundColor: "rgba(125, 206, 160, 0.1)",
    },
    menuBranch: {
      display: "block",
      "& > p": {
        fontSize: 14,
        marginTop: 2,
        opacity: 0.7,
        padding: 0,
        margin: 0,
      },
    },
    linkReSendSms: {
      color: "#3F0259",
      fontSize: 16,
      height: "auto",
      padding: 0,
      lineHeight: "initial",
      cursor: "pointer",
      textTransform: "none",
      "&:hover, &:active": {
        textDecoration: "underline",
        opacity: 0.8,
      },
    },
  })
);

const RejectPage = (props: { businessKey: string }) => {
  const classes = useStyles({});

  const { businessKey } = props;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddlename] = useState("");

  api.camunda.getTaskBusinessKey(businessKey).then((task) => {
    console.log("Task:", task.variables.client.name);
    setName(task.variables.client.name);
    setSurname(task.variables.client.surname);
    setMiddlename(task.variables.client.middle_name);
  });

  return (
    <div className={classes.block}>
      <div className={classes.blockInner}>
        <img src={process.env.PUBLIC_URL + "/img/res2.svg"} />
        <BccTypography type="h6" color="#1F7042" block mt="26px" mb="26px">
          Уважаемый {`${name} ${surname} ${middleName}`}!<br />
          К сожалению, по предоставленным Вами данным, при предварительном
          рассмотрении ипотечного займа Вам отказано.
          <br />
          Для окончательного решения рекомендуем пересмотреть параметры
          приобретаемой недвижимости и повторно подать заявку.
        </BccTypography>
      </div>
    </div>
  );
};

export default RejectPage;
