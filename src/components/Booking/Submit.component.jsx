import { Backdrop, Fade, Modal, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bookingTicketAction } from "../../store/actions/booking.action";
import Loader from "../Loader/Loader";

function SubmitComponent(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];
  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  const mesageBooking = useSelector((state) => {
    return state.BookingReducer.mesageBooking; // get data BookingReducer
  });
  const errorMesage = useSelector((state) => {
    return state.BookingReducer.errorMesage; // get data BookingReducer
  });

  const hanldeBooking = () => {
    console.log(errorMesage);
    if (errorMesage === 401) {
      setOpen(true);
    } else {
      const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
      dispatch(bookingTicketAction(maLichChieu, listChairChoice)); // post to (arrShowTimeCode[0] === maLichChieu , listChairChoice ===  danhSachVe ) to Axios booking.action
      setOpen(true);
    }
  };

  // modal
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    if (errorMesage === 401) {
      history.push("/signIn", { showTimeCode });
    } else {
      history.push("/");
    }
  };
  // modal
  // loading
  const loading = useSelector((state) => {
    return state.CommonReducer.loading;
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="subMit">
          <div className={classes.paper}>
            <Paper elevation={3} className="paper">
              <span>
                Tổng Tiền :{" "}
                {infoListChair
                  .filter((chair) => chair.dangChon)
                  .reduce((tong, itemF) => {
                    return (tong += itemF.giaVe);
                  }, 0)
                  .toLocaleString()}
              </span>
            </Paper>
          </div>
          <button onClick={hanldeBooking}>Booking</button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="mesageBooking">
                {errorMesage === 401 ? (
                  <>
                    <p>Bạn Phải Đăng Nhập Để Đặt Vé </p>
                    <p style={{ textAlign: "center" }}> Go Page Sign in </p>
                  </>
                ) : (
                  <>
                    <p>{mesageBooking}</p>
                    <p>Come Back Home</p>
                  </>
                )}
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </>
  );
}

export default withStyles(styled)(SubmitComponent);
