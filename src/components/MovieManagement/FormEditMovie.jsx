import { Container } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hiddenFormMovie,
  updateListMovieManagement,
} from "../../store/actions/movieManagement.action";
import "./scss/FormEditMovie.css";
import TextField from "@material-ui/core/TextField";

const FormEditMovie = (props) => {
  const dispatch = useDispatch();

  const infoMovie = useSelector((state) => {
    return state.MovieManagementReducer.infoMovie;
  });

  const [editMovie, setEditMovie] = useState({
    biDanh: infoMovie.biDanh,
    danhGia: infoMovie.danhGia,
    hinhAnh: {},
    maNhom: infoMovie.maNhom,
    maPhim: infoMovie.maPhim,
    moTa: infoMovie.moTa,
    ngayKhoiChieu: infoMovie.ngayKhoiChieu,
    tenPhim: infoMovie.tenPhim,
    trailer: infoMovie.trailer,
  });

  const [validMovie] = useState({
    biDanh: "",
    danhGia: "",
    hinhAnh: "",
    maNhom: "",
    maPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    tenPhim: "",
    trailer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMovie({ ...editMovie, [name]: value });
  };

  const handleChangeImage = (e) => {
    if (e.target.name === "hinhAnh") {
      setEditMovie({ ...editMovie, hinhAnh: e.target.files[0] });
    }
  };
  console.log(editMovie);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in editMovie) {
      formData.append(key, editMovie[key]);
    }
    dispatch(updateListMovieManagement(formData));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
  };

  return (
    <div className="backgroundFormAdd">
      <div className="wrapFromAdd">
        <Container maxWidth="md">
          <h4>Edit Movie</h4>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={editMovie.maPhim}
              disabled
              type="text"
            />
            <span>{validMovie.maPhim}</span>

            <input
              onChange={handleChange}
              value={editMovie.tenPhim}
              placeholder="Tên Phim"
              name="tenPhim"
              type="text"
            />
            <span>{validMovie.tenPhim}</span>

            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue={infoMovie.ngayKhoiChieu}
              name="ngayKhoiChieu"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <span>{validMovie.ngayKhoiChieu}</span>

            <input value={editMovie.maNhom} disabled type="text" />

            <input
              onChange={handleChange}
              value={editMovie.danhGia}
              placeholder="Đánh Giá"
              name="danhGia"
              type="danhGia"
            />
            <span>{validMovie.danhGia}</span>

            <input
              onChange={handleChange}
              value={editMovie.biDanh}
              placeholder="Bí Danh"
              name="biDanh"
            />
            <span>{validMovie.biDanh}</span>

            <img
              src={infoMovie.hinhAnh}
              alt={infoMovie.hinhAnh}
              style={{ width: "50px", height: "50px" }}
            />
            <input type="file" name="hinhAnh" onChange={handleChangeImage} />
            <span>{validMovie.hinhAnh}</span>

            <input
              onChange={handleChange}
              value={editMovie.trailer}
              placeholder="Trailer"
              name="trailer"
            />
            <span>{validMovie.trailer}</span>

            <textarea
              onChange={handleChange}
              value={editMovie.moTa}
              placeholder="Mô Tả"
              name="moTa"
            />
            <span>{validMovie.moTa}</span>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormMovie}
              >
                Cancel
              </button>
              <button type="submit" style={{ cursor: "pointer" }}>
                Update
              </button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default FormEditMovie;
