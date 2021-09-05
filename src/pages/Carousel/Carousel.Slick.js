/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
// data carousel
import { images } from "./CarouselData";
// material
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Slider from "react-slick";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// css
import "./css/Carouselpage.css";
// modal

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const CarouselSlick = () => {
  // carousel
  const ref = useRef({});
  const classes = useStyles();
  const next = () => {
    ref.current.slickNext();
  };
  const previous = () => {
    ref.current.slickPrev();
  };
  const settings = {
    dots: true,
    autoplay: false,
    arrows: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          dots: false,
        }
      },
    ]
  };

  // modal
  const [isOpen, setOpen] = React.useState(false);
  let [stateTrailer] = useState({ trailers: "" });
  const handleOpen = (subtitle) => {
    let httpTrailer = "https://www.youtube.com/embed/";
    let autoPlay = "?autoplay=1"
    stateTrailer.trailers = httpTrailer + subtitle + autoPlay;
    setOpen(true);
  };

  // render
  const renderImageCarousel = () => {
    return images.map((item, index) => {
      return (
        <div className="carouSelSlider" key={index}>
          <img src={item.img} alt="" className="imageSlider" />
          <label className="modalPlay">
            <PlayArrowIcon className="iconPlay" onClick={() => handleOpen(item.subtitle)} />
          </label>
          <ArrowBackIosIcon className='left-arrow' onClick={previous} />
          <ArrowForwardIosIcon className='right-arrow' onClick={next} />
        </div>
      )
    })
  }
  return (
    <section className="slider">
      <Slider ref={ref} {...settings} >
        {renderImageCarousel()}
      </Slider>
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
    </section>
  );
};

export default CarouselSlick;