import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hiddenFormMovie,
  updateListMovieManagement,
} from "../../store/actions/movieManagement.action";
import "./scss/FormEditMovie.css";
// date format
import * as dayjs from "dayjs";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormEditMovie = (props) => {
  const dispatch = useDispatch();
  // snackbar
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // snackbar

  // show status
  const statusCode = useSelector(
    (state) => state.MessageSnackbarReducer.statusCode
  );
  const errorMessage = useSelector(
    (state) => state.MessageSnackbarReducer.errorMessage
  );
  // show status
  useEffect(() => {
    if (statusCode === 500 || statusCode === 200) {
      handleClick();
    }
  }, [statusCode]);

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

  const [validSubmit, setValidSubmit] = useState(true);

  useEffect(() => {
    validButtonSubmit();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditMovie({ ...editMovie, [name]: value });
    // check empty
    if (value.trim() === "") {
      validMovie[name] = "Do Not Empty";
    } else {
      validMovie[name] = "";
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.name === "hinhAnh") {
      setEditMovie({ ...editMovie, hinhAnh: e.target.files[0] });
    }
  };

  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validMovie) {
      if (validMovie[key] !== "" || editMovie[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in editMovie) {
      formData.append(key, editMovie[key]);
    }
    dispatch(updateListMovieManagement(formData));
    dispatch(hiddenFormMovie("listUser"));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
    dispatch(setDataErrorToZero(0));
  };

  return (
    <>
      <div className="wrapFromEdit">
        <Container maxWidth="md">
          <h5>Edit Movie</h5>
          <form onSubmit={handleSubmit}>
            <label>Mã Phim</label>
            <input
              onChange={handleChange}
              value={editMovie.maPhim}
              disabled
              type="text"
            />
            <span>{validMovie.maPhim}</span>

            <label>Tên Phim</label>
            <input
              onChange={handleChange}
              value={editMovie.tenPhim}
              placeholder="Tên Phim"
              name="tenPhim"
              type="text"
            />
            <span>{validMovie.tenPhim}</span>
            <label>Ngày Công Chiếu</label>
            <input
              type="text"
              disabled
              value={`Ngày Công Chiếu : ${dayjs(infoMovie.ngayKhoiChieu).format(
                "DD-MM-YYYY"
              )}`}
            />
            <span>{validMovie.ngayKhoiChieu}</span>
            <label>Mã Nhóm</label>
            <input value={editMovie.maNhom} disabled type="text" />
            <label>Đánh Giá</label>
            <input
              value={editMovie.danhGia}
              placeholder="Đánh Giá"
              disabled
              type="danhGia"
            />
            <span>{validMovie.danhGia}</span>
            <label>Bí Danh</label>
            <input
              onChange={handleChange}
              value={editMovie.biDanh}
              placeholder="Bí Danh"
              name="biDanh"
            />
            <span>{validMovie.biDanh}</span>

            <p>Hình Ảnh</p>
            <img
              src={infoMovie.hinhAnh}
              alt={infoMovie.hinhAnh}
              style={{ width: "50px", height: "50px" }}
            />
            <input type="file" name="hinhAnh" onChange={handleChangeImage} />
            <span>{validMovie.hinhAnh}</span>

            <label>Trailer</label>
            <input
              onChange={handleChange}
              value={editMovie.trailer}
              placeholder="Trailer"
              name="trailer"
            />
            <span>{validMovie.trailer}</span>
            <p>Mô Tả</p>
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
                Trở Lại
              </button>
              {validSubmit ? (
                <button type="submit" style={{ cursor: "pointer" }}>
                  Update
                </button>
              ) : (
                <button disabled style={{ cursor: "no-drop" }}>
                  Update
                </button>
              )}
            </div>
          </form>
        </Container>
      </div>
      {statusCode === 200 ? (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Cập Nhật Thành Công
          </Alert>
        </Snackbar>
      ) : statusCode === 500 ? (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default FormEditMovie;
