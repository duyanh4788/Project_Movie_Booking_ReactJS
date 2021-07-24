import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { ADD_CLIENT_MANAGEMENT, GET_INFO_CLIENT, GET_LIST_CLIENT_MANAGEMENT, GET_LIST_SEARCH_CLIENT_MANAGEMENT, PAGE_EDIT_CLIENT, TAIKHOAN_CLIENT_MANAGEMENT, UPDATE_LIST_CLIENT_MANAGEMENT } from "../constants/clientManagement.constant";
import { SET_UPDATE_SUCCESS_MOVIE_MANAGEMENT } from "../constants/movieManagement.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";

export const getListClientManagement = (maNhom) => {
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
            })
            dispatch({
                type: GET_LIST_CLIENT_MANAGEMENT,
                payload: res.data
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error);
            dispatch(hidenLoader_Action());
        }
    }
}

export const getListSearchClientManagement = (maNhom, tuKhoa) => {
    return async (dispatch) => {
        try {
            dispatch(showLoader_Action());
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${tuKhoa}`
            })
            dispatch({
                type: GET_LIST_SEARCH_CLIENT_MANAGEMENT,
                payload: res.data
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error);
            dispatch(hidenLoader_Action());
        }
    }
}

export const deleteListClientManagement = (taiKhoan) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        try {
            dispatch(showLoader_Action());
            const res = await Axios({
                method: "DELETE",
                url: `${DOMAIN}QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
                headers: {
                    Authorization: `Bearer ${toKen}`,
                }
            })
            dispatch({
                type: TAIKHOAN_CLIENT_MANAGEMENT,
                payload: taiKhoan,
            })
            alert(res.data)
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error.response);
            alert(error.response.data)
            dispatch(hidenLoader_Action());
        }
    }
}

export const updateListClientManagement = (infoClient) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        try {
            dispatch(showLoader_Action());
            const res = await Axios({
                method: "PUT",
                url: `${DOMAIN}QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
                data: infoClient,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: UPDATE_LIST_CLIENT_MANAGEMENT,
                payload: res
            })
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error);
            dispatch(hidenLoader_Action());
        }
    }
}

export const setUpdateSuccess = (data) => {
    return {
        type: SET_UPDATE_SUCCESS_MOVIE_MANAGEMENT,
        payload: data
    }
}

export const btnEditClient = (datas) => {
    return {
        type: UPDATE_LIST_CLIENT_MANAGEMENT,
        payload: datas
    }
}
export const addClientManagement = (dataClient) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        try {
            dispatch(showLoader_Action());
            const res = await Axios({
                method: "POST",
                url: `${DOMAIN}QuanLyNguoiDung/ThemNguoiDung`,
                data: dataClient,
                headers: {
                    Authorization: `Bearer ${toKen}`
                }
            })
            dispatch({
                type: ADD_CLIENT_MANAGEMENT,
                payload: res,
            })
            console.log(res);
            dispatch(hidenLoader_Action());
        } catch (error) {
            console.log(error.response);
            alert(error.response.data)
            dispatch(hidenLoader_Action());
        }
    }
}

export const btnThemNguoiDung = (data) => {
    return {
        type: ADD_CLIENT_MANAGEMENT,
        payload: data
    }
}

export const getInfoClient = (infoClient) => {
    return {
        type: GET_INFO_CLIENT,
        payload: infoClient,
    }
}

export const showFormClient = (data) => {
    return {
        type: PAGE_EDIT_CLIENT,
        payload: data,
    }
}
export const hidenFormClient = (data) => {
    return {
        type: PAGE_EDIT_CLIENT,
        payload: data,
    }
}