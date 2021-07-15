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
import format from "date-format";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function CinemaDetailComponent(props) {
  const dispatch = useDispatch();

  const codeMaCumRap = props.match.params.maCumRap; // recive data to CinemaDetailPage

  const hisTory = useHistory();

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
              handleMaCumRap(item.maCumRap, item);
            }}
          >
            <Grid item xs={4} sm={3}>
              {renderImageCinema()}
            </Grid>
            <Grid item xs={8} sm={9}>
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

  const [stateMaCumRap, setStateMaCumRap] = useState({
    maCumRap: "",
  });
  const handleMaCumRap = (maCumRap, arrayListPhim) => {
    setStateMaCumRap({
      maCumRap: maCumRap,
    });
    dispatch(getListPhimCinema(arrayListPhim.danhSachPhim));
  };

  const handleInfoPhim = (infoPhim) => {
    dispatch(getInfoPhimCinema(infoPhim));
  };

  const renderListPhim = () => {
    return listPhimCinema.map((item, index) => {
      return (
        <Grid container key={index} className="addresPhim">
          <Grid
            item
            xs={3}
            sm={4}
            md={3}
            lg={2}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleInfoPhim(item);
            }}
          >
            <img src={item.hinhAnh} alt={item.hinhAnh} className="imgPhim" />
          </Grid>
          <Grid container item xs={9} sm={8} md={9} lg={10}>
            <Grid item xs={12} lg={12}>
              <p style={{ marginBottom: "0" }}>
                <span className="maPhim">{item.maPhim}</span>
                {item.tenPhim}
              </p>
              <p style={{ marginBottom: "0", textAlign: "center" }}>
                Chọn Xuất Chiếu
              </p>
            </Grid>
            <Grid item xs={12} lg={12} className="tabTimer">
              {item.lstLichChieuTheoPhim.map((item, index) => {
                return (
                  <span
                    key={index}
                    className={`timer ${codeMaCumRap}`}
                    onClick={() => {
                      hisTory.push(`/bookingComponent/${item.maLichChieu}`); // transmission to Movie-detail/Movie-detail.compnent
                    }}
                  >
                    {format("hh:mm", new Date(item.ngayChieuGioChieu))}
                  </span>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      );
    });
  };
  console.log(infoPhimCinema);
  return (
    <section className="cinemaDetail">
      {/* image phim */}
      {infoPhimCinema == null ? (
        <div className="infoPhim">
          <div className="background">
            <img src={backgroundS.img} alt="" />
          </div>
        </div>
      ) : (
        <div className="infoPhim">
          <div className="background">
            <img src={infoPhimCinema.hinhAnh} alt="" />
          </div>

          <div className="intro">
            <Grid container>
              <Grid item xs={8} sm={3} md={3} lg={2} className="images">
                <img src={infoPhimCinema.hinhAnh} alt="" />
              </Grid>
              <Grid item xs={8} sm={3} md={3} lg={2} className="images">
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

      <Container maxWidth="lg" >
        <Grid container className="infoCinema">
          <Grid container item xs={12} sm={6} md={4} lg={4}>
            <Accordion className="rowOne">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <p>Chọn Rạp</p>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container item lg={12}>
                  {renderGroupCinema()}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8} className="rowTwo">
            {renderListPhim()}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default CinemaDetailComponent;
