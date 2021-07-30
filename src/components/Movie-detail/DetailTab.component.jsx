import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
// date format
import * as dayjs from "dayjs";
import { listCinema } from "./dataCinema";
import { useHistory } from "react-router-dom";
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
// function tabpanel scoll
function a11yPropsScroll(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}
// function tabpanel

const DetailTabComponent = () => {
  const history = useHistory();
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
  const detailMovie = useSelector((state) => {
    return state.DetailTabReducer?.detailMovie || {};
  });
  const lichChieuMovie = useSelector((state) => {
    return state.DetailTabReducer?.lichChieuMovie;
  });
  // contructor
  const { ngayKhoiChieu, maPhim, moTa, tenPhim, biDanh, maNhom } = detailMovie;

  const listLogo = useSelector((state) => {
    return state.DetailTabReducer?.listShowTimeDetail; // get data to DetailTabReducer
  });

  // render logo
  const renderLoGo = () => {
    return listLogo?.map((item, index) => {
      let httpS = item?.logo.split(":");
      let urlImg = httpS[0] + "s:" + httpS[1];
      return (
        <Grid
          item
          xs={4}
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
            <img src={urlImg} alt={urlImg} className="images" />
          </button>
          <p>{item.maHeThongRap}</p>
        </Grid>
      );
    });
  };
  // set date
  const [stateDate, setDate] = useState("");
  /// set maRap
  const [stateMaRap, setStateMarap] = useState({
    maRap: "",
  });
  // get maRap
  const handleCodeCinema = (codeCinema) => {
    setStateMarap({
      maRap: codeCinema,
    });
    setValues(0);
  };
  // render logo

  // render image rạp
  const renderImageCinema = () => {
    const item = listCinema.find((item) => item.name === stateMaRap.maRap);
    return <img src={item.img} alt={item.img} />;
  };
  // render image rạp

  // render lichChieu

  //Return Time-end with Time-start
  const getTimeEnd = (timeStart) => {
    let dateFormat = new Date();
    dateFormat.setHours(timeStart.slice(0, 2), timeStart.slice(3), 0);
    dateFormat.setHours(dateFormat.getHours() + 2);
    let timeEnd = dateFormat.toLocaleTimeString("en-GB").slice(0, 5);
    return timeEnd;
  };
  const renderLichChieu = () => {
    let index = lichChieuMovie.findIndex(
      (item) => item.thongTinRap.maHeThongRap === stateMaRap.maRap
    );
    if (index !== -1) {
      return lichChieuMovie
        .filter((itemF) => itemF.thongTinRap.maHeThongRap === stateMaRap.maRap)
        .filter(
          (itemF) =>
            dayjs(itemF.ngayChieuGioChieu).format("DD-MM-YYYY") ===
            dayjs(stateDate).format("DD-MM-YYYY")
        )
        .map((item, index) => {
          return (
            <Grid container className="pageScheduleMovie" key={index}>
              <Grid className="imageLogo" item xs={4} sm={3} md={3} lg={2}>
                {renderImageCinema()}
              </Grid>
              <Grid item xs={8} sm={9} md={9} lg={10} className="inforCinema">
                <p>
                  Tên Rạp :{" "}
                  <span className={`${stateMaRap.maRap}`}>
                    {item.thongTinRap.tenCumRap}
                  </span>
                </p>
                <p>Phim : {item.tenPhim}</p>
                <p>
                  Thời Lượng : {item.thoiLuong} Phút - Ngày Chiếu :{" "}
                  {dayjs(item.ngayChieuGioChieu).format("DD-MM-YYYY")}
                </p>
                <p>
                  Giờ Chiếu :
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      bookingMovie(item.maLichChieu, item.thongTinRap.tenCumRap)
                    }
                    className={`showTime ${stateMaRap.maRap}`}
                  >
                    {item.ngayChieuGioChieu.slice(11, 16)}
                    <label
                      style={{ color: "gray", marginLeft: "5px" }}
                    >{`~ ${getTimeEnd(
                      item.ngayChieuGioChieu.slice(11, 16)
                    )}`}</label>
                  </span>
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
    // const arrayFilter = new Set();
    // const fillterDate = lichChieuMovie.filter((obj) => {
    //   const checkFilter = arrayFilter.has(
    //     dayjs(obj.ngayChieuGioChieu).format("mm-dd-yyyy")
    //   );
    //   arrayFilter.add(dayjs(obj.ngayChieuGioChieu).format("mm-dd-yyyy"));
    //   return !checkFilter;
    // });
    return lichChieuMovie
      .filter((itemF) => itemF.thongTinRap.maHeThongRap === stateMaRap.maRap)
      .map((item, index) => {
        return (
          <Tab
            onClick={() => {
              setDate(item.ngayChieuGioChieu);
            }}
            label={dayjs(item.ngayChieuGioChieu).format("DD-MM-YYYY")}
            {...a11yPropsScroll(index)}
            key={index}
          />
        );
      });
  };

  // booking
  const bookingMovie = (maLichChieu, tenCumRap) => {
    if (maLichChieu && maPhim && tenCumRap) {
      history.push(
        `/bookingComponent/${maLichChieu}-${maPhim}-${tenCumRap}-${stateDate}`
      );
    }
    const toKen = JSON.parse(localStorage.getItem("token"));
    if (maLichChieu && maPhim && tenCumRap && !toKen) {
      history.push("/signIn");
    }
  };

  return (
    <div className="detailTab">
      <Container maxWidth="md">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} className="tabMovie">
              <Tab label="Thông Tin" {...a11yProps(0)} />
              <Tab label="Lịch Chiếu" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Grid container className="infoMovie">
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
                  <li>{dayjs(ngayKhoiChieu).format("DD-MM-YYYY")}</li>
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
            <Grid container className="detailTabCinema" spacing={1}>
              <Grid container item xs={12} sm={4} md={4} lg={4}>
                <Accordion className="accordionLogo">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="titleLogo">Chọn Rạp : {stateMaRap.maRap}</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container item className="logoCinema">
                      {renderLoGo()}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                className="scheduleMovie"
              >
                <Grid item xs={12} lg={12}>
                  <AppBar position="static" color="default">
                    <Paper className="paperBar">
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
                  <h5 className="titleDate">Chọn Ngày Chiếu</h5>
                </Grid>
                <Grid item xs={12} lg={12} className="rowScheduleMovie">
                  {renderLichChieu()}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
};
export default DetailTabComponent;
