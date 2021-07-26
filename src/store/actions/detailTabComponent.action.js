import Axios from "axios"
import { DOMAIN } from "../../services/domainUrl"
import { GET_LOGO_DETAILTAB, GET_MOVIE_DETAIL, GET_LICH_CHIEU_MOVIE_DETAIL, SET_LICH_CHIEU_MOVIE_DETAIL } from "../constants/detailTabComponent.const"


export const getLogoDetailTabAction = () => {// get data to Axios use NavigationTabsOne.page.jsx
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: `${DOMAIN}QuanLyRap/LayThongTinHeThongRap`
            })
            dispatch({
                type: GET_LOGO_DETAILTAB, // dipatch TabNavigationPageReducer
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// detail
export const getMovieDetail_Action = (id) => {
    return async (dispatch) => {
        try {
            // show loading
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
            });
            const { lichChieu, ..._resData } = res.data
            dispatch({
                type: GET_MOVIE_DETAIL,
                payload: _resData,
            });
            dispatch({
                type: GET_LICH_CHIEU_MOVIE_DETAIL,
                payload: lichChieu,
            });
            // hiden loading
        } catch (error) {
            console.log(error);
        }
    };
};
// chưa sd
export const setDateMovie = (date) => {
    return {
        type: SET_LICH_CHIEU_MOVIE_DETAIL,
        payload: date,
    }
}
