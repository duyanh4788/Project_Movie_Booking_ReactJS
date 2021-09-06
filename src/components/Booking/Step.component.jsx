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

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });

  const infoCinema = useSelector((state) => {
    return state.BookingReducer.infoCinema; // get data BookingReducer
  });
  
  const listChairChoice = infoListChair.filter((chair) => chair.dangChon);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    dispatch(getTicketListAction(maLichChieu));
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
