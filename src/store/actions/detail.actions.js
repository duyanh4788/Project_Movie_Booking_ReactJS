import Axios from "axios";
import { GET_MOVIE_DETAIL } from "../constants/detail.constant";

// detail
export const getMovieDetail_Action = (id) => {
  return async (dispatch) => {
    try {
      // show loading
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      });
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data,
      });
      // hiden loading
    } catch (error) {
      console.log(error);
    }
  };
};