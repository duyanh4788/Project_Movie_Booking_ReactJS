/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
// data carousel
import { images } from "./CarouselData";
// material
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// css
import "./css/Carouselpage.css";
// modal
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";

const CarouselSlick = () => {
  // carousel
  const ref = useRef({});
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
    stateTrailer.trailers = subtitle
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

export default CarouselSlick;