import Axios from "axios";
import { ERROR_SIGN_IN, SIGN_IN, SIGN_OUT } from "../constants/signIn.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";
// signIn
export const signIn_Action = (data, history) => {
  return async (dispatch) => {
    try {
      // show loading
      dispatch(showLoader_Action())
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
      history.goBack();
      dispatch({
        type: SIGN_IN,
        payload: userLogin,
      });

      // hidden loading
      dispatch(hidenLoader_Action())
    } catch (error) {
      dispatch({
        type: ERROR_SIGN_IN,
        payload: error.response.data,
      })
      // hidden loading
      dispatch(hidenLoader_Action())
    }
  };
};
// signOut
export const signOut_Action = () => {
  return {
    type: SIGN_OUT,
  };
};
