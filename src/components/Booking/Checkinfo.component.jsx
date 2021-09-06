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
} from "@material-ui/core";
import { useSelector } from "react-redux";

const CheckInfoMaTion = (props) => {
  const { classes } = props;

  const listPhimBooking = useSelector((state) => {
    return state.BookingReducer.listPhimBooking;
  });

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  const infoCinema = useSelector((state) => {
    return state.BookingReducer.infoCinema; // get data BookingReducer
  });
  const renderCheckout = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    return listChairChoice.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.tenGhe}</td>
          <td>{item.maGhe} </td>
        </tr>
      );
    });
  };

  const numberCheckout = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    return <td colSpan="3" className="result">Tổng Số Vé : {listChairChoice.length} Vé</td>;
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
    <Container maxWidth="sm" className="checkInfo">
      <Card>
        <CardHeader
          avatar={
            <Avatar className={`${infoCinema?.tenCumRap.slice(0, 3)}`} aria-label="recipe">
              {infoCinema?.tenCumRap.slice(0, 3)}
            </Avatar>
          }
          title={`Tên Phim : ${listPhimBooking.tenPhim}`}
          subheader={`Ngày Chiếu : ${infoCinema?.ngayChieu} - Giờ Chiếu : ${infoCinema?.gioChieu}`}
        />
        {getUrlHttpS()}
        <CardContent>
          <div className="ticket">
            <table>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tên Ghế </th>
                  <th>Mã Ghế </th>
                </tr>
              </thead>
              <tbody>
                {renderCheckout()}
                <tr>
                  {numberCheckout()}
                </tr>
                <tr>
                  <td colSpan="3" className="result">
                    Thanh Toán :{" "}
                    {infoListChair
                      .filter((chair) => chair.dangChon)
                      .reduce((tong, itemF) => {
                        return (tong += itemF.giaVe);
                      }, 0)
                      .toLocaleString()} VND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default withStyles(styled)(CheckInfoMaTion);
