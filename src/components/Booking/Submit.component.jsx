import {
  Backdrop,
  Fade,
  Modal,
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bookingTicketAction } from "../../store/actions/booking.action";
import Loader from "../Loader/Loader";
import visa from "../../assets/images/movie-3.jpg";

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
  const hanldeBooking = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    dispatch(bookingTicketAction(maLichChieu, listChairChoice)); // post to (arrShowTimeCode[0] === maLichChieu , listChairChoice ===  danhSachVe ) to Axios booking.action
    setOpen(true);
  };

  // modal
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push("/");
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
        <Container maxWidth="md" className="subMit">
          <Card>
            <CardMedia image={visa} title="visa" className={classes.media} />
            <CardContent>
              <Typography>
                Thanh Toán :{" "}
                {infoListChair
                  .filter((chair) => chair.dangChon)
                  .reduce((tong, itemF) => {
                    return (tong += itemF.giaVe);
                  }, 0)
                  .toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <button onClick={hanldeBooking}>Đặt Vé</button>
            </CardActions>
          </Card>
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
                <p>{mesageBooking}</p>
                <button onClick={handleClose}>Come Back Home</button>
              </div>
            </Fade>
          </Modal>
        </Container>
      )}
    </>
  );
}

export default withStyles(styled)(SubmitComponent);
