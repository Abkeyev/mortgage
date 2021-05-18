import React, { useEffect } from "react";
import { Grid, MenuItem, FormControlLabel } from "@material-ui/core";
import {
  BccTypography,
  BccCheckbox,
  BccInput,
  BccLink,
  BccSlider,
  BccButton,
  BccAlert,
} from "./BccComponents";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MaskedInput from "react-maskedinput";
import BlockUi from "react-block-ui";
import api from "../api/Api";
const webConfigEnv = (window as any).env;

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
    code: {
      marginBottom: 40,
      "& > div:first-child": {
        width: "calc(60% - 16px)",
      },
      "& > div:nth-child(2)": {
        width: "calc(40% - 16px)",
      },
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

interface MarkersProps {
  name: string;
  address: string;
  depId: string;
}

interface BranchesProps {
  map: any;
  markers: MarkersProps[];
  value: string;
}

const Order = (props: any) => {
  const classes = useStyles({});
  const [step, setStep] = React.useState(0);
  const [price, setPrice] = React.useState("15000000");
  const [pay, setPay] = React.useState("3000000");
  const [income, setIncome] = React.useState("100000");
  const [program, setProgram] = React.useState(-1);
  const [cities, setCities] = React.useState<BranchesProps[] | null>(null);
  const [city, setCity] = React.useState("-1");
  const [branch, setBranch] = React.useState(-1);
  const [isLoading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [thirdName, setThirdName] = React.useState("");
  const [family, setFamily] = React.useState(-1);
  const [dependents, setDependents] = React.useState("0");
  const [iin, setIin] = React.useState("");
  const [code, setCode] = React.useState("");
  const [profession, setProfession] = React.useState(-1);
  const [email, setEmail] = React.useState("");
  const [period, setPeriod] = React.useState("180");
  const [phone, setPhone] = React.useState("");
  const [phoneError, setPhoneError] = React.useState<boolean>(false);
  const [iinError, setIinError] = React.useState<boolean>(false);

  useEffect(() => {
    api.reference
      .getCityBranches()
      .then((res) => setCities(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.outerContainer} ref={props.refProp}>
      <div className={classes.container}>
        <BlockUi tag="div" blocking={isLoading}>
          {step === 0 ? (
            <>
              <BccTypography block type="h4" color="#4D565F" mb="28px">
                Ориентировочный расчет ипотеки
              </BccTypography>
              <Grid container wrap="nowrap" justify="flex-start">
                <Grid item className={classes.firstBlock}>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Программа"
                    id="program"
                    name="program"
                    value={program}
                    onChange={(e: any) => setProgram(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите программу</MenuItem>
                    <MenuItem key={0} value={0}>
                      Ипотека “7-20-25”
                    </MenuItem>
                    <MenuItem key={1} value={1}>
                      “7-20-25”
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      Баспана Хит
                    </MenuItem>
                  </BccInput>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Местонахождение недвижимости"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e: any) => setCity(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value="-1">Выберите город</MenuItem>
                    {cities &&
                      cities.map((b: BranchesProps, index: number) => {
                        return (
                          b.value !== null && (
                            <MenuItem key={index} value={b.value}>
                              {b.value}
                            </MenuItem>
                          )
                        );
                      })}
                  </BccInput>
                  <BccInput
                    fullWidth={true}
                    className={classes.inputStyle}
                    label="Отделение"
                    id="branch"
                    name="branch"
                    value={branch}
                    onChange={(e: any) => setBranch(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Выберите отделение</MenuItem>
                    {cities &&
                      cities.filter(
                        (d: BranchesProps) => d.value === city
                      )[0] &&
                      cities
                        .filter((d: BranchesProps) => d.value === city)[0]
                        .markers.map((c: MarkersProps, i: number) => (
                          <MenuItem
                            value={c.depId}
                            key={i}
                            className={classes.menuBranch}
                          >
                            {c.name}
                            <br />
                            <p>{c.address}</p>
                          </MenuItem>
                        ))}
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
                          if (s > 50000000) setPrice("50000000");
                          else setPrice(s.toString());
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
                        min={1000000}
                        max={50000000}
                        step={50000}
                        value={+price}
                        valueLabelDisplay="off"
                        defaultValue={+price}
                        onChange={(e: any, val: any) =>
                          setPrice(
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString()
                          )
                        }
                      />
                      <div className={classes.sliderRange}>
                        <span>1 000 000</span>
                        <span>50 000 000</span>
                      </div>
                    </div>
                  </div>
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
                          if (s > 10000000) setPay("10000000");
                          else setPay(s.toString());
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
                        min={3000000}
                        max={10000000}
                        step={50000}
                        value={+pay}
                        valueLabelDisplay="off"
                        defaultValue={+pay}
                        onChange={(e: any, val: any) =>
                          setPay(
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString()
                          )
                        }
                      />
                      <div className={classes.sliderRange}>
                        <span>3 000 000</span>
                        <span>10 000 000</span>
                      </div>
                    </div>
                  </div>
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
                          if (s > 300) setPeriod("300");
                          else setPeriod(s.toString());
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
                        min={1}
                        max={300}
                        step={1}
                        value={+period}
                        valueLabelDisplay="off"
                        defaultValue={+period}
                        onChange={(e: any, val: any) =>
                          setPeriod(
                            val instanceof Array
                              ? val[1].toString()
                              : val.toString()
                          )
                        }
                      />
                      <div className={classes.sliderRange}>
                        <span>1</span>
                        <span>300</span>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item className={classes.sum}>
                  <BccTypography block type="h3" mb="16px">
                    Расчёт
                  </BccTypography>
                  <Grid container justify="space-between">
                    <Grid item>
                      <BccTypography block type="p3" color="#4D565F" mb="4px">
                        Ежемесячный платёж
                      </BccTypography>
                      <BccTypography block type="h5">
                        40 000 ₸
                      </BccTypography>
                    </Grid>
                    <Grid item>
                      <BccTypography
                        ml="46px"
                        block
                        type="p3"
                        color="#4D565F"
                        mb="4px"
                      >
                        Сумма займа
                      </BccTypography>
                      <BccTypography block ml="46px" type="h5">
                        12 000 000 ₸
                      </BccTypography>
                    </Grid>
                  </Grid>
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
                    className={classes.inputStyle}
                    label="Отчество"
                    variant="filled"
                    id="thirdName"
                    fillWidth
                    name="thirdName"
                    value={thirdName}
                    onChange={(e: any) => setThirdName(e.target.value)}
                  />
                  <BccInput
                    variant="filled"
                    fullWidth
                    label="Номер телефона"
                    onChange={(e: any) => setPhone(e.target.value)}
                    className={classes.inputStyleLast}
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
                </Grid>
                <Grid item>
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
                    className={classes.inputStyle}
                    label="Семейное положение"
                    id="family"
                    name="family"
                    value={family}
                    onChange={(e: any) => setFamily(e.target.value)}
                    variant="outlined"
                    select
                  >
                    <MenuItem value={-1}>Семейное положение</MenuItem>
                    <MenuItem key={0} value={0}>
                      Холост
                    </MenuItem>
                    <MenuItem key={1} value={1}>
                      Женат/Замужем
                    </MenuItem>
                  </BccInput>
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
                    <MenuItem key={0} value={0}>
                      Военнослужащий
                    </MenuItem>
                    <MenuItem key={1} value={1}>
                      Натариус
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      Частный судебный исполнитель
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                      Юрист
                    </MenuItem>
                    <MenuItem key={4} value={4}>
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
                </Grid>
                <Grid item>
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
                    onChange={() => setAgree(!agree)}
                  />
                </Grid>
                <Grid item>
                  <BccTypography type="p3" ml="10px">
                    Я согласен(а) с{" "}
                    <BccLink href="https://www.bcc.kz/" target="_blank">
                      условиями
                    </BccLink>
                  </BccTypography>
                </Grid>
              </Grid>

              <BccButton
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => setStep(1)}
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
              <Grid container justify="space-between" className={classes.code}>
                <Grid item>
                  <BccInput
                    className={classes.inputStyle}
                    label="Код подтверждения"
                    variant="filled"
                    id="code"
                    fillWidth
                    name="code"
                    value={code}
                    onChange={(e: any) => setCode(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <BccButton
                    className={classes.btnCode}
                    variant="contained"
                    color="primary"
                    onClick={() => setStep(2)}
                  >
                    Подтвердить
                  </BccButton>
                </Grid>
              </Grid>
              <BccTypography type="p2" block mb="80px">
                Отправить повторно СМС через 00:59
              </BccTypography>
            </div>
          ) : step === 2 ? (
            <div className={classes.block}>
              <div className={classes.blockInner}>
                <img src={process.env.PUBLIC_URL + "/img/res1.svg"} />
                <BccTypography
                  type="h6"
                  color="#1F7042"
                  block
                  mt="26px"
                  mb="26px"
                >
                  👏 Поздравляем, Вам одобрена предварительная заявка на
                  ипотечный займ на следующих условиях:{" "}
                </BccTypography>
              </div>
            </div>
          ) : step === 3 ? (
            <div className={classes.block}>
              <div className={classes.blockInner}></div>
            </div>
          ) : (
            <div className={classes.block}>
              <div className={classes.blockInner}></div>
            </div>
          )}
        </BlockUi>
      </div>
    </div>
  );
};

export default Order;
