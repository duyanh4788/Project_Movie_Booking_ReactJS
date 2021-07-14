import axios from "axios";
import { GET_INFO_USER } from "../constants/getInfoUser.const";
import { hidenLoader_Action, showLoader_Action } from "./common.action";

export const getInfoUserAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      dispatch(showLoader_Action());
      const res = await axios({
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        data: { taiKhoan },
      });
      console.log("Thông tin user", res.data);
      dispatch({ type: GET_INFO_USER, payload: res.data });
      dispatch(hidenLoader_Action());
    } catch (error) {
      console.log("Lỗi call API thông tin user", error);
    }
  };
};
