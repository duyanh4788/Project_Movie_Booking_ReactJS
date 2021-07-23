import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieIcon from "@material-ui/icons/Movie";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import MovieManagement from "../../components/MovieManagement/MovieManagement";
import ClientMaragement from "../../components/ClientManagement/ClientMaragement";
import "./scss/admin.css";
import { Button, Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getLengthClientAdminPage,
  getLengthMovieAdminPage,
} from "../../store/actions/adminPage.action";

const useStyles = makeStyles((theme) => ({
  content: {
    width: "100%",
    padding: theme.spacing(3),
    minHeight: "500px",
  },
  paper: {
    width: "100%",
    padding: theme.spacing(2),
    color: "gray",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    boxShadow: "rgba(142, 142, 142, 0.19) 0px 6px 15px 0px",
    borderRadius: "5px",
    lineHeight: "30px",
  },
}));

export default function Admin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateMaNhom, setStateMaNhom] = useState({
    maNhom: "GP01",
  });
  // tab panel
  const [open, setOpen] = React.useState("admin");
  const showPageAdmin = () => {
    if (open === "client") {
      return <ClientMaragement />;
    } else if (open === "movie") {
      return <MovieManagement />;
    }
  };
  // tab panel

  const movieList = useSelector((state) => {
    return state.AdminPageReducer.movieList;
  });

  const listClient = useSelector((state) => {
    return state.AdminPageReducer.listClient;
  });

  useEffect(() => {
    dispatch(getLengthMovieAdminPage(stateMaNhom.maNhom));
  }, [dispatch, stateMaNhom.maNhom]);

  useEffect(() => {
    dispatch(getLengthClientAdminPage(stateMaNhom.maNhom));
  }, [dispatch, stateMaNhom.maNhom]);

  const getMaNhom = (e) => {
    const { name, value } = e.target;
    setStateMaNhom({ ...stateMaNhom, [name]: value });
  };
  // maNhom
  const renderMaNhom = () => {
    let arrMaNhom = [
      "GP01",
      "GP02 ",
      "GP03",
      "GP04 ",
      "GP05",
      "GP06 ",
      "GP07",
      "GP08 ",
      "GP09",
      "GP10 ",
    ];
    return arrMaNhom.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };
  const renderAdminPage = () => {
    return (
      <Container className="adminPage">
        <h5>Admin Page</h5>
        <span>Mã Nhóm : </span>
        <select name="maNhom" value={stateMaNhom.maNhom} onChange={getMaNhom}>
          {renderMaNhom()}
        </select>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <Paper className={classes.paper}>
              <h4>Số Phim Đang Chiếu</h4>
              <p>Nhóm : {stateMaNhom.maNhom}</p>
              <p>Số Lượng : {movieList.length} Phim</p>
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <Paper className={classes.paper}>
              <h4>Số Lượng Khách Hàng</h4>
              <p>Nhóm : {stateMaNhom.maNhom}</p>
              <p>Số Lượng : {listClient.length} Khách</p>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };

  // render
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
        {open === "admin" ? renderAdminPage() : showPageAdmin()}
      </main>
    </>
  );
}
