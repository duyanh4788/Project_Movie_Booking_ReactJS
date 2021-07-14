/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// react router dom
import { Link } from "react-router-dom";
import "./scss/dropdowns.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMovieDropDowns,
  getCinemaDropDownsWithCode,
  getDateDropDowns,
} from "../../store/actions/dropdowns.action";
// format dd-mm-yy
import format from "date-format";

const DropDowns = (props) => {
  const dispatch = useDispatch();
  // call api
  useEffect(() => {
    dispatch(getListMovieDropDowns());
  }, [dispatch]);
  // get data reducer
  const listMovie = useSelector((state) => {
    return state.dropDownsReducer.listPhim;
  });
  // get data reducer
  const listCinema = useSelector((state) => {
    return state.dropDownsReducer.listCinema;
  });

  // get data reducer
  const listLichChieu = useSelector((state) => {
    return state.dropDownsReducer.listLichChieu;
  });

  // show phim
  const [stateTenPhim] = useState({
    tenPhim: "",
  });
  // show phim
  const getCinemaDropDowns_ = (maPhim, tenPhim) => {
    stateTenPhim.tenPhim = tenPhim;
    dispatch(getCinemaDropDownsWithCode(maPhim));
    setTenRap({
      tenRap: "",
    });
    setDate({
      date: "",
    });
    setTimer({
      timer: "",
    });
  };
  // show phim
  const renderListMovie = () => {
    return listMovie.map((item, index) => {
      return (
        <a
          key={index}
          onClick={() => getCinemaDropDowns_(item.maPhim, item.tenPhim)}
        >
          {item.tenPhim}
        </a>
      );
    });
  };

  // show tenRap
  const renderListCinema = () => {
    return listCinema.heThongRapChieu.map((item, index) => {
      return (
        <section key={index}>
          {item.cumRapChieu.map((items, indexs) => {
            return (
              <a
                key={indexs}
                onClick={() => {
                  getCodeCinema(items, items.tenCumRap);
                }}
              >
                {items.tenCumRap}
              </a>
            );
          })}
        </section>
      );
    });
  };

  // show tenRap
  const [stateTenRap, setTenRap] = useState({
    tenRap: "",
  });
  // show tenRap
  const getCodeCinema = (items, tenCumRap) => {
    setTenRap({
      tenRap: tenCumRap,
    });
    dispatch(getDateDropDowns(items));
    setDate({
      date: "",
    });
    setTimer({
      timer: "",
    });
  };

  // show date
  const [stateDate, setDate] = useState({
    date: "",
  });
  // show timer
  const [stateTimer, setTimer] = useState({
    timer: "",
  });
  // show date
  const renderDateCinema = () => {
    return listLichChieu.lichChieuPhim.map((item, index) => {
      return (
        <a
          key={index}
          onClick={() => {
            getDateCinema(item.ngayChieuGioChieu, item.maLichChieu);
          }}
        >
          {" "}
          {format("mm-dd-yyyy", new Date(item.ngayChieuGioChieu))}
        </a>
      );
    });
  };
  // show date
  const [stateTimeCode] = useState({
    timeCode: "",
  });
  const getDateCinema = (ngayChieuGioChieu, maLichChieu) => {
    console.log(maLichChieu);
    stateTimeCode.timeCode = maLichChieu;
    let formatDate = format("mm-dd-yyyy", new Date(ngayChieuGioChieu));
    setDate({
      date: formatDate,
    });
    let formatTimer = format("hh:mm", new Date(ngayChieuGioChieu));
    setTimer({
      timer: formatTimer,
    });
  };
  console.log(listCinema);
  return (
    <div className="container dropDownsRelavite">
      <div className="dropDownsMain">
        <div className="dropdownPhim">
          <button className="dropbtn">
            {stateTenPhim.tenPhim === "" ? "Chọn Phim" : stateTenPhim.tenPhim}
          </button>
          <ExpandMoreIcon />
          <div className="contentPhim">{renderListMovie()}</div>
        </div>

        <div className="dropdownRap">
          <button className="dropbtn">
            {stateTenRap.tenRap === ""
              ? "Chọn Rạp"
              : stateTenRap.tenRap.slice(0, 33)}
          </button>
          <ExpandMoreIcon />
          <div className="contentRap">
            {listCinema.heThongRapChieu ? renderListCinema() : <a>Chọn Rạp</a>}
          </div>
        </div>

        <div className="dropdownTitle">
          <button className="dropbtn">
            {stateDate.date === "" ? "Ngày Chiếu" : stateDate.date}
          </button>
          <ExpandMoreIcon />
          <div
            className={
              listLichChieu.lichChieuPhim &&
              listLichChieu.lichChieuPhim.length > 6
                ? "contentTitleLength"
                : "contentTitle"
            }
          >
            {listLichChieu.lichChieuPhim ? (
              renderDateCinema()
            ) : (
              <a>Chọn Ngày Chiếu</a>
            )}
          </div>
        </div>

        <div className="dropdownTitle">
          <button className="dropbtn">
            {stateTimer.timer === "" ? "Ngày Chiếu" : stateTimer.timer}
          </button>
        </div>
        {/* link maLichChieu =>  bookingComponent */}
        <button className="btnMuaVe">
          <Link to={`/bookingComponent/${stateTimeCode.timeCode}`}>
            Mua Vé Ngay
          </Link>
        </button>
      </div>
    </div>
  );
};
export default DropDowns;
