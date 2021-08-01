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
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
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
              <TableCell>
                {item.loaiGhe === "Thuong" ? "Standard" : "Vip"}
              </TableCell>
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
    return (
      <CardMedia image={urlImg} title="imageMovie" className={classes.media} />
    );
  };

  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <Grid container className={`${classes.gridBooking} booking`}>
          <Grid item xs={12} lg={12} className="countDownTimerMain">
            <p>Thời Gian Đặt Ghế</p>
            <span id="countdown-timer">00:00</span>
            <div id="expiredCheckout" className="expiredCheckout">
              <div className="modalMesage">
                <span>Thời Gian Đặt Ghế Là 15s . Hãy Đặt Ghế Lại :D </span>
                <p onClick={comeBack}>Booking Again !</p>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={6} className={classes.pading}>
            <div className="screen">
              <img src={screenS} alt="" />
            </div>
            {renderListChari()}
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            container
            className={classes.pading}
          >
            <Grid item xs={12} sm={4} md={4} lg={4} className={classes.pading}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={`${maCumRap.slice(0, 3)}`}
                    >
                      {maCumRap.slice(0, 3)}
                    </Avatar>
                  }
                  title={`${maCumRap} - ${tenCumRap}`}
                />
                {getUrlHttpS()}
                <CardContent>
                  <span>
                    <p>Tên Phim : {listPhimBooking.tenPhim}</p>
                    <p>Ngày Chiếu : {dayjs(dateTime).format(" DD-MM-YYYY ")}</p>
                    <p>Giờ Chiếu : {dayjs(dateTime).format("HH:MM")}</p>
                  </span>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={8} md={8} lg={8} className={classes.pading}>
              <TableContainer className="tableBooking">
                <Table>
                  <TableHead>
                    <TableRow className="tableCheckout">
                      <TableCell>STT</TableCell>
                      <TableCell>Mã Rạp</TableCell>
                      <TableCell>Mã Ghế</TableCell>
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
