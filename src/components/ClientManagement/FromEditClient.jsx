import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hidenFormClient,
  updateListClientManagement,
} from "../../store/actions/clientManagement.action";
import "./scss/FromEditClient.css";
import { setDataErrorToZero } from "../../store/actions/messageSnackbar.action";


function FromEditClient(props) {
  
  const dispatch = useDispatch();

  const infoClient = useSelector((state) => {
    return state.ClientManagementReducer.infoClient;
  });

  useEffect(() => {
    validButtonSubmit();
  });

  const [editClient, setEditClient] = useState({
    taiKhoan: infoClient.taiKhoan,
    matKhau: infoClient.matKhau,
    email: infoClient.email,
    soDt: infoClient.soDt,
    maNhom: props.maNhom,
    maLoaiNguoiDung: infoClient.maLoaiNguoiDung,
    hoTen: infoClient.hoTen,
  });

  const [validClient] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const [validSubmit, setValidSubmit] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditClient({ ...editClient, [name]: value });

    // valid
    if (value.trim() === "") {
      validClient[name] = "Do Not Empty";
    } else {
      validClient[name] = "";
    }
    if (validClient[name] !== "") {
      setValidSubmit(false);
    } else {
      setValidSubmit(true);
    }
    // valid
  };

  const validButtonSubmit = () => {
    let valid = true;
    for (let key in validClient) {
      if (validClient[key] !== "" || editClient[key] === "") {
        valid = false;
      }
    }
    setValidSubmit(valid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateListClientManagement(editClient));
    dispatch(hidenFormClient("listUser"));
  };
  const hidenFormEdit = () => {
    dispatch(setDataErrorToZero(0));
    dispatch(hidenFormClient("listUser"));
  };

  return (
    <>
      <div className="wrapFromEdit">
        <Container maxWidth="md">
          <h5>Edit Client</h5>
          <form onSubmit={handleSubmit}>
            <label>Tài Khoản</label>
            <input
              onChange={handleChange}
              value={editClient.taiKhoan}
              disabled
              type="text"
            />
            <p>{validClient.taiKhoan}</p>

            <label>Mật Khẩu</label>
            <input
              onChange={handleChange}
              value={editClient.matKhau}
              placeholder="Mật Khẩu"
              name="matKhau"
              type="password"
            />
            <p>{validClient.matKhau}</p>

            <label>Họ Tên</label>
            <input
              onChange={handleChange}
              value={editClient.hoTen}
              placeholder="Họ Tên"
              name="hoTen"
              type="text"
            />
            <p>{validClient.hoTen}</p>

            <label>Email</label>
            <input
              onChange={handleChange}
              value={editClient.email}
              placeholder="Email"
              name="email"
              type="email"
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            />
            <p>{validClient.email}</p>

            <label>Phone</label>
            <input
              onChange={handleChange}
              value={editClient.soDt}
              placeholder="Số Điện Thoại"
              name="soDt"
            />
            <p>{validClient.soDt}</p>

            <label>Vai Trò</label>
            <select
              name="maLoaiNguoiDung"
              value={editClient.maLoaiNguoiDung}
              onChange={handleChange}
            >
              <option value="QuanTri">Quản Trị</option>
              <option value="KhachHang">Khách Hàng</option>
            </select>
            <label>Mã Nhóm</label>
            <select>
              <option>Mã Nhóm : {editClient.maNhom}</option>
            </select>

            <p>{validClient.maNhom}</p>
            <p>{validClient.maLoaiNguoiDung}</p>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                style={{ cursor: "pointer", color: "red" }}
                onClick={hidenFormEdit}
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
    </>
  );
}

export default FromEditClient;
