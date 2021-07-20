import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./scss/cinemaDetailComponent.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@material-ui/core";
import {
  getDetailCinema,
  getInfoPhimCinema,
  getListPhimCinema,
} from "../../store/actions/cinemaDetail.action";
import { listCinema, backgroundS } from "./dataCinema";
import { useState } from "react";
// date format
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function CinemaDetailComponent(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const codeMaCumRap = props.match.params.maCumRap; // recive data to CinemaDetailPage

  useEffect(() => {
    dispatch(getDetailCinema(codeMaCumRap));
  }, [codeMaCumRap, dispatch]);

  const groupCinema = useSelector((state) => {
    return state.CinemaDetailReducer.groupCinema;
  });

  const listPhimCinema = useSelector((state) => {
    return state.CinemaDetailReducer.listPhimCinema;
  });

  const infoPhimCinema = useSelector((state) => {
    return state.CinemaDetailReducer?.infoPhim;
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
    setStateMaCumRap({
      maCumRap: maCumRap,
    });
    setStateTenCumRap({
      tenCumRap: tenCumRap,
    });
    dispatch(getListPhimCinema(arrayListPhim.danhSachPhim));
  };

  const handleInfoPhim = (infoPhim) => {
    dispatch(getInfoPhimCinema(infoPhim));
    setStateMaPhim({
      maPhim: infoPhim.maPhim,
    });
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
        `/bookingComponent/${maLichChieu}-${stateMaPhim.maPhim}-${stateTenCumRap.tenCumRap}`
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

  const renderListPhim = () => {
    return listPhimCinema.map((item, index) => {
      return (
        <Grid container key={index} className="shedulePhim">
          <Grid item xs={3} sm={3} md={3} lg={2} style={{ cursor: "pointer" }}>
            <img
              src={item.hinhAnh}
              alt={item.hinhAnh}
              className="imgPhim"
              onClick={() => {
                handleInfoPhim(item);
              }}
            />
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={10}>
            <Accordion
              onClick={() => {
                handleInfoPhim(item);
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="phim">
                  <label className="maPhim">{item.maPhim}</label>
                  <span>Tên Phim : {item.tenPhim.slice(0, 30)}</span>
                  <p style={{ marginTop: "20px" }}>Chọn Xuất Chiếu</p>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="tabTimer">
                  <Grid container>
                    {item.lstLichChieuTheoPhim.map((item, index) => {
                      return (
                        <Grid item lg={3} key={index}>
                          <span
                            onClick={() => bookingMovie(item.maLichChieu)}
                            key={index}
                            className={`timer ${codeMaCumRap}`}
                          >
                            {item.ngayChieuGioChieu.slice(11, 16)}
                            <label
                              style={{ color: "gray", marginLeft: "5px" }}
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
      );
    });
  };

  return (
    <section className="cinemaDetail">
      {/* image phim */}
      {infoPhimCinema == null ? (
        <div className="rowOneinfoPhim">
          <div className="backgroundPhim">
            <img src={backgroundS.img} alt="" />
          </div>
        </div>
      ) : (
        <div className="rowOneinfoPhim">
          <div className="backgroundPhim">
            <img src={infoPhimCinema.hinhAnh} alt="" />
          </div>

          <div className="rowOneintroPhim">
            <Grid container>
              <Grid item xs={8} sm={3} md={3} lg={2}>
                <img src={infoPhimCinema.hinhAnh} alt="" />
              </Grid>
              <Grid item xs={8} sm={3} md={3} lg={2}>
                <p>
                  <span>{infoPhimCinema.maPhim}</span> Phim :{" "}
                  {infoPhimCinema.tenPhim}
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {/* image phim */}

      <Container maxWidth="lg">
        <Grid container className="infoPhimCinemaDetail">
          <Grid container item xs={12} sm={12} md={4} lg={4}>
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
          <Grid item xs={12} sm={12} md={8} lg={8} className="rowInfoPhim">
            {renderListPhim()}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default CinemaDetailComponent;
