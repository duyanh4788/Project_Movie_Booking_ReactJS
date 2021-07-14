import React from "react";
// rfce
import NavigationTabsTwocomponent from "./NavigationTabsTwo.component";
import NavigationTabsTherecomponent from "./NavigationTabsThere.component";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// dispatch action
import { groupCinematAction } from "../../store/actions/tabNavigationComponent.action";
// material ui
import { Container, Grid } from "@material-ui/core";
// css
import "./css/Navigation.style.css";

function NavigationTabsOnecomponent() {
  const dispatch = useDispatch();
  const listSystem = useSelector((state) => {
    return state.TabNavigationComponentReducer.listSystem; // get data to TabNavigationReducer
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationComponentReducer.codeCinema; // get data to TabNavigationReducer
  });
  const hanldeChonRap = (maHeThongRap) => {
    dispatch(groupCinematAction(maHeThongRap));
  };
  const renderLoGo = () => {
    return listSystem.map((item, index) => {
      return (
        <Grid
          item
          xs={12}
          key={index}
          className={
            item.maHeThongRap === codeCinema
              ? "rowOneNavigation_Child_Active"
              : "rowOneNavigation_Child"
          }
        >
          <button
            onClick={() => {
              hanldeChonRap(item.maHeThongRap);
            }}
          >
            <img
              src={item.logo}
              alt=""
              className="rowOneNavigation_Child_Images"
            />
          </button>
        </Grid>
      );
    });
  };
  return (
    <>
      <div className="bgNaVigato"></div>
      <Container>
        <Grid container className="naViGaTion">
          <Grid container item xs={1} className="rowOneNavigation">
            {renderLoGo()}
          </Grid>
          {/* 2 */}
          <NavigationTabsTwocomponent />
          {/* 2 */}
          {/* 3 */}
          <NavigationTabsTherecomponent />
          {/* 3 */}
        </Grid>
      </Container>
      <div className="bgNaVigato"></div>
    </>
  );
}

export default NavigationTabsOnecomponent;
