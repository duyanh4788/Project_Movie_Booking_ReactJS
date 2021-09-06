/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import "./scss/bookingComponent.css";
import screenS from "./images/screen.png";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import {
  choiceChairAction,
} from "../../store/actions/booking.action";
// react router dom
import { withRouter } from "react-router-dom";
// function component
// material ui
import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import Loader from "../Loader/Loader";
// date format

function BookingComponent(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.CommonReducer.loading);
  // recive to componet/Showtimecomponent
  // const { showTimeCode } = useParams();
  // let arrShowTimeCode = showTimeCode.split("-");
  // let maLichChieu = arrShowTimeCode[0];

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

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
