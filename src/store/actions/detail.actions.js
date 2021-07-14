import Axios from "axios";
import { GET_MOVIE_DETAIL } from "../constants/detail.constant";
// import { hidenLoader_Action, showLoader_Action } from "./common.action";

// detail
export const getMovieDetail_Action = (id) => {
  return async (dispatch) => {
    try {
      // show loading
      // dispatch(showLoader_Action())
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      });
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data,
      });
      // hiden loading
      // dispatch(hidenLoader_Action())
    } catch (error) {
      console.log(error);
    }
  };
};