import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Snackbar } from "@material-ui/core";
import {
  BccTypography,
  BccCheckbox,
  BccInput,
  BccLink,
  BccSlider,
  BccButton,
} from "./BccComponents";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MaskedInput from "react-maskedinput";
import BlockUi from "react-block-ui";
import { Alert as MuiAlert } from "@material-ui/lab";
import api from "../api/Api";
import { history } from "../App";

const webConfigEnv = (window as any).env;
const Alert = (props: any) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

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

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

const BccMaskedInput = (props: TextMaskCustomProps) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => inputRef(ref ? ref.inputElement : null)}
      mask="+7(111) 111 11 11"
      placeholder={"+7(707) 707 77 77"}
    />
  );
};

interface ProgramProps {
  title: string;
  code: string;
  spurcode: number;
}

interface City {
  id: string;
  code: string;
  rusName: string;
}

interface Branch {
  code: string;
  markers: Marker[];
}

interface Marker {
  depId: string;
  address: string;
}

const programms: ProgramProps[] = [
  {
    title: "7-20-25 Скоринг",
    code: "0.201.1.1123",
    spurcode: 139,
  },
  {
    title: "Ипотека Баспана-Хит ДДУ",
    code: "0.201.1.1129",
    spurcode: 150,
  },
  {
    title: "Собственная ипотека",
    code: "0.201.1.1131",
    spurcode: 112,
  },
  {
    title: "Собственная ипотека ДДУ",
    code: "0.201.1.1121",
    spurcode: 139,
  },
];

const BccMaskedIinInput = (props: TextMaskCustomProps) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => inputRef(ref ? ref.inputElement : null)}
      mask="111 111 111 111"
      placeholder={"000 000 000 000"}
    />
  );
};

