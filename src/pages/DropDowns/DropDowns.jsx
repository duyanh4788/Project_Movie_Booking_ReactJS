/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// react router dom
import { useHistory } from "react-router-dom";
import "./scss/dropdowns.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMovieDropDowns,
  getCinemaDropDownsWithCode,
  getDateDropDowns,
  setDataDropDownsWithCode,
} from "../../store/actions/dropdowns.action";
// date format
import * as dayjs from "dayjs";

const DropDowns = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // get maNhom
  const [stateMaNhom, setMaNhom] = useState({
    maNhom: "GP01",
  });
  // call api
  useEffect(() => {
    dispatch(getListMovieDropDowns(stateMaNhom.maNhom));
    dispatch(setDataDropDownsWithCode({}));
    dispatch(getDateDropDowns(""));
  }, [dispatch, stateMaNhom.maNhom]);

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
  const [stateTenPhim, setStateTenPhim] = useState({
    tenPhim: "",
  });
  // get maPhim
  const [stateMaPhim, setStateMaPhim] = useState({
    maPhim: "",
  });
  // set maNhom call api
  const getMaNhom = (maNhom) => {
    setMaNhom({ ...stateMaNhom, maNhom: maNhom });
    setStateTenPhim({
      tenPhim: "",
    });
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
  // set data phim
  const getCinemaDropDowns_ = (maPhim, tenPhim) => {
    stateTenPhim.tenPhim = tenPhim;
    dispatch(getCinemaDropDownsWithCode(maPhim));
    setStateMaPhim({
      maPhim: maPhim,
    });
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

  // render maNhom
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
        <a key={index} onClick={() => getMaNhom(item)}>
          Nhóm : {item}
        </a>
      );
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
  const [dateTime, setDateTime] = useState("");
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
          {dayjs(item.ngayChieuGioChieu).format("DD-MM-YYYY")}
        </a>
      );
    });
  };
  // show date
  const [stateTimeCode] = useState({
    timeCode: "",
  });
  const getDateCinema = (ngayChieuGioChieu, maLichChieu) => {
    stateTimeCode.timeCode = maLichChieu;
    let formatDate = ngayChieuGioChieu.slice(0, 10);
    setDate({
      date: formatDate,
    });
    let formatTimer = ngayChieuGioChieu.slice(11, 16);
    setTimer({
      timer: formatTimer,
    });
    setDateTime(ngayChieuGioChieu);
  };

  const bookingMovie = () => {
    if (stateTimeCode.timeCode && stateMaPhim.maPhim && stateTenRap.tenRap) {
      history.push(
        `/bookingComponent/${stateTimeCode.timeCode}-${stateMaPhim.maPhim}-${stateTenRap.tenRap}-${dateTime}`
      );
    }
    const toKen = JSON.parse(localStorage.getItem("token"));
    if (
      stateTimeCode.timeCode &&
      stateMaPhim.maPhim &&
      stateTenRap.tenRap &&
      !toKen
    ) {
      history.push("/signIn");
    }
  };

  return (
    <div className="container dropDownsRelavite">
      <div className="dropDownsMain">
        <div className="dropDownMaNhom">
          <button className="dropbtn">Mã Nhóm : {stateMaNhom.maNhom}</button>
          <ExpandMoreIcon />
          <div className="contentMaNhom">{renderMaNhom()}</div>
        </div>
        <div className="dropdownPhim">
          <button className="dropbtn">
            {stateTenPhim.tenPhim === ""
              ? "Chọn Phim"
              : stateTenPhim.tenPhim.slice(0, 12)}
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
            {stateDate.date === ""
              ? "Ngày Chiếu"
              : dayjs(stateDate.date).format("DD-MM-YYYY")}
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

        <button className="btnMuaVe" onClick={bookingMovie}>
          Mua Vé Ngay
        </button>
      </div>
    </div>
  );
};
export default DropDowns;
