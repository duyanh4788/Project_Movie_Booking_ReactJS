import React, { memo, useEffect, useRef, useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// reducer dispatch
import { getMovieList_Action } from "../../store/actions/movie.action";
// react-router
import { useHistory } from "react-router";
// material
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button, Container, Fab, Grid, Menu, MenuItem } from "@material-ui/core";
//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// css
import "./css/listPhim.css";
// modal
import Loader from "../../components/Loader/Loader";
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

/**
 *  8-05-02021 Vũ Duy Anh
 * Carousel List => not Done
 *  pages/ListPhim access to Movie-detail/Movie-detail.page
 */
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));


const ListPhim = () => {
  const ref = useRef({});
  const hisTory = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  // menu 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMaNhom = (maNhom) => {
    setMaNhom(maNhom)
    setAnchorEl(null);
  };
  // menu

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

    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          rows: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          arrows: false,
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
  const handleClose = () => {
    setOpen(false);
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
        <Fab className="maNhom" size="small" color="secondary" key={index} onClick={() => getListGroup(item)}>
          {item}
        </Fab>
      );
    });
  };

  const renderMaNhomMenu = () => {
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
        <MenuItem onClick={() => { handleMaNhom(item) }} key={index}>
          <Fab className="groupMenu" size="small" color="secondary">
            {item}
          </Fab>
        </MenuItem>
      );
    });
  };

  const getListGroup = (maNhom) => {
    setMaNhom(maNhom)
  }

  return loading ? (
    <Loader />
  ) : (
    <Container maxWidth="md" className="sliderListPhim" id="lichChieu">
      <Grid container>
        <Grid item xs={12} lg={12} style={{ textAlign: "center", marginTop: "30px", marginBottom: "20px" }}>
          {renderMaNhom()}
          <Fab className="mainMenuGroup" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <AddIcon />
          </Fab>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMaNhom}
          >
            {renderMaNhomMenu()}
          </Menu>
        </Grid>
      </Grid>

      <Slider ref={ref} {...settings}>
        {renderListPhim()}
      </Slider>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
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
    </Container>
  );
};

export default memo(ListPhim);