const Order = (props: any) => {
  const classes = useStyles({});
  const [step, setStep] = useState(0);
  const [price, setPrice] = useState("15000000");
  const [priceMin, setPriceMin] = useState("1000000");
  const [priceMax, setPriceMax] = useState("50000000");
  const [pay, setPay] = useState("3000000");
  const [payMin, setPayMin] = useState("3000000");
  const [payMax, setPayMax] = useState("10000000");
  const [income, setIncome] = useState("100000");
  const [program, setProgram] = useState<ProgramProps | -1>(-1);
  const [cities, setCities] = useState<City[] | null>(null);
  const [city, setCity] = useState({} as City);
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [branch, setBranch] = useState({} as Marker);
  const [isLoading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [family, setFamily] = useState(-1);
  const [dependents, setDependents] = useState("0");
  const [iin, setIin] = useState("");
  const [code, setCode] = useState("");
  const [profession, setProfession] = useState(-1);
  const [email, setEmail] = useState("");
  const [period, setPeriod] = useState("180");
  const [periodMin, setPeriodMin] = useState("1");
  const [periodMax, setPeriodMax] = useState("300");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [openError, setOpenError] = useState(false);
  const [iinError, setIinError] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [analys, setAnalys] = useState<boolean | -1>(-1);

  React.useEffect(() => {
    let timeOut = setInterval(() => {
      if (timer !== 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(timeOut);
  }, [timer]);

  const formatPhoneNumber = () => {
    let res = phone;
    if (phone.slice(0, 1) === "8") res = "7" + phone.slice(1);
    return res.replace(/\(|\)| /g, "");
  };

  const isValid = () => {
    return (
      firstName.length > 1 &&
      secondName.length > 1 &&
      iin.length === 15 &&
      phone.replace("_", "").length === 17 &&
      program !== -1 &&
      agree &&
      profession !== -1 &&
      city.code !== ""
    );
  };

  const handleClose = () => {
    setOpenError(false);
  };

  const getOtp = () => {
    if (phone.substr(3, 1) !== "7") {
      setPhoneError(true);
      return;
    } else setPhoneError(false);
    setLoading(true);
    setTimer(60);
    api.authOtp
      .sendOtp({ iin: iin.replace(/ /g, ""), phone: formatPhoneNumber() })
      .then(() => {
        localStorage.removeItem("userContext");
        setStep(1);
        props.scrollToOrder(false);
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e);
        props.scrollToOrder(false);
        setLoading(false);
      });
  };

  const onSubmitOtp = () => {
    setLoading(true);
    api.authOtp
      .confirmOtp({
        iin: iin.replace(/ /g, ""),
        phone: formatPhoneNumber(),
        otp: code,
      })
      .then((userContext) => {
        props.scrollToOrder(false);
        localStorage.setItem("userContext", JSON.stringify(userContext));
        startProcess();
      })
      .catch((e: any) => {
        props.scrollToOrder(false);
        console.error(e);
        setLoading(false);
      });
  };

  const onReSend = () => {
    setLoading(true);
    api.authOtp
      .sendOtp({ iin: iin.replace(/ /g, ""), phone: formatPhoneNumber() })
      .then(() => {
        props.scrollToOrder(false);
        setTimer(90);
        setCode("");
        setLoading(false);
      })
      .catch((e: any) => {
        console.error(e);
        props.scrollToOrder(false);
        setLoading(false);
      });
  };

  const getRate = () => {
    if (program !== -1) {
      if (program.code === "0.201.1.1123") {
        return "7";
      } else if (program.code === "0.201.1.1129") {
        return "10.75";
      } else if (
        program.code === "0.201.1.1131" ||
        program.code === "0.201.1.1121"
      ) {
        if (analys) {
          if (+period <= 180) {
            if (+pay >= +price * 0.5) return "15.4";
          }
        } else {
          if (+period <= 120) {
            if (+pay >= +price * 0.7) {
              return "11";
            }
          } else if (+period <= 180) {
            if (+pay >= +price * 0.5) {
              return "12.99";
            } else if (+pay >= +price * 0.3) {
              return "15.5";
            }
          }
        }
      }
    }
  };

  const startProcess = () => {
    api.camunda
      .start({
        env: {
          production: webConfigEnv.PRODUCTION === "1",
        },
        client: {
          iin: iin.replace(/ /g, ""),
          city: city.code,
          depId: branch.depId,
          spurcode: program !== -1 && program.spurcode,
          fin_analys: analys === -1 ? "1" : (+!analys).toString(),
          name: secondName,
          surname: firstName,
          middle_name: thirdName,
          phone: formatPhoneNumber(),
          date: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
          prod_code: program !== -1 && program.code,
          initial_fee: +pay,
          cost: +price,
          term: period,
          rate: program !== -1 && getRate(),
          family_numb: dependents,
          marital_status: family,
          income: income,
          profession: profession,
          e_mail: email,
          agreement: agree,
        },
      })
      .then((res: any) => {
        history.push(`loader/${res?.businessKey}`);
      })
      .catch((e: any) => {
        console.error(e);
        setOpenError(true);
      });
  };

  useEffect(() => {
    api.reference
      .getCities()
      .then((res) => setCities(res))
      .catch((err) => console.error(err));

    api.reference
      .getCityBranches()
      .then((res) => setBranches(res))
      .catch((err) => console.error(err));
  }, []);

  const countMinPay = (
    pe: string,
    pr: string,
    an: boolean | -1,
    prg?: ProgramProps | -1
  ) => {
    if (
      (program !== -1 &&
        (program.code === "0.201.1.1121" || program.code === "0.201.1.1131")) ||
      (prg &&
        prg !== -1 &&
        (prg.code === "0.201.1.1121" || prg.code === "0.201.1.1131"))
    ) {
      if (an) {
        if (+pe <= 180) {
          setPayMin((+pr * 0.5).toString());
          setPay((+pr * 0.5).toString());
        }
      } else {
        if (+pe <= 120) {
          setPayMin((+pr * 0.7).toString());
          setPay((+pr * 0.7).toString());
        } else if (+pe <= 180) {
          setPayMin((+pr * 0.3).toString());
          setPay((+pr * 0.3).toString());
        } else {
          setPayMin("3000000");
          setPay("3000000");
        }
      }
    } else {
      setPayMin("3000000");
      setPay("3000000");
    }
  };

  return (
    <div className={classes.outerContainer} ref={props.refProp}>
      <div className={classes.container}>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Возникла непредвиденная ошибка!
          </Alert>
        </Snackbar>
        <BlockUi tag="div" blocking={isLoading}>
          {step === 0 ? (
            <>
              <BccTypography block type="h4" color="#4D565F" mb="28px">
                Ориентировочный расчет ипотеки
              </BccTypography>
              <Grid container wrap="nowrap" justify="space-between">
                <Grid item className={classes.firstBlock}>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Программа"
                    id="program"
                    name="program"
                    value={program}
                    onChange={(e: any) => {
                      if (e.target.value !== -1) {
                        setProgram(e.target.value);
                        if (e.target.value.code === "0.201.1.1123") {
                          setAnalys(-1);
                          setPeriodMin("3");
                          setPeriodMax("300");
                          if (
                            city.code === "ALM" ||
                            city.code === "AST" ||
                            city.code === "AKT" ||
                            city.code === "ATR" ||
                            city.code === "SMK"
                          ) {
                            setPriceMax("25000000");
                          } else if (city.code === "KAR") {
                            setPriceMax("20000000");
                          } else {
                            setPriceMax("15000000");
                          }
                          setAnalys(-1);
                          setPeriodMin("3");
                          setPeriodMax("180");
                          if (city.code === "ALM" || city.code === "AST") {
                            setPriceMax("35000000");
                          } else if (
                            city.code === "AKT" ||
                            city.code === "ATR" ||
                            city.code === "SMK"
                          ) {
                            setPriceMax("25000000");
                          } else if (city.code === "KAR") {
                            setPriceMax("20000000");
                          } else {
                            setPriceMax("15000000");
                          }
                        } else if (
                          e.target.value.code === "0.201.1.1121" ||
                          e.target.value.code === "0.201.1.1131"
                        ) {
                          setAnalys(false);
                          countMinPay(period, price, false, e.target.value);
                        }
                      }
                    }}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите программу</MenuItem>
                    {programms.map((b: any, index: number) => {
                      return (
                        <MenuItem key={index} value={b}>
                          {b.title}
                        </MenuItem>
                      );
                    })}
                  </BccInput>

                  <div className={classes.paymentWrap}>
                    <div className={classes.sliderWrap}>
                      <BccInput
                        label="Стоимость недвижимости"
                        key="price"
                        value={`${price.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${
                          price !== "" ? " ₸" : ""
                        }`}
                        variant="filled"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={() => setPrice("")}
                        onChange={(e: any) => {
                          const s = +e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          );
                          if (s > +priceMax) {
                            countMinPay(period, priceMax, analys);
                            setPrice(priceMax);
                          } else {
                            countMinPay(period, s.toString(), analys);
                            setPrice(s.toString());
                          }
                        }}
                        className={classes.input}
                      />
                      <BccSlider
                        style={{
                          left: 6,
                          right: 6,
                          width: "calc(100% - 12px)",
                          bottom: -1,
                          padding: 0,
                          position: "absolute",
                        }}
                        min={+priceMin}
                        max={+priceMax}
                        step={50000}
                        value={+price}
                        valueLabelDisplay="off"
                        defaultValue={+price}
                        onChange={(e: any, val: any) => {
                          let v =
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString();
                          countMinPay(period, v, analys);
                          setPrice(v);
                        }}
                      />
                      <div className={classes.sliderRange}>
                        <span>
                          {priceMin.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                        <span>
                          {priceMax.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {analys !== -1 && (
                    <Grid
                      container
                      justify="flex-start"
                      wrap="nowrap"
                      className={classes.checkboxText}
                    >
                      <Grid item>
                        <BccCheckbox
                          value="analys"
                          color="primary"
                          checked={analys}
                          onChange={() => {
                            countMinPay(period, price, !analys);
                            setAnalys(!analys);
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <BccTypography type="p3" ml="10px">
                          Без анализа платежеспособности
                        </BccTypography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Grid item className={classes.firstBlock}>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Местонахождение недвижимости"
                    id="code"
                    name="code"
                    value={city.code}
                    onChange={(e: any) => {
                      const result =
                        cities?.find((c) => c.code == e.target.value) ||
                        ({} as City);

                      if (program !== -1 && program.code === "0.201.1.1123") {
                        if (
                          result.code === "ALM" ||
                          result.code === "AST" ||
                          result.code === "AKT" ||
                          result.code === "ATR" ||
                          result.code === "SMK"
                        ) {
                          setPriceMax("25000000");
                        } else if (result.code === "KAR") {
                          setPriceMax("20000000");
                        } else {
                          setPriceMax("15000000");
                        }
                      } else if (
                        program !== -1 &&
                        program.code === "0.201.1.1129"
                      ) {
                        if (result.code === "ALM" || result.code === "AST") {
                          setPriceMax("35000000");
                        } else if (
                          result.code === "AKT" ||
                          result.code === "ATR" ||
                          result.code === "SMK"
                        ) {
                          setPriceMax("25000000");
                        } else if (result.code === "KAR") {
                          setPriceMax("20000000");
                        } else {
                          setPriceMax("15000000");
                        }
                      } else if (
                        (program !== -1 && program.code === "0.201.1.1121") ||
                        (program !== -1 && program.code === "0.201.1.1131")
                      ) {
                        countMinPay(period, price, false, program);
                      }

                      setCity(result);
                    }}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите город</MenuItem>
                    {cities?.map((b: City, index: number) => {
                      return (
                        b.code !== null && (
                          <MenuItem key={index} value={b.code}>
                            {b.rusName}
                          </MenuItem>
                        )
                      );
                    })}
                  </BccInput>

                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Отделение"
                    id="depId"
                    name="depid"
                    value={branch.address}
                    onChange={(e: any) => {
                      const result =
                        branches
                          ?.find((b) => b.code == city.id)
                          ?.markers?.find((m) => m.depId == e.target.value) ||
                        ({} as Marker);

                      setBranch(result);
                    }}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите отделение</MenuItem>
                    {branches
                      ?.find((b) => b.code == city.id)
                      ?.markers.map((m, i) => (
                        <MenuItem key={i} value={m.depId}>
                          {m.address}
                        </MenuItem>
                      ))}
                  </BccInput>

                  <div className={classes.paymentWrap}>
                    <div className={classes.sliderWrap}>
                      <BccInput
                        label="Первоначальный взнос"
                        key="pay"
                        value={`${pay.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${
                          pay !== "" ? " ₸" : ""
                        }`}
                        variant="filled"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={() => setPay("")}
                        onChange={(e: any) => {
                          const s = +e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          );
                          if (s > +payMax) {
                            setPay(payMax);
                          } else {
                            setPay(s.toString());
                          }
                        }}
                        className={classes.input}
                      />
                      <BccSlider
                        style={{
                          left: 6,
                          right: 6,
                          width: "calc(100% - 12px)",
                          bottom: -1,
                          padding: 0,
                          position: "absolute",
                        }}
                        min={+payMin}
                        max={+payMax}
                        step={50000}
                        value={+pay}
                        valueLabelDisplay="off"
                        defaultValue={+pay}
                        onChange={(e: any, val: any) => {
                          let v =
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString();
                          setPay(v);
                        }}
                      />
                      <div className={classes.sliderRange}>
                        <span>
                          {payMin.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                        <span>
                          {payMax.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.firstBlock}>
                  <div className={classes.paymentWrap}>
                    <div className={classes.sliderWrap}>
                      <BccInput
                        label="Срок займа"
                        key="period"
                        value={`${period.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}${period !== "" ? " мес." : ""}`}
                        variant="filled"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={() => setPeriod("")}
                        onChange={(e: any) => {
                          const s = +e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          );
                          if (s > +periodMax) {
                            countMinPay(periodMax, price, analys);
                            setPeriod(periodMax);
                          } else {
                            countMinPay(s.toString(), price, analys);
                            setPeriod(s.toString());
                          }
                        }}
                        className={classes.input}
                      />
                      <BccSlider
                        style={{
                          left: 6,
                          right: 6,
                          width: "calc(100% - 12px)",
                          bottom: -1,
                          padding: 0,
                          position: "absolute",
                        }}
                        min={+periodMin}
                        max={+periodMax}
                        step={1}
                        value={+period}
                        valueLabelDisplay="off"
                        defaultValue={+period}
                        onChange={(e: any, val: any) => {
                          let v =
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString();
                          countMinPay(v, price, analys);
                          setPeriod(v);
                        }}
                      />
                      <div className={classes.sliderRange}>
                        <span>{periodMin}</span>
                        <span>{periodMax}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classes.paymentWrap}>
                    <div className={classes.sliderWrap}>
                      <BccInput
                        label="Доход"
                        key="income"
                        value={`${income.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}${income !== "" ? " ₸" : ""}`}
                        variant="filled"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={() => setIncome("")}
                        onChange={(e: any) => {
                          const s = +e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          );
                          if (s > 10000000) setIncome("10000000");
                          else setIncome(s.toString());
                        }}
                        className={classes.inputSlider}
                      />
                      <BccSlider
                        style={{
                          left: 6,
                          right: 6,
                          width: "calc(100% - 12px)",
                          bottom: -1,
                          padding: 0,
                          position: "absolute",
                        }}
                        min={100000}
                        max={10000000}
                        step={1}
                        value={+income}
                        valueLabelDisplay="off"
                        defaultValue={+income}
                        onChange={(e: any, val: any) =>
                          setIncome(
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString()
                          )
                        }
                      />
                      <div className={classes.sliderRange}>
                        <span>100 000</span>
                        <span>10 000 000</span>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <BccTypography
                block
                type="h4"
                color="#4D565F"
                mt="80px"
                mb="28px"
              >
                Личные данные
              </BccTypography>
              <Grid
                container
                wrap="nowrap"
                justify="space-between"
                className={classes.privateDate}
              >
                <Grid item>
                  <BccInput
                    className={classes.inputStyle}
                    label="Фамилия"
                    variant="filled"
                    id="firstName"
                    fillWidth
                    name="firstName"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                  />
                  <BccInput
                    className={classes.inputStyle}
                    label="Имя"
                    variant="filled"
                    id="secondName"
                    fillWidth
                    name="secondName"
                    value={secondName}
                    onChange={(e: any) => setSecondName(e.target.value)}
                  />
                  <BccInput
                    className={classes.inputStyleLast}
                    label="Отчество"
                    variant="filled"
                    id="thirdName"
                    fillWidth
                    name="thirdName"
                    value={thirdName}
                    onChange={(e: any) => setThirdName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <BccInput
                    variant="filled"
                    fullWidth
                    label="Номер телефона"
                    onChange={(e: any) => setPhone(e.target.value)}
                    className={classes.inputStyle}
                    helperText={
                      phoneError ? "Неверный формат номера телефона" : ""
                    }
                    error={phoneError ? true : false}
                    id="phone"
                    name="phone"
                    value={phone}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: BccMaskedInput as any,
                    }}
                  />
                  <BccInput
                    className={classes.inputStyle}
                    fullWidth
                    label="ИИН"
                    variant="filled"
                    id="iin"
                    name="iin"
                    value={iin}
                    onChange={(e: any) => setIin(e.target.value)}
                    helperText={iinError ? "Неверный формат ИИН" : ""}
                    error={iinError ? true : false}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent: BccMaskedIinInput as any,
                    }}
                  />
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyleLast}
                    label="Семейное положение"
                    id="family"
                    name="family"
                    value={family}
                    onChange={(e: any) => setFamily(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Семейное положение</MenuItem>
                    <MenuItem key={0} value="Холост">
                      Холост
                    </MenuItem>
                    <MenuItem key={1} value="Женат/Замужем">
                      Женат/Замужем
                    </MenuItem>
                  </BccInput>
                </Grid>
                <Grid item>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Профессия"
                    id="profession"
                    name="profession"
                    value={profession}
                    onChange={(e: any) => setProfession(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите профессию</MenuItem>
                    <MenuItem key={0} value="Военнослужащий">
                      Военнослужащий
                    </MenuItem>
                    <MenuItem key={1} value="Натариус">
                      Натариус
                    </MenuItem>
                    <MenuItem key={2} value="Частный судебный исполнитель">
                      Частный судебный исполнитель
                    </MenuItem>
                    <MenuItem key={3} value="Юрист">
                      Юрист
                    </MenuItem>
                    <MenuItem key={4} value="Иное">
                      Иное
                    </MenuItem>
                  </BccInput>
                  <div className={classes.paymentWrap}>
                    <div className={classes.sliderWrap}>
                      <BccInput
                        label="Количество иждивенцев"
                        key="dependents"
                        value={`${dependents.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                        )}${dependents !== "" ? " чел." : ""}`}
                        variant="filled"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onFocus={() => setDependents("")}
                        onChange={(e: any) => {
                          const s = +e.target.value.replace(
                            /[^a-zA-Z0-9]/g,
                            ""
                          );
                          if (s > 9) setDependents("9");
                          else setDependents(s.toString());
                        }}
                        className={classes.input}
                      />
                      <BccSlider
                        style={{
                          left: 6,
                          right: 6,
                          width: "calc(100% - 12px)",
                          bottom: -1,
                          padding: 0,
                          position: "absolute",
                        }}
                        min={0}
                        max={9}
                        step={1}
                        value={+dependents}
                        valueLabelDisplay="off"
                        defaultValue={+dependents}
                        onChange={(e: any, val: any) =>
                          setDependents(
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString()
                          )
                        }
                      />
                      <div className={classes.sliderRange}>
                        <span>0</span>
                        <span>9</span>
                      </div>
                    </div>
                  </div>
                  <BccInput
                    className={classes.inputStyle}
                    label="E-mail (опционально)"
                    variant="filled"
                    id="email"
                    fillWidth
                    name="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-start"
                wrap="nowrap"
                className={classes.checkboxText}
              >
                <Grid item>
                  <BccCheckbox
                    value="remember"
                    color="primary"
                    checked={agree}
                    onClick={() => setAgree(!agree)}
                  />
                </Grid>
                <Grid item>
                  <BccTypography type="p3" ml="10px">
                    Я согласен(а) с{" "}
                    <BccLink
                      href={process.env.PUBLIC_URL + "/anketa.pdf"}
                      target="_blank"
                    >
                      условиями
                    </BccLink>
                  </BccTypography>
                </Grid>
              </Grid>

              <BccButton
                className={classes.btn}
                variant="contained"
                disabled={!isValid()}
                color="primary"
                onClick={() => getOtp()}
              >
                Далее
              </BccButton>
            </>
          ) : step === 1 ? (
            <div className={classes.block}>
              <BccTypography type="h3" block mb="16px">
                Банк обрабатывает Вашу заявку
              </BccTypography>
              <BccTypography type="p1" block mb="80px">
                Мы отправили код на номер +7 70* *** ** **
              </BccTypography>

              <Grid
                item
                container
                justify="space-between"
                alignItems="center"
                spacing={4}
              >
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <BccInput
                    variant="outlined"
                    className={classes.code}
                    margin="normal"
                    fullWidth
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e: any) =>
                      setCode(e.target.value.replace(/\D/g, "").substr(0, 6))
                    }
                    label="Код подтверждения"
                  />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <BccButton
                    onClick={() => onSubmitOtp()}
                    variant="contained"
                    fullWidth
                    disabled={!isValid()}
                  >
                    Подтвердить
                  </BccButton>
                </Grid>
                {timer !== 0 ? (
                  <Grid item>
                    <BccTypography type="p3" className={classes.timer}>
                      Отправить повторно СМС через 00:{timer}
                    </BccTypography>
                  </Grid>
                ) : (
                  <Grid item>
                    <BccButton
                      variant="text"
                      className={classes.linkReSendSms}
                      onClick={() => onReSend()}
                    >
                      Отправить повторно
                    </BccButton>
                  </Grid>
                )}
              </Grid>
            </div>
          ) : (
            ""
          )}
        </BlockUi>
      </div>
    </div>
  );
};

export default Order;
