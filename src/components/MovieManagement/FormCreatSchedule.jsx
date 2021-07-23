import React, { useEffect, useState } from "react";
import "./scss/FormCreatSchedule.css";
import { useDispatch, useSelector } from "react-redux";
import {
  creatScheduleMovie,
  hiddenFormMovie,
} from "../../store/actions/movieManagement.action";
// date format
// import * as dayjs from "dayjs";
import format from "date-format";
import { Container, TextField } from "@material-ui/core";

function FormCreatSchedule() {
  const dispatch = useDispatch();

  const maPhim = useSelector((state) => {
    return state.MovieManagementReducer.maPhim;
  });

  const [creatMovie, setCreatMovie] = useState({
    maPhim: maPhim,
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  const [validMovie] = useState({
    maPhim: "",
    ngayChieuGioChieu: "",
    maRap: "",
    giaVe: "",
  });

  const [validSubmit, setValidSubmit] = useState(true);

  useEffect(() => {
    validButtonSubmit();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatMovie({ ...creatMovie, [name]: value });
    // check empty
    if (value.trim() === "") {
      validMovie[name] = "Do Not Empty";
    } else {
      validMovie[name] = "";
    }
  };

  const handleChangeDateTime = (e) => {
    // let dateFormat = dayjs(e.target.value).format("DD-MM-YYYY hh:mm:ss");
    let dateFormat = format("dd/MM/yyyy hh:mm:ss", new Date(e.target.value));
    setCreatMovie({ ...creatMovie, ngayChieuGioChieu: dateFormat });
  };

  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validMovie) {
      if (validMovie[key] !== "" || creatMovie[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(creatMovie);
    dispatch(creatScheduleMovie(creatMovie));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
  };

  return (
    <div className="backgroundCreatSchedule">
      <div className="wrapCreatSchedule">
        <Container maxWidth="md">
          <h4>Tạo Lịch Chiếu</h4>
          <form onSubmit={handleSubmit}>
            <label>Mã Phim</label>
            <input
              onChange={handleChange}
              value={creatMovie.maPhim}
              disabled
              type="text"
            />
            <span>{validMovie.maPhim}</span>
            <label>Ngày Khỏi Chiếu</label><br />
            <TextField
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeDateTime}
              defaultValue={creatMovie.ngayChieuGioChieu}
              name="ngayChieuGioChieu"
            />
            <span>{validMovie.ngayChieuGioChieu}</span><br />

            <label>Mã Rạp</label>
            <input
              onChange={handleChange}
              value={creatMovie.maRap}
              name="maRap"
              placeholder="Mã Rạp"
              type="number"
            />
            <span>{validMovie.danhGia}</span>

            <label>Giá Phim</label>
            <input
              onChange={handleChange}
              value={creatMovie.giaVe}
              name="giaVe"
              placeholder="Giá Vé"
              type="number"
            />
            <span>{validMovie.biDanh}</span>
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormMovie}
              >
                Cancel
              </button>
              {validSubmit ? (
                <button type="submit" style={{ cursor: "pointer" }}>
                  Tạo Lịch Chiếu
                </button>
              ) : (
                <button disabled style={{ cursor: "no-drop" }}>
                  Tạo Lịch Chiếu
                </button>
              )}
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default FormCreatSchedule;
