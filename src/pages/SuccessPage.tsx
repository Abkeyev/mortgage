import React, { useState } from "react";
import { BccButton, BccTypography } from "../components/BccComponents";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import api from "../api/Api";
import { useHistory } from "react-router-dom";

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

const SuccessPage = (props: { processInstanceId: string }) => {
  const classes = useStyles({});
  const history = useHistory();

  const { processInstanceId } = props;
  const [creditSum, setCreditSum] = useState("");
  const [term, setTerm] = useState("");
  const [mPayment, setPayment] = useState("");

  const handleClick = () => {
    history.push("/");
  };

  api.camunda.getTaskProcessInstanceId(processInstanceId).then((task) => {
    setCreditSum(task.variables.creditSum);
    setTerm(task.variables.term);
    setPayment(task.variables.mPayment);
  });

  return (
    <div className={classes.block}>
      <div className={classes.blockInner}>
        <img src={process.env.PUBLIC_URL + "/img/res1.svg"} />
        <BccTypography type="h6" color="#1F7042" block mt="26px" mb="26px">
          👏 Поздравляем, Вам одобрена предварительная заявка на ипотечный займ
          следующих условиях:
          <br />
          <br /> Сумма: {creditSum} тенге
          <br />
          Срок: {term} мес.
          <br />
          Ежемесячный платеж: {mPayment} тенге
          <br />
          <br />
          При этом уведомляем Вас, что условия выдачи займа по предварительному
          решению могут отличаться от условий установленных окончательным
          решением полномочного органа Банка
        </BccTypography>
        <BccButton variant="contained" onClick={handleClick}>
          Отправить повторно
        </BccButton>
      </div>
    </div>
  );
};

export default SuccessPage;
