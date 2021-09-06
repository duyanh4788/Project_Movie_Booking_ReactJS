import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CheckInfoMaTion from "./Checkinfo.component";
import SubmitComponent from "./Submit.component";
import BookingComponent from "./Booking.component";
import { Card, CardHeader, Container, Grid, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "antd";
import { useParams } from "react-router";
import { red } from '@material-ui/core/colors';
import { getMaPhimBooking, getTicketListAction } from "../../store/actions/booking.action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  iconButton: {
    fontSize: "15px",
    fontWeight: "bolder",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    minWidth: 275,
    marginTop: "100px",
    marginBottom: "30px"
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function getSteps() {
  return ["Chọn Ghế", "Kiểm Tra Thông Tin", "Thanh Toán"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BookingComponent />;
    case 1:
      return <CheckInfoMaTion />;
    case 2:
      return <SubmitComponent />;
    default:
      break;
  }
}

export default function StepComponent() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { showTimeCode } = useParams();
  let arrShowTimeCode = showTimeCode.split("-");
  let maLichChieu = arrShowTimeCode[0];
  let maPhim = arrShowTimeCode[1];
  // show loading

  useEffect(() => {
    dispatch(getMaPhimBooking(maPhim));
  }, [dispatch, maPhim]);

  useEffect(() => {
    dispatch(getTicketListAction(maLichChieu));
  }, [dispatch, maLichChieu]);



  let countdownTimer = 0;
  const countdownTimerS = () => {
    let seconds = 120;
    function secondPassed() {
      let stateMinutes = Math.round((seconds - 30) / 60);
      let stateSecond = seconds % 60;
      if (stateSecond < 10) {
        stateSecond = "0" + stateSecond;
      }
      if (stateMinutes < 10) {
        stateMinutes = "0" + stateMinutes;
      }
      if (document.getElementById("countdown-timer") !== null) {
        document.getElementById("countdown-timer").innerHTML =
          stateMinutes + ":" + stateSecond;
      }

      if (
        seconds === 0 &&
        document.getElementById("expiredCheckout") !== null &&
        document.getElementById("countdown-timer") !== null
      ) {
        clearInterval(countdownTimer);
        document.getElementById("expiredCheckout").style.display = "block";
        document.getElementById("countdown-timer").style.display = "none";
      } else seconds--;
    }
    countdownTimer = setInterval(secondPassed, 1000);
  };



  const comeBack = () => {
    if (
      document.getElementById("expiredCheckout") !== null &&
      document.getElementById("countdown-timer") !== null
    ) {
      document.getElementById("expiredCheckout").style.display = "none";
      document.getElementById("countdown-timer").style.display = "block";
      countdownTimerS();
      setActiveStep(0)
      dispatch(getTicketListAction(maLichChieu));
    }
  };
  //set coundown timer

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

  useEffect(() => {
    countdownTimerS();
    return () => {
      clearInterval(countdownTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const infoCinema = useSelector((state) => {
    return state.BookingReducer.infoCinema; // get data BookingReducer
  });

  const listChairChoice = infoListChair.filter((chair) => chair.dangChon);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) {
      dispatch(getTicketListAction(maLichChieu));
    }
  };

  return (<div className={classes.root}>
    <Container className="checkInfo">
      <Card className={classes.card}>
        {infoCinema ? <Grid container>
          <Grid item xs={12} sm={6} lg={6}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={`${infoCinema?.tenCumRap.slice(0, 3)}`} >
                  {infoCinema?.tenCumRap.slice(0, 3)}
                </Avatar>
              }
              title={infoCinema?.tenCumRap}
              subheader={infoCinema?.diaChi}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CardHeader avatar={<Avatar aria-label="recipe"></Avatar>}
              title={`${infoCinema?.tenRap} - ${infoCinema?.tenPhim}`}
              subheader={`${infoCinema?.ngayChieu} - ${infoCinema?.gioChieu}`}
            />
          </Grid>
        </Grid> : ""}
      </Card>
      <Grid item xs={12} className="stepTime">
        <div className="countDownTimerMain">
          <p>Thời Gian Đặt Ghế</p>
          <span id="countdown-timer">00:00</span>
          <div id="expiredCheckout" className="expiredCheckout">
            <div className="modalMesage">
              <span>Thời Gian Đặt Ghế Là 2 phút , Bạn Hãy Đặt Ghế Lại</span>
              <p onClick={comeBack}>Booking Again !</p>
            </div>
          </div>
        </div>
      </Grid>
    </Container>

    <Stepper activeStep={activeStep} alternativeLabel className="stePper">
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <div className={classes.instructions}>
      {getStepContent(activeStep)}
      <div style={{ textAlign: "center" }}>
        <IconButton
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.iconButton}
        >
          <p>Trở Lại</p>
        </IconButton>

        {listChairChoice.length <= 0 ? (
          <IconButton disabled className={classes.iconButton}>
            <p>Tiếp Theo</p>
          </IconButton>
        ) : (
          <>
            {activeStep === steps.length - 1 ? (
              <IconButton style={{ display: "none" }}></IconButton>
            ) : (
              <IconButton onClick={handleNext} className={classes.iconButton}>
                <p>Tiếp Theo</p>
              </IconButton>
            )}
          </>
        )}
      </div>
    </div>
  </div>
  );
}
