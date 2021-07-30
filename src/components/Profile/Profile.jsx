import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getInfoUserAction,
  putUpdateUser,
} from "../../store/actions/getInfoUser.action";
import "./css/profile.css";
import Loader from "../../components/Loader/Loader";
// date format
import * as dayjs from "dayjs";
import { Container, Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProfileUser() {
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
  // snackbar

  useEffect(() => {
    validSubmit();
  });

  let loading = useSelector((state) => state.CommonReducer.loading);
  const dispatch = useDispatch();

  const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
  useEffect(() => {
    dispatch(getInfoUserAction(taiKhoan));
  }, [dispatch, taiKhoan]);

  const maLoaiNguoiDung = JSON.parse(localStorage.getItem("maLoaiNguoiDung"));
  const infoUser = useSelector((state) => state.infoUserReducer.inforUser);
  const thongTinDatVe = useSelector(
    (state) => state.infoUserReducer.thongTinDatVe
  );

  const [stateSearch, setStateSearch] = useState("");

  const renderLichSuDatVe = () => {
    return thongTinDatVe
      ?.filter((item) => {
        if (stateSearch === "") {
          return item;
        } else if (
          item.tenPhim
            .toLocaleLowerCase()
            .match(stateSearch.toLocaleLowerCase())
        ) {
          return item;
        }
        return false;
      })
      .map((donHang, index) => {
        let soLuong = donHang.danhSachGhe.length;
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{donHang.tenPhim}</td>
            <td>{donHang.danhSachGhe[0].tenHeThongRap}</td>
            <td>{dayjs(donHang.ngayDat).format("DD-MM-YYYY")}</td>
            <td>{dayjs(donHang.ngayDat).format("HH:MM")}</td>
            <td>{soLuong}</td>

            <td>{(donHang.giaVe * soLuong).toLocaleString()}</td>
          </tr>
        );
      });
  };

  // set value render form input show infoUser
  const showFormUpdate = () => {
    setShowUpdate(false);
    setStateUser({
      hoTen: infoUser.hoTen,
      taiKhoan: infoUser.taiKhoan,
      matKhau: infoUser.matKhau,
      email: infoUser.email,
      soDT: infoUser.soDT,
      maLoaiNguoiDung: "KhachHang",
      maNhom: "GP01",
    });
    setStateError({
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
    });
    setStateValid(true);
  };
  // show hiden form update
  const [showUpdate, setShowUpdate] = useState(true);
  const [stateValid, setStateValid] = useState(true);
  // setSate value form update input
  const [stateUser, setStateUser] = useState({
    hoTen: infoUser.hoTen,
    taiKhoan: infoUser.taiKhoan,
    matKhau: infoUser.matKhau,
    email: infoUser.email,
    soDT: infoUser.soDT,
    maLoaiNguoiDung: "KhachHang",
    maNhom: "GP01",
  });
  const [stateError, setStateError] = useState({
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
  });
  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putUpdateUser(stateUser));
  };
  // change value form
  const handlChange = (e) => {
    const { name, value } = e.target;
    setStateUser({ ...stateUser, [name]: value });
    if (value.trim() === "") {
      stateError[name] = "Do Not Empty !";
    } else {
      stateError[name] = "";
    }
  };
  const validSubmit = () => {
    let valid = true;
    for (let key in stateError) {
      if (stateError[key] !== "" || stateUser[key] === "") {
        valid = false;
      }
    }
    setStateValid(valid);
  };

  // render
  return loading ? (
    <Loader />
  ) : (
    <div className="profileUser">
      {showUpdate ? (
        <Grid container>
          <Grid item lg={4} className="infoUser">
            <h5>Thông Tin Của Bạn</h5>
            <table className="table">
              <thead>
                <tr>
                  <td>Họ tên</td>
                  <td>: {infoUser.hoTen}</td>
                </tr>
                <tr>
                  <td>Tài khoản</td>
                  <td>: {infoUser.taiKhoan}</td>
                </tr>
                <tr>
                  <td>Mật khẩu</td>
                  <td>: {infoUser.matKhau}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: {infoUser.email}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>: {infoUser.soDT}</td>
                </tr>
                <tr>
                  <td>Vai trò</td>
                  <td>
                    :
                    {maLoaiNguoiDung === "QuanTri"
                      ? " Quản trị viên"
                      : " Khách hàng"}
                  </td>
                </tr>
              </thead>
            </table>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={showFormUpdate}>Cập nhật thông tin</button>
            </div>
          </Grid>

          <Grid item lg={7} className="historyBooking">
            <h5>Lịch Sử Đặt Vé</h5>
            <input
              type="text"
              placeholder="Tìm Tên Phim"
              className="inputSearch"
              onChange={(e) => {
                setStateSearch(e.target.value);
              }}
            />
            <table className="tableBooking">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Phim</th>
                  <th>Cụm rạp</th>
                  <th>Ngày đặt</th>
                  <th>Xuất Chiếu</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>{renderLichSuDatVe()}</tbody>
            </table>
          </Grid>
        </Grid>
      ) : (
        <Container>
          <Grid
            container
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item lg={12} className="updateUser">
              <h5>Cập Nhật Tài Khoản</h5>
              <form onSubmit={handleSubmit}>
                <span>Họ Tên : </span>
                <input
                  type="text"
                  placeholder="Họ Tên"
                  name="hoTen"
                  value={stateUser.hoTen}
                  onChange={handlChange}
                />
                <p>{stateError.hoTen}</p>
                <span>Tài Khoản : </span>
                <input
                  type="text"
                  placeholder="Tài Khoản"
                  name="taiKhoan"
                  disabled
                  value={stateUser.taiKhoan}
                  onChange={handlChange}
                />
                <p>{stateError.taiKhoan}</p>
                <span>Mật Khẩu : </span>
                <input
                  type="text"
                  placeholder="Mật Khẩu"
                  name="matKhau"
                  value={stateUser.matKhau}
                  onChange={handlChange}
                />
                <p>{stateError.matKhau}</p>
                <span>Email : </span>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={stateUser.email}
                  onChange={handlChange}
                />
                <p>{stateError.email}</p>
                <span>Phone : </span>
                <input
                  type="text"
                  placeholder="Số Điện Thoại"
                  name="soDT"
                  value={stateUser.soDT}
                  onChange={handlChange}
                />
                <p>{stateError.soDT}</p>
                <span>Loại Khách Hàng : </span>
                <input
                  type="text"
                  placeholder={
                    maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách Hàng"
                  }
                  disabled
                />
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button
                    style={{ color: "red" }}
                    type="button"
                    onClick={() => {
                      setShowUpdate(true);
                    }}
                  >
                    Trở Lại
                  </button>
                  {stateValid ? (
                    <button type="submit" onClick={handleClick}>
                      Cập nhật thông tin
                    </button>
                  ) : (
                    <button disabled style={{ cursor: "no-drop" }}>
                      Cập nhật thông tin
                    </button>
                  )}
                </div>
              </form>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            {statusCode === 200 ? (
              <Alert onClose={handleClose} severity="success">
                Update Thành Công
              </Alert>
            ) : (
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            )}
          </Snackbar>
        </Container>
      )}
    </div>
  );
}
