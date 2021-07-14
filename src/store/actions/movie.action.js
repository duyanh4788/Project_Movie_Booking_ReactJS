import Axios from "axios";
import { GET_MOVIE_LIST } from "../constants/movie.constant";

// render list phim
export const getMovieList_Action = (maNhom) => {
  return async (dispatch) => {
    try {
      const res = await Axios({
        method: "GET",
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`,
      });
      dispatch({
        type: GET_MOVIE_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

