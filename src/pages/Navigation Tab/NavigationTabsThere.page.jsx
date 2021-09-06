import React, { useState } from "react";
// redux hook
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// material ui
import { AppBar, Grid, Paper, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { getMovieSchedulePage, schedulerMovieAction } from "../../store/actions/tabNavigationPage.action";
// date format
import * as dayjs from "dayjs";

// function tabpanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// function tabpanel scoll
function a11yPropsScroll(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
// function tabpanel

function NavigationTabsTherePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  // tabpanel date
  const [values, setValues] = React.useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  // tabpanel date

  const lstCumRap = useSelector((state) => {
    return state.TabNavigationPageReducer.lstCumRap; // get lstCumRap to  TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const lichChieuPhim = useSelector((state) => {
    return state.TabNavigationPageReducer.lichChieuPhim; // get lstCumRap to  TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const codeGroupCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeGroupCinema;
  });
  const codeCinema = useSelector((state) => {
    return state.TabNavigationPageReducer.codeCinema; // get codeCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });
  const schedulerMovie = useSelector((state) => {
    return state.TabNavigationPageReducer.schedulerMovie; // get nameGroupCinema form NavigationTabsOne.page => TabNavigationPageReducer => type : GET_CODE_CINEMA_PAGE
  });

  // get maPhim
  const [stateMaphim, setStateMaPhim] = useState({
    maPhim: "",
  });
  // const [statemaLichChieu, setStatemaLichChieu] = useState({
  //   maLichChieu: "",
  // });
  const handleMaPhim = (maPhim, lstLichChieuTheoPhim) => {
    setStateMaPhim({
      maPhim: maPhim,
    });
    dispatch(getMovieSchedulePage(lstLichChieuTheoPhim));
    dispatch(schedulerMovieAction(undefined))
    setValues(0);
  };
  const handleDateTime = (schedule) => {
    dispatch(schedulerMovieAction(schedule))
  }
  // booking
  const bookingMovie = (maLichChieu) => {
    if (maLichChieu && stateMaphim.maPhim) {
      history.push(
        `/bookingComponent/${maLichChieu}-${stateMaphim.maPhim}`
      );
    }
    const toKen = JSON.parse(localStorage.getItem("token"));
    if (!toKen) {
      history.push("/signIn");
    }
  };
  // render date
  const renderDateTime = () => {
    return lichChieuPhim.map((item, index) => {
      return (
        <Tab
          onClick={() => {
            handleDateTime(item);
          }}
          label={dayjs(item.ngayChieuGioChieu).format("DD-MM-YYYY")}
          {...a11yPropsScroll(index)}
          key={index}
        />
      );
    });
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
            container
            className="ChildTab"
            key={index}
            onClick={() => {
              handleMaPhim(item.maPhim, item.lstLichChieuTheoPhim);
            }}
          >
            <Grid item xs={2} className={stateMaphim.maPhim === item.maPhim ? "ChildTab_Img_Active" : "ChildTab_Img"}>
              <img src={urlImg} alt={urlImg} />
            </Grid>
            <Grid
              item
              xs={5}
              className={stateMaphim.maPhim === item.maPhim ? "ChildTab_Intro_Active" : "ChildTab_Intro"}>
              <label className={codeCinema}>{item.maPhim}</label>
              <span>Tên Phim : {item.tenPhim.slice(0, 30)}</span>
            </Grid>
            {item.maPhim === stateMaphim.maPhim && schedulerMovie ?
              <Grid item xs={5} className="ChildTab_Timer">
                <div className="dateTimer">
                  <p>Mã Rạp : {schedulerMovie.maRap}</p>
                  <p>Mã Lc : {schedulerMovie.maLichChieu}</p>
                  <p>Giá Vé : {schedulerMovie.giaVe?.toLocaleString()}</p>
                  <p>
                    Đặt Vé :{" "}
                    <span
                      onClick={() =>
                        bookingMovie(
                          schedulerMovie.maLichChieu,
                          schedulerMovie.ngayChieuGioChieu
                        )
                      }
                      className={`timeCode ${codeCinema}`}
                    >
                      {schedulerMovie.ngayChieuGioChieu?.slice(11, 16)}
                      <span
                        style={{
                          color: "gray",
                          marginLeft: "5px",
                        }}
                      >{`~ ${getTimeEnd(
                        schedulerMovie.ngayChieuGioChieu?.slice(11, 16)
                      )}`}</span>
                    </span>
                  </p>
                </div>
              </Grid> :
              <Grid item xs={5} className="ChildTab_Timer">
                <p>Chọn Phim</p>
              </Grid>}
          </Grid>
        );
      });
    } else {
      return (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <p>Vui Lòng Chọn Rạp</p>
        </Grid>
      )
    }
  };
  //Return Time-end with Time-start
  const getTimeEnd = (timeStart) => {
    if (timeStart) {
      let dateFormat = new Date();
      dateFormat.setHours(timeStart.slice(0, 2), timeStart.slice(3), 0);
      dateFormat.setHours(dateFormat.getHours() + 2);
      let timeEnd = dateFormat.toLocaleTimeString("en-GB").slice(0, 5);
      return timeEnd;
    }
  };

  return (
    <Grid container item xs={6} className="rowThereNavigationTab">
      <Grid item xs={12} lg={12}>
        <AppBar position="static" color="default">
          <Paper className="paperBar">
            <Tabs
              value={values}
              onChange={handleChanges}
              variant="scrollable"
              scrollButtons="auto"
            >
              {renderDateTime()}
            </Tabs>
          </Paper>
        </AppBar>
        {lichChieuPhim.length > 0 ? <h5 className="titleDate">Chọn Ngày Chiếu</h5> : lstCumRap.findIndex((item) => item.maCumRap === codeGroupCinema) !== -1 ? <h5 className="titleDate">Vui Lòng Chọn Phim</h5> : ""}
      </Grid>
      <Grid item xs={12} lg={12} className="rowThereNavigation_ChildTab">
        {renderTenPhim()}
      </Grid>
    </Grid>
  );
}

export default NavigationTabsTherePage;
