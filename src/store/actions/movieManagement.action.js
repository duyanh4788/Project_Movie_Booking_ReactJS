import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { MESSAGE_DATA_ERROR, MESSAGE_STATUS_CODE } from "../constants/messageSnackbar.constant";
import { DELETE_LIST_MOVIE_MANAGEMENT, GET_CODE_CINEMA_MOVIE_MANAGEMENT, GET_CUM_RAP_MOVIE_MANAGEMENT, GET_LIST_MOVIE_MANAGEMENT, GET_LIST_MOVIE_SEARCH_MANAGEMENT, GET_MAPHIM_MOVIE_MANAGEMENT, INFO_MOVIE_MANAGEMENT, PAGE_FORM_MOVIE_MANAGEMENT, UPDATE_LIST_MOVIE_MANAGEMENT } from "../constants/movieManagement.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";


export const getListMovieManagement = (maNhom) => {
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
            })
            dispatch({
                type: GET_LIST_MOVIE_MANAGEMENT,
                payload: res.data
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error.response);
            dispatch(hidenLoader_Action());
        }
    }
}

export const getListMovieSearchManagement = (maNhom, tenPhim) => {
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&tenPhim=${tenPhim}`
            })
            dispatch({
                type: GET_LIST_MOVIE_SEARCH_MANAGEMENT,
                payload: res.data
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error.response);
            dispatch(hidenLoader_Action());
        }
    }
}
// delete
export const deleteListMovieManagement = (maPhim) => {
    return async (dispatch) => {
        const toKen = JSON.parse(localStorage.getItem("token"))
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "DELETE",
                url: `${DOMAIN}QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: DELETE_LIST_MOVIE_MANAGEMENT,// render html
                payload: maPhim
            })
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message success
                payload: res.status
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: error.response.status
            })
            dispatch({
                type: MESSAGE_DATA_ERROR,// show message error
                payload: error.response.data
            })
            dispatch(hidenLoader_Action());
        }
    }
}
// show page moviemnanagement
export const getInfoMovie = (infoMovie) => {
    return {
        type: INFO_MOVIE_MANAGEMENT,
        payload: infoMovie
    }
}
export const showFormMovie = (data) => {
    return {
        type: PAGE_FORM_MOVIE_MANAGEMENT,
        payload: data
    }
}
export const hiddenFormMovie = (data) => {
    return {
        type: PAGE_FORM_MOVIE_MANAGEMENT,
        payload: data
    }
}
// update
export const updateListMovieManagement = (formData) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "POST",
                url: `${DOMAIN}QuanLyPhim/CapNhatPhimUpload`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: UPDATE_LIST_MOVIE_MANAGEMENT, // render html sau khi update thành công
                payload: res
            })
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message success
                payload: res.status
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: error.response.status
            })
            dispatch({
                type: MESSAGE_DATA_ERROR,// show message error
                payload: error.response.data
            })
            dispatch(hidenLoader_Action());
        }
    }
}
// add 
export const addListMovieManagement = (formData) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "POST",
                url: `${DOMAIN}QuanLyPhim/ThemPhimUploadHinh`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message success
                payload: res.status
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: error.response.status
            })
            dispatch({
                type: MESSAGE_DATA_ERROR,// show message error
                payload: error.response.data
            })
            dispatch(hidenLoader_Action());
        }
    }
}

// creat schedule
export const getMaPhimMovieManagement = (maPhim) => {
    return {
        type: GET_MAPHIM_MOVIE_MANAGEMENT,
        payload: maPhim,
    }
}
export const creatScheduleMovie = (dataMovie) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "POST",
                url: `${DOMAIN}QuanLyDatVe/TaoLichChieu`,
                data: dataMovie,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message success
                payload: res.status
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: error.response.status
            })
            dispatch({
                type: MESSAGE_DATA_ERROR,// show message error
                payload: error.response.data
            })
            dispatch(hidenLoader_Action());
        }
    }
}
// lấy thông tin rạp => mã cụm rạp => tạo lịch chiếu
export const getCodeCinemaMovieManagement = () => {
    return async (dispatch) => {

        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyRap/LayThongTinHeThongRap`
            })
            dispatch({
                type: GET_CODE_CINEMA_MOVIE_MANAGEMENT,
                payload: res.data,
            })

        } catch (error) {
            console.log(error);

        }
    }
}
export const getCumRapCinemaManagement = (maCumRap) => {
    return async (dispatch) => {

        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maCumRap}`
            })
            dispatch({
                type: GET_CUM_RAP_MOVIE_MANAGEMENT,
                payload: res.data
            })

        } catch (error) {
            console.log(error);

        }
    }
}

