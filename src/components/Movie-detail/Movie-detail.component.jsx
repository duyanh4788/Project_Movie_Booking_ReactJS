import React, { useEffect, useState } from "react";
import "./scss/movieDetail.css";
import Loader from "../Loader/Loader";
import DetailTabComponent from "./DetailTab.component";
// router
import { withRouter } from "react-router";
// material ui
import { Grid } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// redux
import { useDispatch, useSelector } from "react-redux";
// reduer action
import { getMovieDetail_Action } from "../../store/actions/detail.actions";
// action axios
import { getLogoDetailTabAction } from "../../store/actions/detailTabComponent.action";
// progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// modal
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
// date format
import format from "date-format";

function MovieDetail(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  const codeMaPhim = props.match.params.maPhim; // recive data to listFlim/Listphim.page
  
  const detail = useSelector((state) => {
    return state.detaiMovielReducer.detail || {};
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

  return (
    <>
      {loading === null ? (
        <Loader />
      ) : (
        <div className="movieDetail">
          <div className="movieDetail_bg">
            <img src={detail.hinhAnh} alt="" />
          </div>

          <div className="movieDetail_Intro">
            <Grid container>
              <Grid item xs={8} sm={3} md={3} lg={2} className="images">
                <img src={detail.hinhAnh} alt="" />
                <PlayArrowIcon
                  className="iconPlay"
                  onClick={() => handleOpen(detail.trailer)}
                />
              </Grid>
              <Grid item xs={8} sm={3} md={3} lg={2} className="intro">
                <label>
                  Ngày Chiếu :{" "}
                  {format("mm-dd-yyyy", new Date(detail.ngayKhoiChieu))}
                </label>
                <p>
                  <span>{detail.maPhim}</span> Phim : {detail.tenPhim}
                </p>
              </Grid>
              <Grid item xs={8} sm={3} md={3} lg={2} className="rating">
                <CircularProgressbar
                  background={true}
                  value={detail.danhGia}
                  text={detail.danhGia}
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
                <span>{detail.danhGia} Người Đánh Giá</span>
              </Grid>
            </Grid>
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
