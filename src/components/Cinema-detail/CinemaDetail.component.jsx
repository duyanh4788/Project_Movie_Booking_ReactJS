import React from "react";
import "./scss/cinemaDetailComponent.css";
// date format
import * as dayjs from "dayjs";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  getDetailCinema,
  getInfoPhimCinema,
  getListPhimCinema,
} from "../../store/actions/cinemaDetail.action";
import { listCinema, backgroundS } from "./dataCinema";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const CinemaDetailComponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // tabpanel date
  const [values, setValues] = React.useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  // tabpanel date

  const codeMaCumRap = props.match.params.maCumRap; // recive data to CinemaDetailPage
  // set date
  const [stateDate, setDate] = useState("");

  useEffect(() => {
    dispatch(getDetailCinema(codeMaCumRap));
    dispatch(getInfoPhimCinema(null));
    dispatch(getListPhimCinema([]));
  }, [codeMaCumRap, dispatch]);

  const groupCinema = useSelector((state) => {
    return state.CinemaDetailReducer.groupCinema;
  });

  const listPhimCinema = useSelector((state) => {
    return state.CinemaDetailReducer.listPhimCinema;
  });

  const infoPhimCinema = useSelector((state) => {
    return state.CinemaDetailReducer?.infoCinema;
  });

  const renderImageCinema = () => {
    const items = listCinema.find((item) => item.name === codeMaCumRap);
    return <img src={items.img} alt={items.img} className="imageCinema" />;
  };

  const renderGroupCinema = () => {
    const index = groupCinema.findIndex(
      (itemF) => itemF.maHeThongRap === codeMaCumRap
    );
    if (index !== -1) {
      return groupCinema[index].lstCumRap.map((item, index) => {
        return (
          <Grid
            container
            item
            key={index}
            className={
              item.maCumRap === stateMaCumRap.maCumRap
                ? "addresCinema_Active"
                : "addresCinema"
            }
            onClick={() => {
              handleMaCumRap(item.maCumRap, item.tenCumRap, item);
            }}
          >
            <Grid item xs={3} sm={3}>
              {renderImageCinema()}
            </Grid>
            <Grid item xs={9} sm={9}>
              <p className={`${codeMaCumRap}`} style={{ marginBottom: "0" }}>
                {item.tenCumRap}
              </p>
              <p>{item.diaChi}</p>
            </Grid>
          </Grid>
        );
      });
    }
  };
  // link booking componet
  const [stateMaCumRap, setStateMaCumRap] = useState({
    maCumRap: "",
  });
  // link booking componet
  const [stateTenCumRap, setStateTenCumRap] = useState({
    tenCumRap: "",
  });
  // call api
  const [stateMaPhim, setStateMaPhim] = useState({
    maPhim: "",
  });
  const handleMaCumRap = (maCumRap, tenCumRap, arrayListPhim) => {
    setDate("");
    setStateMaCumRap({
      maCumRap: maCumRap,
    });
    setStateTenCumRap({
      tenCumRap: tenCumRap,
    });
    dispatch(getListPhimCinema(arrayListPhim.danhSachPhim));
    dispatch(getInfoPhimCinema(null));
  };
  const handleInfoPhim = (infoPhim) => {
    dispatch(getInfoPhimCinema(infoPhim));
    setStateMaPhim({
      maPhim: infoPhim.maPhim,
    });
    setValues(0);
  };

  //Return Time-end with Time-start
  const getTimeEnd = (timeStart) => {
    let dateFormat = new Date();
    dateFormat.setHours(timeStart.slice(0, 2), timeStart.slice(3), 0);
    dateFormat.setHours(dateFormat.getHours() + 2);
    let timeEnd = dateFormat.toLocaleTimeString("en-GB").slice(0, 5);
    return timeEnd;
  };
  // booking
  const bookingMovie = (maLichChieu) => {
    if (maLichChieu && stateMaPhim.maPhim && stateTenCumRap.tenCumRap) {
      history.push(
        `/bookingComponent/${maLichChieu}-${stateMaPhim.maPhim}-${stateTenCumRap.tenCumRap}-${stateDate}`
      );
    }
    const toKen = JSON.parse(localStorage.getItem("token"));
    if (
      maLichChieu &&
      stateMaPhim.maPhim &&
      stateTenCumRap.tenCumRap &&
      !toKen
    ) {
      history.push("/signIn");
    }
  };
  // render date
  const renderDateTime = () => {
    return infoPhimCinema?.lstLichChieuTheoPhim.map((item, index) => {
      return (
        <Tab
          onClick={() => {
            setDate(item.ngayChieuGioChieu);
          }}
          label={dayjs(item.ngayChieuGioChieu).format("DD-MM-YYYY")}
          {...a11yPropsScroll(index)}
          key={index}
        />
      );
    });
  };
  // render list phim
  const renderListPhim = () => {
    return listPhimCinema.map((item, index) => {
      let httpS = item.hinhAnh.split(":");
      let urlImg = httpS[0] + "s:" + httpS[1];
      return (
        <Grid container key={index} className="shedulePhim">
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            className="imfoPhim"
            onClick={() => {
              handleInfoPhim(item);
            }}
          >
            <img src={urlImg} alt={urlImg} />
            <span>
              <label className="maPhim">{item.maPhim} </label> -
              {item.tenPhim.slice(0, 30)}
            </span>
          </Grid>

          <Grid item xs={12} sm={5} md={5} lg={5}>
            {item.lstLichChieuTheoPhim
              .filter((itemF) => itemF.ngayChieuGioChieu === stateDate)
              .map((item, index) => {
                return (
                  <div className="tabTimer" key={index}>
                    <p>Mã Rạp : {item.maRap}</p>
                    <p>Mã Lịch Chiếu : {item.maLichChieu}</p>
                    <p>Giá Vé : {item.giaVe.toLocaleString()}</p>
                    <p>
                      Đặt Vé :{" "}
                      <span
                        onClick={() => bookingMovie(item.maLichChieu)}
                        className={`timer ${codeMaCumRap}`}
                      >
                        {item.ngayChieuGioChieu.slice(11, 16)}
                        <label
                          style={{ color: "gray", marginLeft: "5px" }}
                        >{`~ ${getTimeEnd(
                          item.ngayChieuGioChieu.slice(11, 16)
                        )}`}</label>
                      </span>
                    </p>
                  </div>
                );
              })}
          </Grid>
        </Grid>
      );
    });
  };

  // https images
  const getUrlHttpS = () => {
    let httpS = infoPhimCinema.hinhAnh.split(":");
    let urlImg = httpS[0] + "s:" + httpS[1];
    return <img src={urlImg} alt={urlImg} />;
  };

  return (
    <>
      {/* image phim */}
      {infoPhimCinema == null ? (
        <div className="rowOneinfoPhim">
          <div className="backgroundPhim">
            <img src={backgroundS.img} alt="" />
          </div>
        </div>
      ) : (
        <div className="rowOneinfoPhim">
          <div className="backgroundPhim">{getUrlHttpS()}</div>

          <Container className="rowOneintroPhim" maxWidth="sm">
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {getUrlHttpS()}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <p>
                  <span>{infoPhimCinema.maPhim}</span> Phim :{" "}
                  {infoPhimCinema.tenPhim}
                </p>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}

      <div className="cinemaDetail">
        <Container maxWidth="lg">
          <Grid container className="infoPhimCinemaDetail">
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Accordion className="rowCinemaDetail">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <p className="titleLogo">Chọn Cụm Rạp : {codeMaCumRap}</p>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container item lg={12}>
                    {renderGroupCinema()}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              className="rowMovieCinemaDetail"
            >
              <Grid item xs={12} lg={12}>
                <AppBar position="static" color="default" className="rowDate">
                  <Paper>
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
                <h5 className="titleDate">Chọn Giờ Chiếu</h5>
              </Grid>
              <Grid container className="rowInfoPhim">
                {renderListPhim()}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default CinemaDetailComponent;
