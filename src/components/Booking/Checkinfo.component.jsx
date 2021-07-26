import React from "react";
import "./scss/bookingComponent.css";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import { Container, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// date format
import * as dayjs from "dayjs";

const CheckInfoMaTion = (props) => {
  const { classes } = props;

  const listPhimBooking = useSelector((state) => {
    return state.BookingCodePhimReducer.listPhimBooking;
  });

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

  const renderCheckout = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    return listChairChoice.map((item, index) => {
      return (
        <p key={index}>
          Tên Ghế : {item.tenGhe} - Mã Ghế : {item.maGhe}
        </p>
      );
    });
  };

  const numberCheckout = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    return <span>Tổng Số Vé : {listChairChoice.length}</span>;
  };

  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maCumRap = arrShowTimeCode[2];
  let tenCumRap = arrShowTimeCode[3];
  let dateTime = `${arrShowTimeCode[4]}-${arrShowTimeCode[5]}-${arrShowTimeCode[6]}`;

  return (
    <Container>
      <Grid container className={classes.gridBooking}>
        <Grid item xs={12} md={2} lg={2}>
          <img src={listPhimBooking.hinhAnh} alt="" className="movie_bg" />
        </Grid>
        <Grid item xs={12} md={4} lg={4} className="movie_intro">
          <span>
            <p>
              Tên Cụm Rạp : {maCumRap}-{tenCumRap}
            </p>
            <p>Tên Phim : {listPhimBooking.tenPhim}</p>
            <p>Ngày Chiếu : {dayjs(dateTime).format("DD-MM-YYYY")}</p>
            <p>Giờ Chiếu : {dayjs(dateTime).format("HH:MM")}</p>
          </span>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={4}
          lg={4}
          className="movie_tabCheckout"
        >
          <Grid item xs={12}>
            {numberCheckout()}
            {renderCheckout()}
            <span>
              Tổng Tiền :{" "}
              {infoListChair
                .filter((chair) => chair.dangChon)
                .reduce((tong, itemF) => {
                  return (tong += itemF.giaVe);
                }, 0)
                .toLocaleString()}
              ;
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styled)(CheckInfoMaTion);
