import React, { useEffect, useState } from "react";
import "./scss/movieDetail.css";
import Loader from "../Loader/Loader";
import DetailTabComponent from "./DetailTab.component";
// router
import { withRouter } from "react-router";
// material ui
import { Container, Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// redux
import { useDispatch, useSelector } from "react-redux";
// reduer action
// action axios
import {
  getLogoDetailTabAction,
  getMovieDetail_Action,
} from "../../store/actions/detailTabComponent.action";
// progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// modal
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
// date format
import * as dayjs from "dayjs";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const codeMaPhim = props.match.params.maPhim; // recive data to listFlim/Listphim.page
  const detailMovie = useSelector((state) => {
    return state.DetailTabReducer?.detailMovie || {};
  });

  useEffect(() => {
    dispatch(getMovieDetail_Action(codeMaPhim)).then((e) => setLoading(e)); // post data (codeMaPhim === id) to Axios detail.action & return object to detaiMovielReducer
  }, [dispatch, codeMaPhim]);

  useEffect(() => {
    dispatch(getLogoDetailTabAction()); // get data to Axios tabNavigation.action for component NavigationTabsOne
  }, [dispatch]);

  // modal
  // popup video youtube
  const [isOpen, setOpen] = useState(false);
  const [stateTrailer] = useState({
    trailers: "",
  });
  const handleOpen = (subtitle) => {
    subtitle = subtitle.split("/");
    if (subtitle.length === 5) {
      stateTrailer.trailers = subtitle[4];
    } else if (subtitle.length === 4) {
      stateTrailer.trailers = subtitle[3];
    }
    setOpen(true);
  };
  // popup video youtube

  // https images
  const getUrlHttpS = () => {
    let httpS = detailMovie?.hinhAnh.split(":");
    let urlImg = httpS[0] + "s:" + httpS[1];
    return <img src={urlImg} alt={urlImg} />;
  };
  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <div className="movieDetail">
          <div className="movieIntro">
            <div className="movieDetail_bg">{getUrlHttpS()}</div>

            <Container className="movieDetail_Intro" maxWidth="md">
              <Grid container>
                <Grid item xs={12} sm={4} md={4} lg={4} className="images">
                  {getUrlHttpS()}
                  <label className="modalPlay">
                    <PlayArrowIcon
                      className="iconPlay"
                      onClick={() => handleOpen(detailMovie.trailer)}
                    />
                  </label>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} className="intro">
                  <label>
                    Ngày Chiếu :{" "}
                    {dayjs(detailMovie.ngayChieuGioChieu).format("DD-MM-YYYY")}
                  </label>
                  <p>
                    <span>{detailMovie.maPhim}</span> Phim :{" "}
                    {detailMovie.tenPhim}
                  </p>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} className="rating">
                  <CircularProgressbar
                    background={true}
                    value={detailMovie.danhGia}
                    text={detailMovie.danhGia}
                    maxValue={10}
                    strokeWidth={6}
                    styles={buildStyles({
                      strokeLinecap: "butt",
                      textColor: "white",
                      pathColor: "#7ed321",
                      trailColor: "#3a3a3a",
                      textSize: "40px",
                      backgroundColor: "rgba(0,0,0,.4)",
                    })}
                  />
                  <p>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </p>
                  <span>{detailMovie.danhGia} Người Đánh Giá</span>
                </Grid>
              </Grid>
            </Container>
          </div>
          <ModalVideo
            channel="youtube"
            youtube={{ mute: 1, autoplay: 1 }}
            isOpen={isOpen}
            videoId={stateTrailer.trailers}
            onClose={() => setOpen(false)}
          />
          <DetailTabComponent />
        </div>
      )}
    </>
  );
}

export default withRouter(MovieDetail);
