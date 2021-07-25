import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { GET_INFO_USER, UPDATE_INFO_USER } from "../constants/getInfoUser.const";
import { MESSAGE_DATA_ERROR, MESSAGE_STATUS_CODE } from "../constants/messageSnackbar.constant";
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
      dispatch({
        type: MESSAGE_STATUS_CODE,// show message success
        payload: res.status
      })
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: MESSAGE_STATUS_CODE,// show message error
        payload: error.response.status
      })
      dispatch({
        type: MESSAGE_DATA_ERROR,// show message error
        payload: error.response.data
      })
    }
  }
}

