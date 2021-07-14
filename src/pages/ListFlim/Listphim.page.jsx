import React, { memo, useEffect, useRef, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// reducer dispatch
import { getMovieList_Action } from "../../store/actions/movie.action";
// react-router
import { useHistory } from "react-router";
// material
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CardMedia from "@material-ui/core/CardMedia";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button, Grid } from "@material-ui/core";
//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// css
import "./css/listPhim.css";
// modal
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SimpleAccordion from "../SimpleAccordion/SimpleAccordion";

/**
 *  8-05-02021 Vũ Duy Anh
 * Carousel List => not Done
 *  pages/ListPhim access to Movie-detail/Movie-detail.page
 */

const ListPhim = () => {
  const ref = useRef({});
  const hisTory = useHistory();
  const dispatch = useDispatch();
  // get data reducer
  const movieList = useSelector((state) => {
    return state.movieReducer.movieList;
  });
  // maNhom
  const [maNhom, setMaNhom] = React.useState("GP01");
  const handleChange = (event) => {
    setMaNhom(event.target.value);
  };
  // call api
  useEffect(() => {
    dispatch(getMovieList_Action(maNhom));
  }, [dispatch, maNhom]);

  // carousel next
  const next = () => {
    ref.current.slickNext();
  };
  // carousel previous
  const previous = () => {
    ref.current.slickPrev();
  };
  // setting carousel
  const settings = {
    // dots: false,
    // arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

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

  // arrow function render to row.113
  const renderListPhim = () => {
    return movieList.map((item, index) => {
      return (
        <div key={index} className="slide">
          <div className="sliderAfter">
            <CardMedia
              className="imageSlider"
              image={item.hinhAnh}
              title={item.hinhAnh}
            />
            <div className="intro">
              <span className="introOne"> P </span>
              <span className="introTwo"> {item.tenPhim} </span>
              <p className="introThere">100 phút</p>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="buttonslide"
              onClick={() => {
                hisTory.push(`/phimDetail/${item.maPhim}`); // transmission to Movie-detail/Movie-detail.compnent
              }}
            >
              Mua Vé
            </Button>
          </div>
          <label className="modalPlay">
            <PlayArrowIcon
              className="iconPlay"
              onClick={() => handleOpen(item.trailer)}
            />
          </label>
        </div>
      );
    });
  };

  return (
    <section className="sliderListPhim">
      <Grid container>
        <Grid item lg={2}></Grid>
        <Grid item lg={2}>
          <FormControl className="maNhom">
            <InputLabel>Mã Nhóm</InputLabel>
            <Select value={maNhom} onChange={handleChange}>
              <MenuItem value="GP01">GP01</MenuItem>
              <MenuItem value="GP02">GP02</MenuItem>
              <MenuItem value="GP03">GP03</MenuItem>
              <MenuItem value="GP04">GP04</MenuItem>
              <MenuItem value="GP05">GP05</MenuItem>
              <MenuItem value="GP06">GP06</MenuItem>
              <MenuItem value="GP07">GP07</MenuItem>
              <MenuItem value="GP08">GP08</MenuItem>
              <MenuItem value="GP09">GP09</MenuItem>
              <MenuItem value="GP10">GP010</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={8}>
          <SimpleAccordion />
        </Grid>
      </Grid>

      <Slider ref={ref} {...settings}>
        {renderListPhim()}
      </Slider>
      <ArrowBackIosIcon className="left-arrow" onClick={previous} />
      <ArrowForwardIosIcon className="right-arrow" onClick={next} />
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 1, autoplay: 1 }}
        isOpen={isOpen}
        videoId={stateTrailer.trailers}
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default memo(ListPhim);
