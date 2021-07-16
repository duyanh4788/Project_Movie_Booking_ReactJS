import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { bookingTicketAction } from "../../store/actions/booking.action";

function SubmitComponent() {
  const history = useHistory();
  const dispatch = useDispatch();
  // recive to componet/Showtimecomponent
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];
  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

  const hanldeBooking = () => {
    const listChairChoice = infoListChair.filter((chair) => chair.dangChon);
    dispatch(bookingTicketAction(maLichChieu, listChairChoice)); // post to (arrShowTimeCode[0] === maLichChieu , listChairChoice ===  danhSachVe ) to Axios booking.action
    history.push("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={hanldeBooking}
      >
        Booking
      </Button>
    </div>
  );
}

export default SubmitComponent;
