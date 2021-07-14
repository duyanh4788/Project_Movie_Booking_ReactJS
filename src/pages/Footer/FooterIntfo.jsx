/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { imagesLogo, supply, loGoBig } from "./dataFooter";
import { Container, Grid } from "@material-ui/core";
import "./css/Footer.style.css";

const FooterIntfo = () => {
 
  const renderLogoSupply = () => {
    return supply.map((item, index) => {
      return (
        <a href="#" key={index}>
          <img src={item.img} className="imgLogoSupply" />
        </a>
      );
    });
  };
  return (
    <div className="footerRowTwo">
      <Container>
        <Grid container className="rowTwoLogo">
          <Grid item md={2} lg={2}>
            <h5>Tix</h5>
            <ul>
              <li>
                <a>FAQ</a>
              </li>
              <li>
                <a>Brand guidelines</a>
              </li>
            </ul>
          </Grid>
          <Grid item md={2} lg={2}>
            <h5>Thông Tin</h5>
            <ul>
              <li>
                <a>Thỏa thuận sử dụng</a>
              </li>
              <li>
                <a>Chính sách bảo mật</a>
              </li>
            </ul>
          </Grid>
          <Grid item lg={1}></Grid>
          <Grid item md={4} lg={2}>
            <h5 className="supply">Đối Tác</h5>
            {renderLogoSupply()}
          </Grid>
          <Grid item lg={1}></Grid>
          <Grid item md={2} lg={2}>
            <h5>MOBILE APP</h5>
            <a href="#">
              <img src={imagesLogo.androi} className="imgLogo" />
            </a>
            <a href="#">
              <img src={imagesLogo.apple} className="imgLogo" />
            </a>
          </Grid>
          <Grid item md={2} lg={2}>
            <h5>SOCIAL</h5>
            <a>
              <img src={imagesLogo.fb} className="imgLogo" />
            </a>
            <a>
              <img src={imagesLogo.zalo} className="imgLogo" />
            </a>
          </Grid>
        </Grid>
      </Container>

      <div className="rowTwoLogoRespon">
        <p>Thỏa thuận sử dụng Chính sách bảo mật</p>
        <span>
          <img src={imagesLogo.fb} className="imgLogo" />
          <img src={imagesLogo.zalo} className="imgLogo" />
        </span>
      </div>

      <hr />

      <Container>
        <Grid container className="rowTwoIntro">
          <Grid item xs={12} lg={2}>
            <img src={loGoBig.zion} alt="" className="imgLogoBig" />
          </Grid>
          <Grid item xs={12} lg={8}>
            <h5>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h5>
            <p>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </p>
            <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
            <p>
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </p>
            <p>Số Điện Thoại (Hotline): 1900 545 436</p>
            <p>Email: support@tix.vn</p>
          </Grid>
          <Grid item xs={12} lg={2}>
            <img src={loGoBig.thongbao} alt="" className="imgLogoBig" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default FooterIntfo;
