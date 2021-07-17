/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./scss/bookingComponent.css";
import screenS from "./images/screen.png";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import {
  choiceChairAction,
  getTicketListAction,
} from "../../store/actions/booking.action";
// react router dom
import { useParams, withRouter } from "react-router-dom";
// function component
import Loader from "../Loader/Loader";
// material ui
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import { getMaPhimBooking } from "../../store/actions/bookingCodePhim.action";
// date format
import format from "date-format";

function BookingComponent(props) {
  const { classes } = props;

  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];
  let maPhim = arrShowTimeCode[1];
  let maCumRap = arrShowTimeCode[2];
  let tenCumRap = arrShowTimeCode[3];
  // call api
  useEffect(() => {
    dispatch(getMaPhimBooking(maPhim));
  }, [dispatch, maPhim]);
  const listPhimBooking = useSelector((state) => {
    return state.BookingCodePhimReducer.listPhimBooking;
  });

  //set coundown timer
  const [timeOut, setTimeOut] = React.useState(false);
  const [timeS, setTime] = useState({
    timer: "",
  });
  let countdownTimer = 0;
  const countdownTimerS = () => {
    let seconds = 15;
    function secondPassed() {
      let stateMinutes = Math.round((seconds - 30) / 60);
      let stateSecond = seconds % 60;
      if (stateSecond < 10) {
        stateSecond = "0" + stateSecond;
      }
      if (stateMinutes < 10) {
        stateMinutes = "0" + stateMinutes;
      }
      setTime({
        timer: stateMinutes + ":" + stateSecond,
      });
      if (seconds === 0) {
        clearInterval(countdownTimer);
        document.getElementById("expiredCheckout").style.display = "block";
        document.getElementById("countdownTimer").style.display = "none";
        setTimeOut(true);
      } else seconds--;
    }
    countdownTimer = setInterval(secondPassed, 1000);
  };
  const comeBack = () => {
    setTimeOut(false);
    document.getElementById("expiredCheckout").style.display = "none";
    document.getElementById("countdownTimer").style.display = "block";
    countdownTimerS();
  };
  useEffect(() => {
    countdownTimerS();
    return () => {
      clearInterval(countdownTimer);
    };
  }, []);
  //set coundown timer

  // set loading
  const [loading, setLoading] = useState(null);
  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  useEffect(() => {
    // post data (maLichChieu === maLichChieu) to Axios booking.action
    dispatch(getTicketListAction(maLichChieu)).then((loader) =>
      setLoading(loader)
    );
  }, [maLichChieu, dispatch]);

  const hanldeChoice = (chair) => {
    dispatch(choiceChairAction(chair)); // dispatch action to BookingReducer great value dangChon
  };

  const renderListChari = () => {
    if (!timeOut) {
      return infoListChair?.map((item, index) => {
        return (
          <button
            className={
              item.dangChon
                ? classes.choiceChair
                : classes.unChoiceChair && item.daDat
                ? classes.bookingChair
                : classes.unChoiceChair
            }
            disabled={item.daDat}
            variant="contained"
            color={item.daDat ? "secondary" : ""}
            key={index}
            onClick={() => {
              hanldeChoice(item);
            }}
          >
            {item.tenGhe}
          </button>
        );
      });
    }
  };
  const renderListPrice = () => {
    return infoListChair.map((item, index) => {
      return (
        <TableBody key={index}>
          {item.dangChon ? (
            <TableRow className="tableCheckout">
              <TableCell>{item.stt}</TableCell>
              <TableCell>{item.maRap}</TableCell>
              <TableCell>{item.maGhe}</TableCell>
              <TableCell>{item.loaiGhe}</TableCell>
              <TableCell>{item.giaVe.toLocaleString()}</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      );
    });
  };
  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <Grid container className={classes.gridBooking}>
          <Grid item xs={12} lg={6} style={{ textAlign: "center" }}>
            <p>Thời Gian Đặt Ghế</p>
            <label id="countdownTimer">{timeS.timer}</label>
            <div id="expiredCheckout" className="expiredCheckout">
              <div className="modalMesage">
                <span>Thời Gian Đặt Ghế Là 5s . Hãy Đặt Ghế Lại :D </span>
                <p onClick={comeBack}>Booking Again !</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}></Grid>
          <Grid item xs={12} md={4} lg={6} className={classes.pading}>
            <div className="screen">
              <img src={screenS} alt="" />
            </div>
            {renderListChari()}
          </Grid>
          <Grid item xs={12} md={4} lg={6} container>
            <Grid item xs={12} md={12} lg={12} container>
              <Grid item xs={12} md={5} lg={3}>
                <img
                  src={listPhimBooking.hinhAnh}
                  alt=""
                  className="movie_bg"
                />
              </Grid>
              <Grid item xs={12} md={7} lg={9} className="movie_intro">
                <span>
                  <p>
                    Tên Cụm Rạp : {maCumRap}-{tenCumRap}
                  </p>
                  <p>Tên Phim : {listPhimBooking.tenPhim}</p>
                  <p>
                    Ngày Chiếu :{" "}
                    {format(
                      "dd-mm-yyyy",
                      new Date(listPhimBooking.ngayKhoiChieu)
                    )}
                  </p>
                  <p>
                    Giờ Chiếu :{" "}
                    {format("hh:mm", new Date(listPhimBooking.ngayKhoiChieu))}
                  </p>
                </span>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TableContainer className="tableS">
                <Table>
                  <TableHead>
                    <TableRow className="tableCheckout">
                      <TableCell>Số Thứ Tự</TableCell>
                      <TableCell>Mã Rạp</TableCell>
                      <TableCell>Mã Ghế Ngồi</TableCell>
                      <TableCell>Loại Ghế</TableCell>
                      <TableCell>Giá Vé</TableCell>
                    </TableRow>
                  </TableHead>
                  {renderListPrice()}
                  <TableBody>
                    <TableRow className="tableCheckout">
                      <TableCell>Tổng Cộng</TableCell>
                      <TableCell colSpan="3"></TableCell>
                      <TableCell>
                        {infoListChair
                          .filter((item) => item.dangChon)
                          .reduce((tong, item) => {
                            return (tong += item.giaVe);
                          }, 0)
                          .toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default withStyles(styled)(withRouter(BookingComponent));
