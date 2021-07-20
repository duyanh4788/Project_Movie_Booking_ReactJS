import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { ERR_NOTIFI_SIGNUP, INFOR_SIGNIN, SUCCESS_NOTIFI_SIGNUP } from "../constants/signup.constant";

export const postSignUp_Action = (data) => {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "POST",
        url: `${DOMAIN}QuanLyNguoiDung/DangKy`,
        data,
      })
      dispatch({
        type: INFOR_SIGNIN,
        payload: res.data,
      })
      console.log(res.data);
      dispatch({
        type: SUCCESS_NOTIFI_SIGNUP,
        payload: res.status
      })
    } catch (error) {
      if (error.response) {
        dispatch({
          type: ERR_NOTIFI_SIGNUP,
          payload: error.response.data
        })
      }
    }
  }
};