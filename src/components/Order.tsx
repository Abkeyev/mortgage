import React, { useState, useEffect } from "react";
import { Button, Grid, MenuItem, Snackbar } from "@material-ui/core";
import {
  BccTypography,
  BccCheckbox,
  BccInput,
  BccInputText,
  BccLink,
  BccButton,
  BccInputTextSlider,
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
    timer: {
      fontSize: 16,
      color: "#4D565F",
    },
    block: {
      display: "block",
      margin: "36px auto 0",
      boxSizing: "border-box",
      backgroundColor: "white",
      padding: 48,
      boxShadow:
        "0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
    },
    linkResend: {
      color: "#3F0259",
      fontSize: 16,
      height: "auto",
      padding: 0,
      cursor: "pointer",
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
    title: "#Ипотека",
    code: "0.201.1.1131",
    spurcode: 112,
  },
  {
    title: "#Ипотека ДДУ",
    code: "0.201.1.1121",
    spurcode: 139,
  },
];

const professions = [
  "Военнослужащий",
  "Нотариус",
  "Частный судебный исполнитель",
  "Юрист",
  "Иное",
];

const maritalStatus = ["Холост", "Женат/Замужем"];

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
  const [price, setPrice] = useState(15000000);
  const [priceMin, setPriceMin] = useState(1000000);
  const [priceMax, setPriceMax] = useState(50000000);
  const [pay, setPay] = useState(3000000);
  const [payMin, setPayMin] = useState(3000000);
  const [payMax, setPayMax] = useState(10000000);
  const [income, setIncome] = useState(100000);
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
  const [dependents, setDependents] = useState(0);
  const [iin, setIin] = useState("");
  const [code, setCode] = useState("");
  const [profession, setProfession] = useState(-1);
  const [email, setEmail] = useState("");
  const [period, setPeriod] = useState(180);
  const [periodMin, setPeriodMin] = useState(1);
  const [periodMax, setPeriodMax] = useState(300);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [openError, setOpenError] = useState(false);
  const [iinError, setIinError] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [analys, setAnalys] = useState<boolean | -1>(-1);
  const [otpError, setOtpError] = useState(false);

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

  const handleClose = () => {
    setOpenError(false);
  };

  const getOtp = (e: any) => {
    e.preventDefault();
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

  const onSendOtp = (e: any) => {
    e.preventDefault();
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
        setOtpError(false);
      })
      .catch((e: any) => {
        props.scrollToOrder(false);
        console.error(e);
        setOtpError(false);
        setLoading(true);
      });
  };

  const onResend = (e: any) => {
    e.preventDefault();
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
        history.push(`loader/${res?.processInstanceId}`);
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
    period: number,
    price: number,
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
        if (+period <= 180) {
          setPayMin(+price * 0.5);
          setPay(+price * 0.5);
        }
      } else {
        if (+period <= 120) {
          setPayMin(+price * 0.7);
          setPay(+price * 0.7);
        } else if (+period <= 180) {
          setPayMin(+price * 0.3);
          setPay(+price * 0.3);
        } else {
          setPayMin(3000000);
          setPay(3000000);
        }
      }
    } else {
      setPayMin(3000000);
      setPay(3000000);
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
          {step === 1 ? (
            <form onSubmit={getOtp}>
              <React.Fragment>
                <BccTypography block type="h4" color="#4D565F" mb="28px">
                  Ориентировочный расчет ипотеки
                </BccTypography>

                <Grid container spacing={2} justify="center">
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      fullWidth
                      label="Программа"
                      variant="outlined"
                      value={program}
                      select
                      required
                      onChange={(e: any) => {
                        if (e.target.value !== -1) {
                          setProgram(e.target.value);
                          if (e.target.value.code === "0.201.1.1123") {
                            setAnalys(-1);
                            setPeriodMin(3);
                            setPeriodMax(300);
                            if (
                              city.code === "ALM" ||
                              city.code === "AST" ||
                              city.code === "AKT" ||
                              city.code === "ATR" ||
                              city.code === "SMK"
                            ) {
                              setPriceMax(25000000);
                            } else if (city.code === "KAR") {
                              setPriceMax(20000000);
                            } else {
                              setPriceMax(15000000);
                            }
                            setAnalys(-1);
                            setPeriodMin(3);
                            setPeriodMax(180);
                            if (city.code === "ALM" || city.code === "AST") {
                              setPriceMax(35000000);
                            } else if (
                              city.code === "AKT" ||
                              city.code === "ATR" ||
                              city.code === "SMK"
                            ) {
                              setPriceMax(25000000);
                            } else if (city.code === "KAR") {
                              setPriceMax(20000000);
                            } else {
                              setPriceMax(15000000);
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
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      fullWidth
                      label="Местонахождение недвижимости"
                      variant="outlined"
                      value={city.code}
                      select
                      required
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
                            setPriceMax(25000000);
                          } else if (result.code === "KAR") {
                            setPriceMax(20000000);
                          } else {
                            setPriceMax(15000000);
                          }
                        } else if (
                          program !== -1 &&
                          program.code === "0.201.1.1129"
                        ) {
                          if (result.code === "ALM" || result.code === "AST") {
                            setPriceMax(35000000);
                          } else if (
                            result.code === "AKT" ||
                            result.code === "ATR" ||
                            result.code === "SMK"
                          ) {
                            setPriceMax(25000000);
                          } else if (result.code === "KAR") {
                            setPriceMax(20000000);
                          } else {
                            setPriceMax(15000000);
                          }
                        } else if (
                          (program !== -1 && program.code === "0.201.1.1121") ||
                          (program !== -1 && program.code === "0.201.1.1131")
                        ) {
                          countMinPay(period, price, false, program);
                        }

                        setCity(result);
                      }}
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
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      fullWidth
                      label="Отделение"
                      variant="outlined"
                      value={branch.address}
                      required
                      select
                      onChange={(e: any) => {
                        const result =
                          branches
                            ?.find((b) => b.code == city.id)
                            ?.markers?.find((m) => m.depId == e.target.value) ||
                          ({} as Marker);

                        setBranch(result);
                      }}
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
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Стоимость недвижимости"
                      value={price}
                      required
                      unit="₸"
                      min={priceMin}
                      max={priceMax}
                      step={5000}
                      onValueChange={(e: number) => {
                        setPrice(e);
                      }}
                    />
                    {analys !== -1 && (
                      <Grid
                        container
                        justify="flex-start"
                        wrap="nowrap"
                        style={{ marginTop: 20 }}
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
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Первоначальный взнос"
                      value={pay}
                      required
                      unit="₸"
                      min={payMin}
                      max={payMax}
                      step={5000}
                      onValueChange={(e: number) => {
                        setPay(e);
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Срок займа"
                      value={period}
                      required
                      unit="мес*"
                      min={periodMin}
                      max={periodMax}
                      step={1}
                      onValueChange={(e: number) => {
                        setPeriod(e);
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Доход"
                      value={income}
                      required
                      unit="₸"
                      min={100000}
                      max={10000000}
                      step={50000}
                      onValueChange={(e: number) => {
                        setIncome(e);
                      }}
                    />
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

                <Grid container spacing={2} justify="center">
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="Фамилия"
                      variant="filled"
                      fullWidth
                      value={firstName}
                      onChange={(e: any) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="Имя"
                      variant="filled"
                      fullWidth
                      value={secondName}
                      onChange={(e: any) => setSecondName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="Отчество"
                      variant="filled"
                      fullWidth
                      value={thirdName}
                      onChange={(e: any) => setThirdName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      variant="filled"
                      label="Номер телефона"
                      fullWidth
                      onChange={(e: any) => setPhone(e.target.value)}
                      helperText={
                        phoneError ? "Неверный формат номера телефона" : ""
                      }
                      error={phoneError ? true : false}
                      value={phone}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: BccMaskedInput as any,
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="ИИН"
                      variant="filled"
                      fullWidth
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
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="Профессия"
                      variant="outlined"
                      fullWidth
                      value={profession}
                      onChange={(e: any) => setProfession(e.target.value)}
                      select
                    >
                      <MenuItem value={-1}>Выберите профессию</MenuItem>
                      {professions.map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </BccInput>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="Семейное положение"
                      variant="outlined"
                      fullWidth
                      value={family}
                      onChange={(e: any) => setFamily(e.target.value)}
                      select
                    >
                      <MenuItem value={-1}>Семейное положение</MenuItem>
                      {maritalStatus.map((val, index) => (
                        <MenuItem value={index}>{val}</MenuItem>
                      ))}
                    </BccInput>
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Количество иждивенцев"
                      value={dependents}
                      required
                      unit="чел."
                      min={0}
                      max={9}
                      step={1}
                      onValueChange={(e: number) => {
                        console.log("VAlUE: ", e);
                        setDependents(e);
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInput
                      label="E-mail (опционально)"
                      variant="filled"
                      fullWidth
                      value={email}
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justify="flex-start"
                  wrap="nowrap"
                  style={{ marginBottom: 30, marginTop: 20 }}
                >
                  <Grid item>
                    <BccCheckbox
                      value="remember"
                      color="primary"
                      checked={agree}
                      required
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
                      <BccLink
                        href="https://www.bcc.kz/fizical/kreditovanie/ipotechnoe-kreditovanie/"
                        target="_blank"
                      >
                        , тарифами Банка
                      </BccLink>
                    </BccTypography>
                  </Grid>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                  <BccButton
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Далее
                  </BccButton>
                </Grid>
              </React.Fragment>
            </form>
          ) : step === 0 ? (
            <Grid
              item
              xl={8}
              lg={8}
              md={8}
              sm={12}
              xs={12}
              className={classes.block}
            >
              <Grid item>
                <BccTypography type="h3" block mb="15px">
                  Банк обрабатывает Вашу заявку
                </BccTypography>
              </Grid>
              <Grid item>
                <BccTypography type="p1" block mb="50px">
                  Мы отправили код на номер +7 70* *** ** **
                </BccTypography>
              </Grid>

              <form onSubmit={onSendOtp}>
                <Grid container justify="flex-start" spacing={2}>
                  <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                    <BccInput
                      fullWidth
                      variant="outlined"
                      required
                      value={code}
                      onChange={(e: any) =>
                        setCode(e.target.value.replace(/\D/g, "").substr(0, 6))
                      }
                      label="Код подтверждения"
                    />
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccButton fullWidth variant="contained" type="submit">
                      Подтвердить
                    </BccButton>
                  </Grid>
                </Grid>
              </form>
              <Grid item style={{ marginTop: "20px" }}>
                {timer !== 0 ? (
                  <Grid item>
                    <BccTypography type="h1" className={classes.timer}>
                      Отправить повторно СМС через 00:{timer}
                    </BccTypography>
                  </Grid>
                ) : (
                  <form onSubmit={onResend}>
                    <Grid item>
                      <Button type="submit" className={classes.linkResend}>
                        Отправить повторно
                      </Button>
                    </Grid>
                  </form>
                )}
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </BlockUi>
      </div>
    </div>
  );
};

export default Order;
