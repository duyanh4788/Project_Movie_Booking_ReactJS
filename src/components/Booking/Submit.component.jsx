import React, { useEffect } from "react";
import {
  Backdrop,
  Fade,
  Modal,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { styled } from "./booking.styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bookingTicketAction } from "../../store/actions/booking.action";
import Loader from "../Loader/Loader";

function SubmitComponent(props) {
  const { classes } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  // modal
  const [open, setOpen] = React.useState(false);

  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];

  const infoCinema = useSelector((state) => {
    return state.BookingReducer?.infoCinema || {}; // get data BookingReducer
  });
  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  const mesageBooking = useSelector((state) => {
    return state.BookingReducer.mesageBooking; // get data BookingReducer
  });
  const hanldeBooking = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    dispatch(bookingTicketAction(maLichChieu, listChairChoice));
  };

  useEffect(() => {
    if (mesageBooking.status === 200) {
      setOpen(true);
    }
  }, [mesageBooking])

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
          <img src={infoCinema?.thongTinPhim?.hinhAnh} alt="" onClick={hanldeBooking} className="imgBooking" id="cog" />
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
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
                <p>{mesageBooking.data}</p>
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
