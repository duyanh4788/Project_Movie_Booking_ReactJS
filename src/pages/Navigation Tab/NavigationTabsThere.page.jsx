import React, { useState } from "react";
// redux hook
import { useSelector } from "react-redux";
// material ui
import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router-dom";

function NavigationTabsTherePage() {
  const history = useHistory();

  const lstCumRap = useSelector((state) => {
    return state.TabNavigationPageReducer.lstCumRap; // get lstCumRap to  TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const codeGroupCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeGroupCinema;
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeCinema; // get codeCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const nameGroupCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.nameGroupCinema; // get nameGroupCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });

  //Return Time-end with Time-start
  const getTimeEnd = (timeStart) => {
    let dateFormat = new Date();
    dateFormat.setHours(timeStart.slice(0, 2), timeStart.slice(3), 0);
    dateFormat.setHours(dateFormat.getHours() + 2);
    let timeEnd = dateFormat.toLocaleTimeString("en-GB").slice(0, 5);
    return timeEnd;
  };
  // get maPhim
  const [stateMaphim, setStateMaPhim] = useState({
    maPhim: "",
  });
  const handleMaPhim = (maPhim) => {
    setStateMaPhim({
      maPhim: maPhim,
    });
  };

  // booking
  const bookingMovie = (maLichChieu, ngayChieuGioChieu) => {
    if (maLichChieu && stateMaphim.maPhim && nameGroupCinema) {
      history.push(
        `/bookingComponent/${maLichChieu}-${stateMaphim.maPhim}-${nameGroupCinema}-${ngayChieuGioChieu}`
      );
    }
    const toKen = JSON.parse(localStorage.getItem("token"));
    if (maLichChieu && stateMaphim.maPhim && nameGroupCinema && !toKen) {
      history.push("/signIn");
    }
  };

  const renderTenPhim = () => {
    const index = lstCumRap.findIndex(
      (item) => item.maCumRap === codeGroupCinema
    );
    if (index !== -1) {
      return lstCumRap[index].danhSachPhim.map((item, index) => {
        let httpS = item.hinhAnh.split(":");
        let urlImg = httpS[0] + "s:" + httpS[1];
        return (
          <Grid
            item
            xs={12}
            key={index}
            className="rowThereNavigationTab_Child"
            onClick={() => {
              handleMaPhim(item.maPhim);
            }}
          >
            <div className="rowThereNavigation_ChildTab_Intro">
              <Grid container>
                <Grid item xs={2}>
                  <div className="ChildTab_Intro_Img">
                    <img src={urlImg} alt={urlImg} />
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="ChildTab_Intro">
                        <label className={`maRap_${codeCinema}`}>
                          {item.maPhim}
                        </label>
                        <span>Tên Phim : {item.tenPhim.slice(0, 30)}</span>
                        <p>Chọn Xuất Chiếu</p>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="ChildTab_Timer">
                        <Grid container>
                          {item.lstLichChieuTheoPhim.map((item, index) => {
                            return (
                              <Grid item lg={4} key={index}>
                                <span
                                  onClick={() =>
                                    bookingMovie(
                                      item.maLichChieu,
                                      item.ngayChieuGioChieu
                                    )
                                  }
                                  key={index}
                                  className={`timeCode ${codeCinema}`}
                                >
                                  {item.ngayChieuGioChieu.slice(11, 16)}
                                  <label
                                    style={{
                                      color: "gray",
                                      marginLeft: "5px",
                                    }}
                                  >{`~ ${getTimeEnd(
                                    item.ngayChieuGioChieu.slice(11, 16)
                                  )}`}</label>
                                </span>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </div>
                    </AccordionDetails>
                  </Accordion>
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
