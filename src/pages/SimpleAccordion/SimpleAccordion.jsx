import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./scss/simpleaccordion.css";
import { useHistory } from "react-router-dom";

export default function SimpleAccordion() {
  const hisTory = useHistory();

  const listShowTime = useSelector((state) => {
    return state.TabNavigationPageReducer.listShowTime; // get data to TabNavigationPageReducer
  });

  const handleLogo = (maHeThongRap) => {
    hisTory.push(`/cinemaDetail/${maHeThongRap}`);
  };

  const renderLoGo = () => {
    return listShowTime.map((item, index) => {
      return (
        <Grid item lg={2} key={index}>
          <button
          className="btnimgCinemaS"
            onClick={() => {
              handleLogo(item.maHeThongRap);
            }}
          >
            <img src={item.logo} alt="" className="imgCinemaS" />
          </button>
        </Grid>
      );
    });
  };

  return (
    <Container maxWidth="sm">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Chọn Rạp</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>{renderLoGo()}</Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
