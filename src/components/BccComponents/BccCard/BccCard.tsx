import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BccChip, BccTypography, BccButton } from "..";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    [theme.breakpoints.down("xl")]: {
      card: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0px 0px 1px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 10px 20px rgba(0, 0, 0, 0.04)",
        borderRadius: 8,
        overflow: "hidden",
      },
      title: {
        marginBottom: 16,
      },
      text: {
        marginBottom: 20,
      },
      horizontalText: {
        marginBottom: 48,
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "auto",
        "& > div:first-child": {
          width: "30%",
        },
        "& > div:last-child": {
          width: "70%",
        },
      },
      fullImg: {},
      horizontalImg: {
        minHeight: 200,
        order: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        "& > img": {
          display: "block",
          width: "100%",
          margin: "0 auto",
        },
      },
      img: {
        minHeight: 192,
        display: "flex",
        alignItems: "center",
        "& > img": {
          display: "block",
          width: "40%",
          margin: "0 auto",
        },
      },
      contentCard: {
        padding: 20,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      },
      chip: {
        marginRight: 8,
        marginBottom: 8,
        display: "flex",
        width: "fit-content",
        height: "fit-content",
      },
      cardBtn: {
        marginTop: "auto",
      },
      chipWrap: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        "& > span:last-child": {
          marginBottom: 16,
        },
      },
    },
    [theme.breakpoints.down("sm")]: {},
  })
);

interface Chip {
  title: string;
  type: "filled" | "outlined";
  color: "primary" | "secondary" | "sale";
}

interface BccCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  text: any;
  bgColor?: string;
  btnText: string;
  variant: "horizontal" | "vertical";
  img?: string;
  fullImg?: boolean | false;
  chips?: Array<Chip>;
}

const BccCard = (props: BccCardProps) => {
  const classes = useStyles();
  const {
    title,
    btnText,
    text,
    bgColor,
    variant,
    img,
    fullImg,
    chips,
    children,
  } = props;
  return (
    <div
      className={`${classes.card} ${
        variant === "horizontal" ? classes.horizontal : ""
      }`}
    >
      {img &&
        (fullImg ? (
          <div
            className={classes.fullImg}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + "/img/" + img})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: "cover",
              minHeight: 196,
            }}
          ></div>
        ) : (
          <div
            className={
              variant === "horizontal" ? classes.horizontalImg : classes.img
            }
            style={{ backgroundColor: bgColor ? bgColor : "#F6F6F6" }}
          >
            <img src={process.env.PUBLIC_URL + "/img/" + img} alt={title} />
          </div>
        ))}

      <div className={classes.contentCard}>
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
        <BccTypography type="h5" block className={classes.title}>
          {title}
        </BccTypography>
        <BccTypography
          type="h5"
          block
          className={
            variant === "horizontal" ? classes.horizontalText : classes.text
          }
        >
          {text}
        </BccTypography>
        <BccButton
          variant="outlined"
          fullWidth
          color="secondary"
          className={classes.cardBtn}
        >
          {btnText}
        </BccButton>
      </div>
    </div>
  );
};

export default BccCard;
