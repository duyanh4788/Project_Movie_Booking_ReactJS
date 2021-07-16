import React, { useEffect, useState } from "react";
import "./scss/bookingComponent.css";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import {
  bookingTicketAction,
  choiceChairAction,
  getTicketListAction,
} from "../../store/actions/booking.action";
// react router dom
import { useHistory, useParams, withRouter } from "react-router-dom";
// function component
import Loader from "../Loader/Loader";
// material ui
import {
  Button,
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
  const history = useHistory();

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
  const hanldeBooking = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    dispatch(bookingTicketAction(maLichChieu, listChairChoice)); // post to (arrShowTimeCode[0] === maLichChieu , listChairChoice ===  danhSachVe ) to Axios booking.action
    history.push("/");
  };

  const renderListChari = () => {
    return infoListChair?.map((item, index) => {
      return (
        <Button
          className={item.dangChon ? classes.choiceChair : ""}
          disabled={item.daDat}
          variant="contained"
          color={item.daDat ? "primary" : "secondary"}
          key={index}
          onClick={() => {
            hanldeChoice(item);
          }}
        >
          {item.tenGhe}
        </Button>
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
  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <Grid container className={classes.gridBooking}>
          <Grid item xs={12} md={4} lg={6} className={classes.pading}>
            {renderListChari()}
            <div style={{ textAlign: "center", margin: "10px 0" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={hanldeBooking}
              >
                Booking
              </Button>
            </div>
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
                <Table >
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
