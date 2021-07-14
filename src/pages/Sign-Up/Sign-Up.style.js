export const styled = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign: "center",
  },
  textFiled: {
    width: "80%",
  },
  textIntro: {
    fontSize: "35px",
    margin: "10px 0",
    color: "black",
    textAlign: "center",
    fontWeight: "600",
  },
  selected: {
    width: "80%",
  },
  errMesage: {
    textAlign: "left",
    color: "red",
    fontWeight: "bold",
    marginLeft: "120px",
  },
});
