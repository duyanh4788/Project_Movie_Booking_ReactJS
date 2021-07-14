import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
// date format
import format from "date-format";
import { listCinema } from "./dataCinema";
import { Link } from "react-router-dom";
import "./scss/detailTab.css";
import Paper from "@material-ui/core/Paper";

// function tabpanel
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// function tabpanel
// function tabpanel scoll
function a11yPropsScroll(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const DetailTabComponent = () => {
  // tabpanel date
  const [values, setValues] = React.useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  // tabpanel date

  // tabpanel
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // tabpanel

  // detail phim
  const detail = useSelector((state) => {
    return state.detaiMovielReducer?.detail;
  });

  // contructor
  const { ngayKhoiChieu, maPhim, moTa, tenPhim, biDanh, maNhom, lichChieu } =
    detail;

  const listLogo = useSelector((state) => {
    return state.DetailTabReducer.listShowTimeDetail; // get data to DetailTabReducer
  });

  // render logo
  const renderLoGo = () => {
    return listLogo.map((item, index) => {
      return (
        <Grid
          item
          xs={12}
          key={index}
          className={
            item.maHeThongRap === stateMaRap.maRap ? "loGo_Active" : "loGo"
          }
        >
          <button
            onClick={() => {
              handleCodeCinema(item.maHeThongRap);
            }}
          >
            <img src={item.logo} alt="" className="images" />
            <span>{item.maHeThongRap}</span>
          </button>
        </Grid>
      );
    });
  };
  /// set maRap
  const [stateMaRap, setStateMarap] = useState({
    maRap: "",
  });
  // get maRap
  const handleCodeCinema = (codeCinema) => {
    setStateMarap({
      maRap: codeCinema,
    });
  };
  // render logo

  // render image rạp
  const renderImageCinema = () => {
    const item = listCinema.find((item) => item.name === stateMaRap.maRap);
    return <img src={item.img} alt={item.img} />;
  };
  // render image rạp

  // render lichChieu
  const renderLichChieu = () => {
    let index = lichChieu.findIndex(
      (itemF) => itemF.thongTinRap.maHeThongRap === stateMaRap.maRap
    );
    if (index !== -1) {
      return lichChieu
        .filter((itemF) => itemF.thongTinRap.maHeThongRap === stateMaRap.maRap)
        .map((item, index) => {
          return (
            <Grid container className="rowTwoIntro" key={index}>
              <Grid className="imageLogo" item xs={2}>
                {renderImageCinema()}
              </Grid>
              <Grid item xs={10} key={index} className="inforCinema">
                <p>
                  Tên Rạp :{" "}
                  <span className={`${stateMaRap.maRap}`}>
                    {item.thongTinRap.tenCumRap}
                  </span>
                </p>
                <p>Phim : {item.tenPhim}</p>
                <p>
                  Thời Lượng : {item.thoiLuong} Phút - Ngày Chiếu :{" "}
                  {format("mm-dd-yyyy", new Date(item.ngayChieuGioChieu))}
                </p>
                <p>
                  Giờ Chiếu :
                  <Link to={`/bookingComponent/${item.maLichChieu}`}>
                    <span className={`showTime ${stateMaRap.maRap}`}>
                      {format("hh:mm", new Date(item.ngayChieuGioChieu))}
                    </span>
                  </Link>
                </p>
              </Grid>
            </Grid>
          );
        });
    } else {
      return (
        <Grid item xs={12} className="inforCinema">
          <p style={{ color: "gray", textAlign: "center" }}>
            Không Có Xuất Chiếu
          </p>
        </Grid>
      );
    }
  };
  // render lichChieu

  // render date
  const renderDate = () => {
    return lichChieu.map((item, index) => {
      return (
        <Tab
          label={format("mm-dd-yyyy", new Date(item.ngayChieuGioChieu))}
          {...a11yPropsScroll(index)}
          key={index}
        />
      );
    });
  };

  return (
    <div className="detailTab">
      <Container maxWidth="md">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} className="tabs">
              <Tab label="Thông Tin" {...a11yProps(0)} />
              <Tab label="Lịch Chiếu" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container className="thongTin">
              <Grid lg={2} item>
                <ul>
                  <li>Ngày Khởi Chiếu : </li>
                  <li>Mã Phim :</li>
                  <li>Tên Phim :</li>
                  <li>Bí Danh :</li>
                  <li>Mã Nhóm :</li>
                </ul>
              </Grid>
              <Grid lg={2} item>
                <ul>
                  <li>
                    {format("mm-dd-yyyy", new Date(ngayKhoiChieu))}
                  </li>
                  <li>{maPhim}</li>
                  <li>{tenPhim}</li>
                  <li>{biDanh}</li>
                  <li>{maNhom}</li>
                </ul>
              </Grid>
              <Grid lg={8} item>
                Mô Tả : {moTa}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container className="navigaToDetail">
              <Grid container item xs={4} className="rowOne">
                {renderLoGo()}
              </Grid>
              <Grid container item xs={8} className="rowTwo">
                <AppBar position="static" color="default">
                  <Paper>
                    <Tabs
                      value={values}
                      onChange={handleChanges}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {renderDate()}
                    </Tabs>
                  </Paper>
                </AppBar>
                {renderLichChieu()}
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
};
export default DetailTabComponent;
