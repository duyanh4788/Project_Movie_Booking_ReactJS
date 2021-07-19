import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { GET_INFO_USER, UPDATE_INFO_USER } from "../constants/getInfoUser.const";
import { hidenLoader_Action, showLoader_Action } from "./common.action";

export const getInfoUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader_Action());
      const res = await Axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        data: { taiKhoan },
      });
      dispatch({ type: GET_INFO_USER, payload: res.data });
      dispatch(hidenLoader_Action());
    } catch (error) {
      console.log("Lỗi call API thông tin user", error);
    }
  };
};

export const putUpdateUser = (infoUpdate) => {
  return async (dispatch) => {
    const toKen = JSON.parse(localStorage.getItem('token'))
    dispatch(showLoader_Action());
    try {
      const res = await Axios({
        url: `${DOMAIN}QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        method: "PUT",
        data: infoUpdate,
        headers: {
          Authorization: `Bearer ${toKen}`,
        }
      })
      dispatch({
        type: UPDATE_INFO_USER,
        payload: res.data
      })
      dispatch(hidenLoader_Action());
    } catch (error) {
      console.log(error.response.data);
      dispatch(hidenLoader_Action());
    }
  }
}