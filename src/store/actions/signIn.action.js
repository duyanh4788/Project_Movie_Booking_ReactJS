import Axios from "axios";
import { SIGN_IN, SIGN_OUT } from "../constants/signIn.constant";
// signIn
export const signIn_Action = (data, history) => {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        data, // recive (data) to import client  && history() to Sign-In.page
      });
      const { accessToken, taiKhoan, maLoaiNguoiDung, ...userLogin } = res.data;
      localStorage.setItem("token", JSON.stringify(accessToken)); // use booking.action
      localStorage.setItem("taiKhoan", JSON.stringify(taiKhoan)); // use booking.action
      localStorage.setItem("userLogin", JSON.stringify(userLogin)); // use Sign-Out.page
      localStorage.setItem("maLoaiNguoiDung", JSON.stringify(maLoaiNguoiDung)); // use guard.hoc
      history.push("/");
      dispatch({
        type: SIGN_IN,
        payload: userLogin,
      });
      console.log("Thông tin người dùng", res.data);
    } catch (error) {
      console.log(error);
    }
  };
};
// signOut
export const signOut_Action = () => {
  return {
    type: SIGN_OUT,
  };
};
