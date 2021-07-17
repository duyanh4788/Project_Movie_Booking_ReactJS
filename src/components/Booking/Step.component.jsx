import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CheckInfoMaTion from "./Checkinfo.component";
import SubmitComponent from "./Submit.component";
import BookingComponent from "./Booking.component";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";

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
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const infoListChair = useSelector((state) => {
    return state.BookingReducer.listChair; // get data BookingReducer
  });
  const listChairChoice = infoListChair.filter((chair) => chair.dangChon);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
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
