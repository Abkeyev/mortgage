import React from "react";
import { Grid } from "@material-ui/core";
import { BccTypography, BccLink, BccButton } from "./BccComponents";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    [theme.breakpoints.between("md", "xl")]: {
      container: {
        backgroundColor: "#1F7042",
      },
      innerContainer: {
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        padding: "48px 48px 96px",
        boxSizing: "border-box",
      },
      title: {
        marginBottom: 50,
      },
      footerOne: { width: "35%" },
      footerTwo: { width: "calc(65% - 50px)" },
      footIcon: {
        display: "block",
        height: 20,
        width: 20,
      },
      footIconSocial: {
        display: "block",
        height: 20,
        width: 20,
        marginRight: 15,
      },
      footLink: {
        marginLeft: 10,
        textDecoration: "none",
        color: "white",
        "&:hover": {
          textDecoration: "underline",
        },
        "& > span": {
          fontWeight: "bold",
        },
      },
      footItem: {
        marginBottom: 20,
      },
      footItemSocial: {
        marginTop: 30,
      },
      footBtn: {
        width: "100%",
        color: "#1F7042",
        maxWidth: 250,
        lineHeight: "20px",
        margin: "30px 0 20px",
      },
      mobileTitle: {
        color: "#CCCFD1",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
      },
      appLinks: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "100%",
        "& > a": {
          disaply: "block",
          width: "calc(50% - 15px)",
          "& > img": { width: "100%" },
        },
      },
      footLinks: {
        marginBottom: 20,
        "& > div": {
          display: "flex",
          flexDirection: "column",
          width: "calc(50% - 15px)",
          "& > a": {
            display: "inline-block",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
            marginBottom: 24,
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "& > a:last-child": { marginBottom: 0 },
        },
      },
      footLicen: {
        color: "#CCCFD1",
        lineHeight: "19px",
        fontSize: 16,
      },
    },
    [theme.breakpoints.down("sm")]: {
      container: {
        backgroundColor: "#1F7042",
      },
      innerContainer: {
        maxWidth: "100%",
        margin: "0 auto",
        width: "100%",
        padding: "48px",
        boxSizing: "border-box",
      },
      title: {
        marginBottom: 50,
      },
      footerOne: { width: "calc(50% - 20px)" },
      footerTwo: { width: "calc(50% - 20px)" },
      footIcon: {
        display: "block",
        height: 20,
        width: 20,
      },
      footIconSocial: {
        display: "block",
        height: 20,
        width: 20,
        marginRight: 15,
      },
      footLink: {
        marginLeft: 10,
        textDecoration: "none",
        color: "white",
        flexDirecton: "row",
        "&:hover": {
          textDecoration: "underline",
        },
        "& > span": {
          fontWeight: "bold",
        },
      },
      footItem: {
        marginBottom: 20,
      },
      footItemSocial: {
        marginTop: 30,
      },
      footBtn: {
        width: "100%",
        maxWidth: 250,
        color: "#1F7042",
        lineHeight: "auto",
        margin: "30px 0 20px",
      },
      mobileTitle: {
        color: "#CCCFD1",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
      },
      appLinks: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "100%",
        "& > a": {
          disaply: "block",
          width: "calc(50% - 5px)",
          "& > img": { width: "100%", maxWidth: 150 },
        },
      },
      footLinks: {
        marginBottom: 20,
        "& > div": {
          display: "flex",
          flexDirection: "column",
          width: "calc(50% - 15px)",
          "& > a": {
            display: "inline-block",
            color: "white",
            textDecoration: "none",
            fontSize: 16,
            marginBottom: 24,
            "&:hover": {
              textDecoration: "underline",
            },
          },
          "& > a:last-child": { marginBottom: 0 },
        },
      },
      footLicen: {
        color: "#CCCFD1",
        lineHeight: "19px",
        fontSize: 16,
      },
    },
    [theme.breakpoints.down("xs")]: {
      innerContainer: {
        padding: 24,
      },
      foot: {
        flexDirection: "column",
      },
      foot2: {
        flexDirection: "column",
      },
      footerOne: { width: "100%" },
      footerTwo: { width: "100%" },
    },
  })
);

