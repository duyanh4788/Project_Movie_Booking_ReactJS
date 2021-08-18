import React, { useEffect } from "react";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// rfce
import NavigationTabsTwoPage from "./NavigationTabsTwo.page";
import NavigationTabsTherePage from "./NavigationTabsThere.page";
// material ui
import { Container, Grid } from "@material-ui/core";
// css
import "./css/Navigation.style.css";
import {
  getCodeCinemaPage,
  getCodeGroupCinemaPage,
  getListShowTimePageAction,
  getMovieSchedulePage,
  schedulerMovieAction,
} from "../../store/actions/tabNavigationPage.action";

function NavigationTabsOnePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListShowTimePageAction()); // get data to Axios tabNavigationPage.action
  }, [dispatch]);

  const listShowTime = useSelector((state) => {
    return state.TabNavigationPageReducer.listShowTime; // get data to TabNavigationPageReducer
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeCinema; // get codeCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });

  const handleCodeCinema = (codeCinema) => {
    dispatch(getCodeCinemaPage(codeCinema));
    dispatch(getMovieSchedulePage([]));
    dispatch(getCodeGroupCinemaPage([]))
    dispatch(schedulerMovieAction(undefined))
  };

  const renderLoGo = () => {
    return listShowTime.map((item, index) => {
      let httpS = item.logo.split(":");
      let urlImg = httpS[0] + "s:" + httpS[1];
      return (
        <Grid
          item
          xs={12}
          key={index}
          className={
            item.maHeThongRap === codeCinema
              ? "rowOne_ChildTab_Active"
              : "rowOne_ChildTab"
          }
        >
          <img
            src={urlImg}
            alt=""
            onClick={() => {
              handleCodeCinema(item.maHeThongRap);
            }}
          />
        </Grid>
      );
    });
  };
  return (
    <>
      <div className="bgNaVigation"></div>
      <Container id="cumRap">
        <Grid container className="naViGaTionTab">
          <Grid container item xs={1} className="rowOneNavigationTab">
            {renderLoGo()}
          </Grid>
          {/* 2 */}
          <NavigationTabsTwoPage />
          {/* 2 */}
          {/* 3 */}
          <NavigationTabsTherePage />
          {/* 3 */}
        </Grid>
      </Container>
      <div className="bgNaVigation"></div>
    </>
  );
}

export default NavigationTabsOnePage;
