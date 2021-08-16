import React from "react";
import { images, mobiles } from "./dataCarouselFooter";
import { Container, Grid } from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/Footer.style.css";

const FooterCarousel = () => {
  const settings = {
    dots: false,
    autoplay: true,
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

  const renderCarouselFooter = () => {
    return images.map((item, index) => {
      return <img src={item.img} alt="" className="imageSlider" key={index} />;
    });
  };

  return (
    <div className="footerRowOne"  id="ungDung">
      <Container>
        <Grid container className="rowOne">
          <Grid item lg={2}></Grid>
          <Grid item lg={4}>
            <div className="rowOneIntro">
              <span>
                <label>Ứng dụng tiện lợi dành cho người yêu điện ảnh</label>
                <p>
                  Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp
                  và đổi quà hấp dẫn.
                </p>
                <button>
                  <a
                    target="_blank"
                    href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                    rel="noreferrer"
                  >
                    App miễn phí - Tải về ngay!
                  </a>
                </button>
                <p>
                  TIX có hai phiên bản{" "}
                  <a
                    target="_blank"
                    href="https://apps.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197"
                    rel="noreferrer"
                  >
                    iOS
                  </a>
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=vn.com.vng.phim123"
                    rel="noreferrer"
                  >
                    Android
                  </a>
                </p>
              </span>
            </div>
          </Grid>
          <Grid item lg={2}></Grid>
          <Grid item lg={4}>
            <div className="rowOneCarousel">
              <img src={mobiles.img} alt="" className="imgPhone" />
              <div className="carouSelSlider">
                <Slider {...settings}>{renderCarouselFooter()}</Slider>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FooterCarousel;
