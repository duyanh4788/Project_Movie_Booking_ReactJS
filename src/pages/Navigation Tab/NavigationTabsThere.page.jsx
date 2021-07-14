import React from "react";
// redux hook
import { useSelector } from "react-redux";
// material ui
import { Grid } from "@material-ui/core";
import format from "date-format";
import { Link } from "react-router-dom";

function NavigationTabsTherePage() {
  const lstCumRap = useSelector((state) => {
    return state.TabNavigationPageReducer.lstCumRap; // get lstCumRap to  TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const codeGroupCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeGroupCinema;
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeCinema; // get codeCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });

  const renderTenPhim = () => {
    const index = lstCumRap.findIndex(
      (item) => item.maCumRap === codeGroupCinema
    );
    if (index !== -1) {
      return lstCumRap[index].danhSachPhim.map((item, index) => {
        console.log(item);
        return (
          <Grid
            item
            xs={12}
            key={index}
            className="rowThereNavigationTab_Child"
          >
            <div className="rowThereNavigation_ChildTab_Intro">
              <Grid container>
                <Grid item xs={2}>
                  <div className="ChildTab_Intro_Img">
                    <img src={item.hinhAnh} alt={item.hinhAnh} />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <div className="ChildTab_Intro">
                    <label className={`maRap_${codeCinema}`}>
                      {item.maPhim}
                    </label>
                    <span>Tên Phim : {item.tenPhim.slice(0, 30)}</span>
                  </div>
                  <div xs={12} className="ChildTab_Timer">
                    {item.lstLichChieuTheoPhim.map((item, index) => {
                      return (
                        <Link to={`/bookingComponent/${item.maLichChieu}`}>
                          <span
                            key={index}
                            className={`timeCode ${codeCinema}`}
                          >
                            {format("hh:mm", new Date(item.ngayChieuGioChieu))}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        );
      });
    }
  };
  return (
    <Grid container item xs={6} className="rowThereNavigationTab">
      {renderTenPhim()}
    </Grid>
  );
}

export default NavigationTabsTherePage;
