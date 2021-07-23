import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { ADD_LIST_MOVIE_MANAGEMENT, CREAT_SCHEDULE_MOVIE_MANAGEMENT, DELETE_LIST_MOVIE_MANAGEMENT, GET_LIST_MOVIE_MANAGEMENT, GET_MAPHIM_MOVIE_MANAGEMENT, INFO_MOVIE_MANAGEMENT, PAGE_FORM_MOVIE_MANAGEMENT, UPDATE_LIST_MOVIE_MANAGEMENT } from "../constants/movieManagement.constant";


export const getListMovieManagement = (maNhom) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
            })
            dispatch({
                type: GET_LIST_MOVIE_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const deleteListMovieManagement = (maPhim) => {
    return async (dispatch) => {
        const toKen = JSON.parse(localStorage.getItem("token"))
        try {
            const res = await Axios({
                method: "DELETE",
                url: `${DOMAIN}QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: DELETE_LIST_MOVIE_MANAGEMENT,
                payload: maPhim
            })
            alert(res.data)
        } catch (error) {
            console.log(error.response);
            alert(error.response.data)
        }
    }
}
// edit
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
    console.log(toKen);
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "POST",
                url: `${DOMAIN}QuanLyPhim/CapNhatPhimUpload`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            console.log(res);
            dispatch({
                type: UPDATE_LIST_MOVIE_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response.data);
        }
    }
}
// add 
export const addListMovieManagement = (formData) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
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
                type: ADD_LIST_MOVIE_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response);
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
                type: CREAT_SCHEDULE_MOVIE_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}