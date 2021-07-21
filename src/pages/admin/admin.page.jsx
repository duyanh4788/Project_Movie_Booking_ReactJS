import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieIcon from "@material-ui/icons/Movie";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import MovieManagement from "../../components/MovieManagement/MovieManagement";
import ClientMaragement from "../../components/ClientManagement/ClientMaragement";
import "./scss/admin.css";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    padding: theme.spacing(3),
  },
}));

export default function Admin() {
  const classes = useStyles();

  const [open, setOpen] = React.useState("admin");
  const showPageAdmin = () => {
    if (open === "client") {
      return <ClientMaragement />;
    } else if (open === "movie") {
      return <MovieManagement />;
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen("admin");
        }}
      >
        <SupervisorAccountRoundedIcon />
      </Button>
      <Button
        onClick={() => {
          setOpen("movie");
        }}
        label="Item One"
      >
        <MovieIcon label="Item One" />
      </Button>
      <Button
        onClick={() => {
          setOpen("client");
        }}
      >
        <PersonOutlineRoundedIcon />
      </Button>

      <main className={classes.content}>
        {open === "admin" ? "123" : showPageAdmin()}
      </main>
    </>
  );
}
