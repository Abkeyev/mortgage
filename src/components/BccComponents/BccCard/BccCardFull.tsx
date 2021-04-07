import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BccChip, BccTypography, BccButton } from "..";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 1280,
      margin: "0 auto",
      boxSizing: "border-box",
      padding: "48px",
    },
    chip: {
      marginRight: 8,
      marginBottom: 8,
      display: "flex",
      width: "fit-content",
      height: "fit-content",
    },
    chipWrap: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > span:last-child": {
        marginBottom: 16,
      },
    },
    card: {
      width: "40%",
      borderRadius: 8,
      boxShadow:
        "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface Chip {
  title: string;
  type: "filled" | "outlined";
  color: "primary" | "secondary" | "sale";
}

interface BccCardFullProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: any;
  text?: any;
  chips?: Array<Chip>;
  bgColor?: string;
  bgImg?: string;
  imgPos?: "left" | "right";
}

const BccCardFull = (props: BccCardFullProps) => {
  const classes = useStyles();
  const { children, text, bgColor, bgImg, imgPos, title, chips } = props;
  return (
    <div style={{ backgroundColor: bgColor ? bgColor : "#fafafa" }}>
      <div className={classes.container}>
        <div
          className={classes.card}
          style={{
            background: bgImg
              ? `url(${process.env.PUBLIC_URL + bgImg}) ${
                  imgPos ? imgPos : "right"
                } no-repeat white`
              : "white",
            backgroundSize: "contain",
            padding:
              imgPos === "left"
                ? "20px 20px 30px calc(60% - 20px)"
                : "20px calc(60% - 20px) 30px 20px",
          }}
        >
          {chips?.length && (
            <div className={classes.chipWrap}>
              {chips.map((c: any) => {
                return (
                  <>
                    <BccChip
                      className={classes.chip}
                      type={c.type === "outlined" ? "outlined" : "filled"}
                      color={
                        c.color === "sale"
                          ? "sale"
                          : c.color === "secondary"
                          ? "secondary"
                          : "primary"
                      }
                    >
                      {c.title}
                    </BccChip>
                  </>
                );
              })}
            </div>
          )}
          {title && (
            <BccTypography block type="h4">
              {title}
            </BccTypography>
          )}
          {text && (
            <BccTypography block type="p2">
              {text}
            </BccTypography>
          )}
        </div>
      </div>
    </div>
  );
};

export default BccCardFull;
