import {
  Backdrop,
  Container,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClientManagement,
  hidenFormClient,
} from "../../store/actions/clientManagement.action";
import "./scss/FromAddClient.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
}));

function FromAddClient() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // snackbar
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
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
      handleClickSnackBar();
    }
  }, [statusCode]);
  // snackbar

  // modal
  let statusAdd = useSelector((state) => {
    return state.ClientManagementReducer.addSuccess?.status || null;
  });
  let dataAdd = useSelector((state) => {
    return state.ClientManagementReducer.addSuccess?.data || {};
  });

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(setDataErrorToZero(0));
  };
  // modal

  useEffect(() => {
    validButtonSubmit();
  });

  useEffect(() => {
    if (statusAdd === 200) {
      setOpen(true);
    }
  }, [statusAdd]);

  const [addClient, setAddClient] = useState({
    taiKhoan: "",
    matKhau: "",
    confirmMatKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const [validClient] = useState({
    taiKhoan: "",
    matKhau: "",
    confirmMatKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [validSubmit, setValidSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value, pattern, type } = e.target;
    setAddClient({ ...addClient, [name]: value });

    // check pattern
    let regex = new RegExp(pattern);
    // valid check empty
    if (value.trim() === "") {
      validClient[name] = "Do Not Empty";
    } else {
      validClient[name] = "";
    }
    // valid check empty
    if (name === "maNhom") {
      if (!value) {
        validClient[name] = "Chọn Mã Nhóm";
      }
    }
    if (name === "maLoaiNguoiDung") {
      if (!value) {
        validClient[name] = "Chọn Mã Người Dùng";
      }
    }
    // valid check empty

    // check password
    if (name === "confirmMatKhau") {
      if (value === addClient["matKhau"]) {
        validClient[name] = "";
      } else {
        validClient[name] = "Mật Khẩu Không Trùng Nhau !";
      }
    }
    // check password

    // check email
    if (type === "email") {
      if (!value) {
        validClient[name] = "Do Not Empty !";
      } else if (!regex.test(value)) {
        validClient[name] = "Email Invaild !";
      }
    }
    // check email
  };
  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validClient) {
      if (validClient[key] !== "" || addClient[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };
  //   submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addClientManagement(addClient));
  };
  const hidenFormEdit = () => {
    dispatch(hidenFormClient("listUser"));
    dispatch(setDataErrorToZero(0));
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
          <h4>Thêm Người Dùng</h4>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={addClient.taiKhoan}
              placeholder="Tài Khoản"
              name="taiKhoan"
              type="text"
            />
            <span>{validClient.taiKhoan}</span>

            <input
              onChange={handleChange}
              value={addClient.matKhau}
              placeholder="Mật Khẩu"
              name="matKhau"
              type="password"
            />
            <span>{validClient.matKhau}</span>

            <input
              onChange={handleChange}
              value={addClient.confirmMatKhau}
              placeholder="Xác Nhận Mật Khẩu Mật Khẩu"
              name="confirmMatKhau"
              type="password"
            />
            <span>{validClient.confirmMatKhau}</span>

            <input
              onChange={handleChange}
              value={addClient.hoTen}
              placeholder="Họ Tên"
              name="hoTen"
              type="text"
            />
            <span>{validClient.hoTen}</span>

            <input
              onChange={handleChange}
              value={addClient.email}
              placeholder="Email"
              name="email"
              type="email"
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            />
            <span>{validClient.email}</span>

            <br />

            <select
              name="maLoaiNguoiDung"
              value={addClient.maLoaiNguoiDung}
              onChange={handleChange}
            >
              <option value="">Loại Người Dùng</option>
              <option value="QuanTri">Quản Trị</option>
              <option value="KhachHang">Khách Hàng</option>
            </select>

            <select
              name="maNhom"
              value={addClient.maNhom}
              onChange={handleChange}
            >
              <option value="">Mã Nhóm</option>
              {renderMaNhom()}
            </select>
            <br />
            <span style={{ marginRight: "20px" }}>
              {validClient.maLoaiNguoiDung}
            </span>
            <span>{validClient.maNhom}</span>
            <br />

            <input
              onChange={handleChange}
              value={addClient.soDt}
              placeholder="Số Điện Thoại"
              name="soDt"
            />
            <span>{validClient.soDt}</span>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormEdit}
              >
                Trở Lại
              </button>
              {validSubmit ? (
                <button
                  type="submit"
                  style={{ cursor: "pointer" }}
                  onClick={handleClickSnackBar}
                >
                  Add
                </button>
              ) : (
                <button type="submit" disabled style={{ cursor: "no-drop" }}>
                  Add
                </button>
              )}
            </div>
          </form>
        </Container>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
      >
        {statusCode === 200 ? (
          <Alert onClose={handleCloseSnackBar} severity="success">
            Thêm Thành Công Thành Công
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackBar} severity="error">
            {errorMessage}
          </Alert>
        )}
      </Snackbar>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modalAddClient">
            <table>
              <tbody>
                <tr>
                  <td>Tài Khoản </td>
                  <td>: {dataAdd.taiKhoan}</td>
                </tr>
                <tr>
                  <td> Mật Khẩu </td>
                  <td>: {dataAdd.matKhau}</td>
                </tr>
                <tr>
                  <td>Họ Tên </td>
                  <td>: {dataAdd.hoTen}</td>
                </tr>
                <tr>
                  <td>Email </td>
                  <td>: {dataAdd.email}</td>
                </tr>
                <tr>
                  <td>Phone </td>
                  <td>: {dataAdd.soDt}</td>
                </tr>
                <tr>
                  <td>Nhóm </td>
                  <td>: {dataAdd.maNhom}</td>
                </tr>
                <tr>
                  <td>Chức Vụ </td>
                  <td>: {dataAdd.maLoaiNguoiDung}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default FromAddClient;
