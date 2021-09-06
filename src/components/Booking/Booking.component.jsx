/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from "react";
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
// material ui
import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import Loader from "../Loader/Loader";
// date format

function BookingComponent(props) {
  const { classes } = props;

  // set loading
  // show loading
  const loading = useSelector((state) => state.CommonReducer.loading);

  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

  useEffect(() => {
    countdownTimerS();
    return () => {
      clearInterval(countdownTimer);
    };
  }, [infoListChair.length > 0]);
  //set coundown timer

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
      countdownTimerS();
      dispatch(getTicketListAction(maLichChieu));
    }
  };

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

  return loading ? <Loader /> : (
    <Container>
      <Grid container className={`booking`}>
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

        <Grid item xs={12} lg={12}>
          <div className="screen">
            <img src={screenS} alt="" />
          </div>
          {renderListChari()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(withStyles(styled)(withRouter(BookingComponent)));
