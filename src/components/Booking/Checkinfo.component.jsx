import React from "react";
import "./scss/bookingComponent.css";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
} from "@material-ui/core";
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
    return <p>Tổng Số Vé : {listChairChoice.length}</p>;
  };

  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maCumRap = arrShowTimeCode[2];
  let tenCumRap = arrShowTimeCode[3];
  let dateTime = `${arrShowTimeCode[4]}-${arrShowTimeCode[5]}-${arrShowTimeCode[6]}`;

  // https images
  const getUrlHttpS = () => {
    let httpS = listPhimBooking.hinhAnh.split(":");
    let urlImg = httpS[0] + "s:" + httpS[1];
    return (
      <CardMedia image={urlImg} title="imageMovie" className={classes.media} />
    );
  };
  return (
    <Container maxWidth="sm" className="checkInfo">
      <Card>
        <CardHeader
          avatar={
            <Avatar className={`${maCumRap.slice(0, 3)}`} aria-label="recipe">
              {maCumRap.slice(0, 3)}
            </Avatar>
          }
          title={`${maCumRap} - ${tenCumRap}`}
        />
        {getUrlHttpS()}
        <CardContent>
          <Grid container className={classes.carContent}>
            <Grid item xs={12} sm={6} lg={6}>
              <span>Tên Phim : {listPhimBooking.tenPhim}</span>
              <p>Ngày Chiếu : {dayjs(dateTime).format(" DD-MM-YYYY ")}</p>
              <p>Giờ Chiếu : {dayjs(dateTime).format("HH:MM")}</p>
            </Grid>
            <Grid item xs={12} sm={6} lg={6} className="ticket">
              <span>
                Thanh Toán :{" "}
                {infoListChair
                  .filter((chair) => chair.dangChon)
                  .reduce((tong, itemF) => {
                    return (tong += itemF.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
              {numberCheckout()}
              {renderCheckout()}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default withStyles(styled)(CheckInfoMaTion);
