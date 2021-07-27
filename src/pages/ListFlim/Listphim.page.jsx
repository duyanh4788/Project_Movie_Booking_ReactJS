import React, { memo, useEffect, useRef, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// reducer dispatch
import { getMovieList_Action } from "../../store/actions/movie.action";
// react-router
import { useHistory } from "react-router";
// material
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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loader from "../../components/Loader/Loader";

/**
 *  8-05-02021 Vũ Duy Anh
 * Carousel List => not Done
 *  pages/ListPhim access to Movie-detail/Movie-detail.page
 */

const ListPhim = () => {
  const ref = useRef({});
  const hisTory = useHistory();
  const dispatch = useDispatch();
  // show loading
  const loading = useSelector((state) => state.CommonReducer.loading);
  // get data reducer
  const movieList = useSelector((state) => {
    return state.movieReducer?.movieList || {};
  });
  // maNhom
  const [maNhom, setMaNhom] = React.useState("GP01");
  // call api
  useEffect(() => {
    dispatch(getMovieList_Action(maNhom));
  }, [dispatch, maNhom]);

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

  const renderListPhim = () => {
    return movieList?.map((item, index) => {
      let setLink = item.hinhAnh.split(":");
      let urlImg = setLink[0] + "s:" + setLink[1];
      return (
        <div key={index} className="slide">
          <div className="sliderAfter">
            <img className="imageSlider" src={urlImg} alt={item.hinhAnh} />
            <div className="intro">
              <span className="introOne">{item.maPhim}</span>
              <span className="introTwo"> {item.tenPhim.slice(0, 18)} </span>
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
  const renderMaNhom = () => {
    let arrMaNhom = [
      "GP01",
      "GP02 ",
      "GP03",
      "GP04 ",
      "GP05",
      "GP06 ",
      "GP07",
      "GP08 ",
      "GP09",
      "GP10 ",
    ];
    return arrMaNhom.map((item, index) => {
      return (
        <MenuItem key={index} value={item}>
          Nhóm : {item}
        </MenuItem>
      );
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="sliderListPhim">
      <Grid container>
        <Grid item lg={12} style={{ textAlign: "center" }}>
          <FormControl className="maNhom">
            <Select
              value={maNhom}
              onChange={(e) => {
                setMaNhom(e.target.value);
              }}
            >
              {renderMaNhom()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Slider ref={ref} {...settings}>
        {renderListPhim()}
      </Slider>
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
