/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// function component InfoUser
import InfoUser from "../Info-User/Info-User.page";
import { imagesLogo } from "./imaGesLogo";
// redux
import { useDispatch, useSelector } from "react-redux";
// react-router-dom
import { Link } from "react-router-dom";
// material
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
// css
import "./css/header.style.css";
import CinemaDetailPage from "../CinemaDetailPage/CinemaDetail.page";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";

function Header(props) {
  const dispatch = useDispatch();
  // take data reducer/signIn.reducer
  let signIn = useSelector((state) => {
    return state.signInReducer.auth;
  });

  const userSigIn = JSON.parse(localStorage.getItem("userLogin"));
  if (userSigIn) {
    let signInUpdate = { ...signIn };
    signInUpdate.hoTen = userSigIn.hoTen;
    signIn = signInUpdate;
  }

  return (
    <AppBar position="static" color="inherit" id="navbar" className="header">
      <Toolbar>
        <Grid item xs={1}>
          <Link to="/">
            <img src={imagesLogo.img} alt="logo" className="headerloGo" />
          </Link>
        </Grid>
        <Grid item xs={3} className="headerTitle">
          <CinemaDetailPage />
        </Grid>
        <Grid item xs={4} className="headerTitle">
          <a href="#lichChieu">Lịch Chiếu</a>
          <a href="#cumRap">Cụm Rạp</a>
          <a href="#ungDung">Ứng Dụng</a>
        </Grid>
        <Grid item xs={4} className="headerUser">
          {signIn.hoTen !== "" ? (
            <>
              <InfoUser />
              {/* acces to pages/Sign-Out/signout.page-rfc */}
            </>
          ) : (
            <label>
              <AccountCircleIcon className="icon" />
              <Link to="/signUp" className="title">
                Đăng Kí {/* acces to pages/Sign-Up/Sign-Up.page-rcc*/}
              </Link>
              <LocationOnIcon className="icon" />
              <Link
                to="/signIn"
                className="title"
                onClick={() => {
                  dispatch(setDataErrorToZero(0));
                }}
              >
                Đăng Nhập {/* acces to pages/Sign-In/Sign-In.page-rfc */}
              </Link>
            </label>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
