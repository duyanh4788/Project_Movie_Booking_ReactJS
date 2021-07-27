import React from "react";
// redux hook
import { useDispatch, useSelector } from "react-redux";
// material ui
import { Grid } from "@material-ui/core";
import { getCodeGroupCinemaPage, getMovieSchedulePage, getNameGroupCinemaPage, setDateSchedulePage } from "../../store/actions/tabNavigationPage.action";
import { listCinema } from "./dataCinema";

function NavigationTabsTwoPage() {
  const dispatch = useDispatch();

  const listShowTime = useSelector((state) => {
    return state.TabNavigationPageReducer.listShowTime; // get data to TabNavigationPageReducer => type : GET_LIST_SHOWTIME_PAGE:
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeCinema; // get codeCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const codeGroupCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeGroupCinema;
  });
  const handleMaCumRap = (codeGroupCinema, nameGroupCinema) => {
    dispatch(getCodeGroupCinemaPage(codeGroupCinema));
    dispatch(getNameGroupCinemaPage(nameGroupCinema));
    dispatch(getMovieSchedulePage([]));
    dispatch(setDateSchedulePage(""));
  };
  const renderImageCinema = () => {
    const item = listCinema.find((item) => item.name === codeCinema);
    return <img src={item.img} alt={item.img} />;
  };

  const renderListCumRap = () => {
    const index = listShowTime.findIndex(
      (item) => item.maHeThongRap === codeCinema
    );
    if (index !== -1) {
      return listShowTime[index].lstCumRap.map((item, index) => {
        return (
          <Grid
            item
            xs={12}
            key={index}
            className={
              item.maCumRap === codeGroupCinema
                ? "rowTwo_ChildTab_Active"
                : "rowTwo_ChildTab"
            }
          >
            <Grid container className="childTab_Intro">
              <Grid className="child_Image" item xs={2}>
                {renderImageCinema()}
              </Grid>
              <Grid className="child_Intro" item xs={10}>
                <p className={`${codeCinema}`}>{item.tenCumRap}</p>
                <p className="address">{item.diaChi.slice(0, 50)}</p>
                <span
                  onClick={() => {
                    handleMaCumRap(item.maCumRap, item.tenCumRap);
                  }}
                >
                  [Chi Tiết]
                </span>
              </Grid>
            </Grid>
          </Grid>
        );
      });
    }
  };

  return (
    <Grid container item xs={5} className="rowTwoNavigationTab">
      {renderListCumRap()}
    </Grid>
  );
}

export default NavigationTabsTwoPage;
