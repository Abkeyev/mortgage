import React, { Children } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BccButton, BccTypography } from "../components/BccComponents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    [theme.breakpoints.between("lg", "xl")]: {
      outerContainer: {
        backgroundColor: "white",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.07)",
        position: "relative",
        zIndex: 999,
      },
      container: {
        position: "relative",
        margin: "0 auto",
        padding: "36px 48px",
        maxWidth: 1280,
        boxSizing: "border-box",
      },
      header: {
        paddingBottom: 18,
        borderBottom: "1px solid #B3B6BA",
      },
    },
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.down("xs")]: {},
  })
);

const Header = (props: any) => {
  const classes = useStyles({});

  const goToOrder = () => {
    props.scrollToOrder();
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.container}>
        <Grid
          container
          justify="space-between"
          wrap="nowrap"
          alignItems="center"
          className={classes.header}
        >
          <Grid item>
            <a href="/">
              <img
                width="170"
                height="40"
                src={process.env.PUBLIC_URL + "/img/logo-bcc.kz.png"}
              />
            </a>
          </Grid>
          <Grid item>
            <BccTypography type="h3" block mb="8px">
              <a href="tel:505">505</a>
            </BccTypography>
            <BccTypography type="p3" block mb="8px">
              Для физических лиц
            </BccTypography>
          </Grid>
        </Grid>
        <BccTypography type="h2" mt="22px" block>
          Онлайн заявка на предварительное решение
        </BccTypography>
      </div>
    </div>
  );
};

export default Header;
