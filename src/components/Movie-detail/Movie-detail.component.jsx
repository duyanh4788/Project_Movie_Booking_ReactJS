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
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
// date format
import * as dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

function MovieDetail(props) {

  const dispatch = useDispatch();
  const classes = useStyles();

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
    let httpTrailer = "https://www.youtube.com/embed/";
    let autoPlay = "?autoplay=1"
    let subtitleOne = subtitle.split("/");
    let subtitleTwo = subtitle.split("=");
    if (subtitleOne.length === 4) {
      stateTrailer.trailers = httpTrailer + subtitleOne[3] + autoPlay;
    } else if (subtitleOne.length === 5) {
      stateTrailer.trailers = httpTrailer + subtitleOne[4] + autoPlay;
    }
    if (subtitleTwo.length === 2) {
      stateTrailer.trailers = httpTrailer + subtitleTwo[1] + autoPlay;
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
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isOpen}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={isOpen}>
              <iframe src={stateTrailer.trailers} title="YouTube video player" width="640" height="450" allow="accelerometer; autoplay" style={{ border: "none" }}></iframe>
            </Fade>
          </Modal>
          <DetailTabComponent />
        </div>
      )}
    </>
  );
}

export default withRouter(MovieDetail);
