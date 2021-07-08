import React, { useState, useEffect } from "react";
import { Button, Grid, MenuItem, Snackbar } from "@material-ui/core";
import {
  BccTypography,
  BccCheckbox,
  BccInput,
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

const BccMaskedPhoneInput = (props: TextMaskCustomProps) => {
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

interface Program {
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

const programms: Program[] = [
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

const Order = (props: any) => {
  const classes = useStyles({});

  const [step, setStep] = useState(0);
  //Ориентировачный расчет ипотеки
  const [program, setProgram] = useState({} as Program);
  const [city, setCity] = useState({} as City);
  const [cities, setCities] = useState<City[] | null>(null);
  const [branch, setBranch] = useState({} as Marker);
  const [branches, setBranches] = useState<Branch[] | null>(null);
  const [price, setPrice] = useState(1000000);
  const [priceMin, setPriceMin] = useState(1000000);
  const [priceMax, setPriceMax] = useState(50000000);
  const [analys, setAnalys] = useState(false);
  const [pay, setPay] = useState(20);
  const [payMin, setPayMin] = useState(20);
  const [payMax, setPayMax] = useState(100);
  const [period, setPeriod] = useState(3);
  const [periodMin, setPeriodMin] = useState(3);
  const [periodMax, setPeriodMax] = useState(300);
  const [income, setIncome] = useState(100000);
  const [rate, setRate] = useState("0");

  const [isLoading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [family, setFamily] = useState(-1);
  const [dependents, setDependents] = useState(0);
  const [iin, setIin] = useState("");
  const [code, setCode] = useState("");
  const [profession, setProfession] = useState(-1);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [openError, setOpenError] = useState(false);
  const [iinError, setIinError] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
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

  const startProcess = () => {
    api.camunda
      .start({
        env: {
          production: webConfigEnv.PRODUCTION === "1",
        },
        client: {
          prod_code: program.code,
          spurcode: program.spurcode,
          rate: rate,
          fin_analys: analys ? "0" : "1",
          city: city.code,
          depId: branch.depId,
          cost: +price,
          initial_fee: +pay,
          term: period,
          income: income,
          iin: iin.replace(/ /g, ""),
          profession: profession,
          marital_status: family,
          family_numb: dependents,
          phone: formatPhoneNumber(),
          agreement: agree,
          date: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
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
                      value={program.title}
                      select
                      required
                      onChange={(e: any) => {
                        if (e.target.value !== -1) {
                          var program = e.target.value;
                          setProgram(program);
                          setPrice(1000000);
                          setIncome(100000);

                          if (program.code === "0.201.1.1123") {
                            setPay(20);
                            setPayMin(20);
                            setPeriodMax(300);
                          }

                          if (program.code === "0.201.1.1129") {
                            setPay(20);
                            setPayMin(20);
                            setPeriodMax(180);
                          }

                          if (
                            program.code === "0.201.1.1131" ||
                            program.code === "0.201.1.1121"
                          ) {
                            setPay(30);
                            setPayMin(30);
                            setPeriodMax(180);
                            setAnalys(false);
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
                        const city =
                          cities?.find((c) => c.code == e.target.value) ||
                          ({} as City);
                        setCity(city);
                        setPrice(1000000);
                        setIncome(100000);
                        // 7-20-25 Скоринг
                        if (program.code === "0.201.1.1123") {
                          if (
                            city.code === "AST" ||
                            city.code === "ALM" ||
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
                        }

                        // Ипотека Баспана-Хит ДДУ 150
                        // #Ипотека ДДУ 139
                        if (
                          program.code === "0.201.1.1129" ||
                          program.code === "0.201.1.1121"
                        ) {
                          if (city.code === "AST" || city.code === "ALM") {
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
                        }

                        // #Ипотека
                        if (program.code === "0.201.1.1131") {
                          setPriceMax(100000000);
                        }
                      }}
                    >
                      <MenuItem value={-1}>Выберите город</MenuItem>
                      {cities?.map((city: City, index: number) => {
                        return (
                          <MenuItem key={index} value={city.code}>
                            {city.rusName}
                          </MenuItem>
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
                      step={1000000}
                      onValueChange={(e: number) => {
                        setPrice(e);
                      }}
                    />
                    {program.code === "0.201.1.1131" ||
                    program.code === "0.201.1.1121" ? (
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
                            onClick={() => {
                              setAnalys(!analys);
                              if (!analys) {
                                setPay(50);
                                setPayMin(50);
                              } else {
                                setPay(30);
                                setPayMin(30);
                              }
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <BccTypography type="p3" ml="10px">
                            Без анализа платежеспособности
                          </BccTypography>
                        </Grid>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                    <BccInputTextSlider
                      label="Первоначальный взнос"
                      value={pay}
                      required
                      unit="%"
                      min={payMin}
                      max={payMax}
                      step={1}
                      onValueChange={(e: number) => {
                        setPay(e);

                        if (program.code === "0.201.1.1123") {
                          setPeriodMax(300);
                          setRate("7");
                        }

                        if (program.code === "0.201.1.1129") {
                          setPeriodMax(180);
                          setRate("10.75");
                        }

                        if (!analys) {
                          if (program.code === "0.201.1.1131") {
                            if (e >= 30 && e <= 49) {
                              setPeriodMax(180);
                              setRate("15.5");
                            } else if (e >= 50 && e <= 69) {
                              setPeriodMax(180);
                              setRate("12.99");
                            } else if (e >= 70 && e <= 100) {
                              setPeriodMax(120);
                              setRate("11");
                            }
                          }

                          if (program.code === "0.201.1.1121") {
                            setPeriodMax(180);
                            if (e >= 30 && e <= 49) {
                              setRate("15.5");
                            } else {
                              setRate("12.99");
                            }
                          }
                        } else {
                          setPeriodMax(180);
                          setRate("15.4");
                        }
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
                      step={100000}
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

                <Grid container spacing={2} justify="flex-start">
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
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12} />
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
                  <Grid item xl={4} lg={4} md={4} sm={12} xs={12} />
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
                        inputComponent: BccMaskedPhoneInput as any,
                      }}
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
          ) : step === 1 ? (
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
