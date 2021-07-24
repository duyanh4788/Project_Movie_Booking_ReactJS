import { Container, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addListMovieManagement,
  hiddenFormMovie,
} from "../../store/actions/movieManagement.action";
import "./scss/FormAddMovie.css";
// date format
import * as dayjs from "dayjs";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const FormAddMovie = () => {
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
  const dispatch = useDispatch();
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
  const [addMove, setAddMove] = useState({
    biDanh: "",
    danhGia: "",
    hinhAnh: {},
    maNhom: "",
    maPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    tenPhim: "",
    trailer: "",
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
    setAddMove({ ...addMove, [name]: value });
    // check empty
    if (value.trim() === "") {
      validMovie[name] = "Do Not Empty";
    } else {
      validMovie[name] = "";
    }
  };

  const handleChangeImage = (e) => {
    if (e.target.name === "hinhAnh") {
      setAddMove({ ...addMove, hinhAnh: e.target.files[0] });
    }
  };
  const handleChangeDateTime = (e) => {
    let dateFormat = dayjs(e.target.value).format("DD-MM-YYYY");
    setAddMove({ ...addMove, ngayKhoiChieu: dateFormat });
  };
  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validMovie) {
      if (validMovie[key] !== "" || addMove[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let key in addMove) {
      formData.append(key, addMove[key]);
    }
    dispatch(addListMovieManagement(formData));
  };

  const hidenFormMovie = () => {
    dispatch(hiddenFormMovie("listUser"));
  };

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
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };

  return (
    <div className="backgroundFormAdd">
      <div className="wrapFromAdd">
        <Container maxWidth="md">
          <h4>Thêm Movie</h4>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={addMove.maPhim}
              name="maPhim"
              placeholder="Mã Phim"
              type="text"
            />
            <span>{validMovie.maPhim}</span>

            <input
              onChange={handleChange}
              value={addMove.tenPhim}
              name="tenPhim"
              placeholder="Tên Phim"
              type="text"
            />
            <span>{validMovie.tenPhim}</span>
            <br />

            <TextField
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeDateTime}
              defaultValue={addMove.ngayKhoiChieu}
              name="ngayKhoiChieu"
            />
            <span>{validMovie.ngayKhoiChieu}</span>

            <select
              onChange={handleChange}
              value={addMove.maNhom}
              name="maNhom"
            >
              <option value="">Mã Nhóm</option>
              {renderMaNhom()}
            </select>
            <span>{validMovie.maNhom}</span>

            <input
              onChange={handleChange}
              value={addMove.danhGia}
              name="danhGia"
              placeholder="Đánh Giá"
              type="text"
            />
            <span>{validMovie.danhGia}</span>

            <input
              onChange={handleChange}
              value={addMove.biDanh}
              name="biDanh"
              placeholder="Bí Danh"
              type="text"
            />
            <span>{validMovie.biDanh}</span>
            <br />

            <input type="file" name="hinhAnh" onChange={handleChangeImage} />
            <span>{validMovie.hinhAnh}</span>

            <input
              onChange={handleChange}
              value={addMove.trailer}
              name="trailer"
              placeholder="Trailer"
              type="text"
            />
            <span>{validMovie.trailer}</span>

            <textarea
              onChange={handleChange}
              value={addMove.moTa}
              name="moTa"
              placeholder="Mô Tả"
              type="text"
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
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {statusCode === 200 ? (
          <Alert onClose={handleClose} severity="success">
            Thêm Phim Thành Công
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default FormAddMovie;
