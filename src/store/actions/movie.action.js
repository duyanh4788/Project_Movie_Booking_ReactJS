import Axios from "axios";
import { GET_MOVIE_LIST } from "../constants/movie.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";

// render list phim
export const getMovieList_Action = (maNhom) => {
  return async (dispatch) => {
    try {
      // show loading
      dispatch(showLoader_Action())
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
      });
      dispatch({
        type: GET_MOVIE_LIST,
        payload: res.data,
      });
      // hidden loading
      setTimeout(() => {
        dispatch(hidenLoader_Action())
      }, 500);
    } catch (error) {
      console.log(error);
      // hidden loading
      setTimeout(() => {
        dispatch(hidenLoader_Action())
      }, 500);
    }
  };
};

