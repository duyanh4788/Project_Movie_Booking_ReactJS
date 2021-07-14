import React, { useEffect, useState } from "react";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// action redux thunk
import {
  bookingTicketAction,
  choiceChairAction,
  getTicketListAction,
} from "../../store/actions/booking.action";
// react router dom
import { useParams } from "react-router-dom";
// function component
import Loader from "../Loader/Loader";
// material ui
import {
  Button,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles({
  gridBooking: {
    padding: "15px",
  },
  choiceChair: {
    backgroundColor: "#6645fd",
    "&:hover": {
      backgroundColor: "#6645fd",
    },
  },
});

function BookingComponent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  // set loading
  const [loading, setLoading] = useState(null);
  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  console.log(showTimeCode);
  useEffect(() => {
    // post data (showTimeCode === maLichChieu) to Axios booking.action
    dispatch(getTicketListAction(showTimeCode)).then((loader) =>
      setLoading(loader)
    );
  }, [dispatch, showTimeCode]);

  const hanldeChoice = (chair) => {
    dispatch(choiceChairAction(chair)); // dispatch action to BookingReducer great value dangChon
  };
  const hanldeBooking = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    dispatch(bookingTicketAction(showTimeCode, listChairChoice)); // post to (showTimeCode === maLichChieu , listChairChoice ===  danhSachVe ) to Axios booking.action
    props.history.replace("/");
  };
  console.log(infoListChair);
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
            <TableRow>
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
          <Grid item xs={9}>
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
          <Grid item xs={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Số Thứ Tự</TableCell>
                    <TableCell>Mã Rạp</TableCell>
                    <TableCell>Mã Ghế Ngồi</TableCell>
                    <TableCell>Loại Ghế</TableCell>
                    <TableCell>Giá Vé</TableCell>
                  </TableRow>
                </TableHead>
                {renderListPrice()}
                <TableBody>
                  <TableRow>
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
      )}
    </>
  );
}

export default BookingComponent;
