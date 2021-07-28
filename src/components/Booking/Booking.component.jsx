/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
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
import * as dayjs from "dayjs";

function BookingComponent(props) {
  const { classes } = props;

  // set loading
  const [loading, setLoading] = useState(null);

  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];
  let maPhim = arrShowTimeCode[1];
  let maCumRap = arrShowTimeCode[2];
  let tenCumRap = arrShowTimeCode[3];
  let dateTime = `${arrShowTimeCode[4]}-${arrShowTimeCode[5]}-${arrShowTimeCode[6]}`;

  // call api
  useEffect(() => {
    dispatch(getMaPhimBooking(maPhim));
  }, [dispatch, maPhim]);
  const listPhimBooking = useSelector((state) => {
    return state.BookingCodePhimReducer.listPhimBooking;
  });

  let countdownTimer = 0;
  const countdownTimerS = () => {
    let seconds = 1500000;
    function secondPassed() {
      let stateMinutes = Math.round((seconds - 30) / 60);
      let stateSecond = seconds % 60;
      if (stateSecond < 10) {
        stateSecond = "0" + stateSecond;
      }
      if (stateMinutes < 10) {
        stateMinutes = "0" + stateMinutes;
      }
      if (document.getElementById("countdown-timer") !== null) {
        document.getElementById("countdown-timer").innerHTML =
          stateMinutes + ":" + stateSecond;
      }

      if (
        seconds === 0 &&
        document.getElementById("expiredCheckout") !== null &&
        document.getElementById("countdown-timer") !== null
      ) {
        clearInterval(countdownTimer);
        document.getElementById("expiredCheckout").style.display = "block";
        document.getElementById("countdown-timer").style.display = "none";
      } else seconds--;
    }
    countdownTimer = setInterval(secondPassed, 1000);
  };

  const comeBack = () => {
    if (
      document.getElementById("expiredCheckout") !== null &&
      document.getElementById("countdown-timer") !== null
    ) {
      document.getElementById("expiredCheckout").style.display = "none";
      document.getElementById("countdown-timer").style.display = "block";
      setLoading(null);
      countdownTimerS();
      dispatch(getTicketListAction(maLichChieu));
      setTimeout(() => {
        setLoading("e");
      }, 1000);
    }
  };

  useEffect(() => {
    countdownTimerS();
    return () => {
      clearInterval(countdownTimer);
    };
  }, []);
  //set coundown timer

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
  // https images
  const getUrlHttpS = () => {
    let httpS = listPhimBooking.hinhAnh.split(":");
    let urlImg = httpS[0] + "s:" + httpS[1];
    return <img src={urlImg} alt={urlImg} className="movie_bg" />;
  };

  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <Grid container className={classes.gridBooking}>
          <Grid item xs={12} lg={6} className="countDownTimerMain">
            <p>Thời Gian Đặt Ghế</p>
            <span id="countdown-timer">00:00</span>
            <div id="expiredCheckout" className="expiredCheckout">
              <div className="modalMesage">
                <span>Thời Gian Đặt Ghế Là 15s . Hãy Đặt Ghế Lại :D </span>
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
              <Grid item xs={12} md={5} lg={3} style={{ textAlign: "center" }}>
                {getUrlHttpS()}
              </Grid>
              <Grid item xs={12} md={7} lg={9} className="movie_intro">
                <span>
                  <p>
                    Tên Cụm Rạp : {maCumRap}-{tenCumRap}
                  </p>
                  <p>Tên Phim : {listPhimBooking.tenPhim}</p>
                  <p>
                    Ngày Chiếu :
                    {dayjs(dateTime).format("DD-MM-YYYY")}
                  </p>
                  <p>
                    Giờ Chiếu :{" "}
                    {dayjs(dateTime).format("HH:MM")}
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

export default memo(withStyles(styled)(withRouter(BookingComponent)));
