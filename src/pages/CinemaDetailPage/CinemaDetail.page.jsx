import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./scss/CinemaDetailPage.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getLogoCinema } from "../../store/actions/cinemaDetail.action";

export default function CinemaDetailPage() {
  const hisTory = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogoCinema());
  }, [dispatch]);

  const listLogoCinema = useSelector((state) => {
    return state.CinemaDetailReducer.loGoCinema; // get data to CinemaDetailReducer
  });

  const handleLogo = (maHeThongRap) => {
    hisTory.push(`/cinemaDetail/${maHeThongRap}`); // post maCumRap => CinemaDetailComponent
  };

  const renderLoGo = () => {
    return listLogoCinema.map((item, index) => {
      return (
        <Grid item xs={4} lg={2} key={index}>
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <p className="titleSimple">Chọn Rạp</p>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>{renderLoGo()}</Grid>
      </AccordionDetails>
    </Accordion>
  );
}