const Footer = (props: any) => {
  const classes = useStyles({});

  const openBtn = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Grid
          container
          justify="space-between"
          direction="row"
          wrap="nowrap"
          className={classes.foot}
        >
          <Grid item className={classes.footerOne}>
            <Grid container direction="column">
              <Grid item className={classes.footItem}>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <img
                      className={classes.footIcon}
                      src={process.env.PUBLIC_URL + "/img/f_phone.svg"}
                    />
                  </Grid>
                  <Grid item>
                    <a href="#" target="_blank" className={classes.footLink}>
                      <span>505</span> Бесплатно с мобильного
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.footItem}>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <img
                      className={classes.footIcon}
                      src={process.env.PUBLIC_URL + "/img/f_call.svg"}
                    />
                  </Grid>
                  <Grid item>
                    <a href="#" target="_blank" className={classes.footLink}>
                      <span>+7 727 244-30-30</span>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <img
                      className={classes.footIcon}
                      src={process.env.PUBLIC_URL + "/img/f_mail.svg"}
                    />
                  </Grid>
                  <Grid item>
                    <a href="#" target="_blank" className={classes.footLink}>
                      <span>info@bcc.kz</span>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.footItemSocial}>
                <Grid container>
                  <Grid item>
                    <a href="#" target="_blank">
                      <img
                        className={classes.footIconSocial}
                        src={process.env.PUBLIC_URL + "/img/ig.svg"}
                      />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="#" target="_blank">
                      <img
                        className={classes.footIconSocial}
                        src={process.env.PUBLIC_URL + "/img/fb.svg"}
                      />
                    </a>
                  </Grid>
                  <Grid item>
                    <a href="#" target="_blank">
                      <img
                        className={classes.footIconSocial}
                        src={process.env.PUBLIC_URL + "/img/vk.svg"}
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <BccButton
                  className={classes.footBtn}
                  variant="outlined"
                  color="primary"
                >
                  Отправить сообщение
                </BccButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.footerTwo}>
            <Grid
              container
              direction="row"
              justify="space-between"
              className={classes.footLinks}
            >
              <Grid item>
                <a href="#" target="_blank">
                  О банке
                </a>
                <a href="#" target="_blank">
                  Акции
                </a>
                <a href="#" target="_blank">
                  Тарифы
                </a>
                <a href="#" target="_blank">
                  Вакансии
                </a>
                <a href="#" target="_blank">
                  Реквизиты
                </a>
                <a href="#" target="_blank">
                  Залоговая база
                </a>
                <a href="#" target="_blank">
                  Сборник форм договоров
                </a>
              </Grid>
              <Grid item>
                <a href="#" target="_blank">
                  Пресс-служба
                </a>
                <a href="#" target="_blank">
                  Вопросы-ответы
                </a>
                <a href="#" target="_blank">
                  Центр обслуживания вызовов
                </a>
                <a href="#" target="_blank">
                  Косплаенс–контроль
                </a>
                <a href="#" target="_blank">
                  Информация для инвесторов
                </a>
                <a href="#" target="_blank">
                  Информация акционерам
                </a>
                <a href="#" target="_blank">
                  Правила об общих условиях проведения операций
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          direction="row"
          wrap="nowrap"
          className={classes.foot2}
        >
          <Grid item className={classes.footerOne}>
            <Grid container>
              <Grid item className={classes.mobileTitle}>
                Мобильное приложение
              </Grid>
              <Grid item className={classes.appLinks}>
                <a
                  href="https://apps.apple.com/kz/app/starbusiness/id1452748006"
                  target="_blank"
                >
                  <img src={process.env.PUBLIC_URL + "/img/as.svg"} />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=bcc.sapphire&hl=ru"
                  target="_blank"
                >
                  <img src={process.env.PUBLIC_URL + "/img/gp.svg"} />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.footerTwo}>
            <div className={classes.footLicen}>
              Лицензия на проведение банковских и иных операций и деятельности
              на рынке ценных бумаг №1.2.25/195/34 от 28.01.2015 выданная НБ РК.
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
