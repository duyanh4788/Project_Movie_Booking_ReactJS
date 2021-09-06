import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { ADD_CLIENT_MANAGEMENT, GET_INFO_CLIENT, GET_LIST_CLIENT_MANAGEMENT, PAGE_EDIT_CLIENT, TAIKHOAN_CLIENT_MANAGEMENT, UPDATE_LIST_CLIENT_MANAGEMENT } from "../constants/clientManagement.constant";
import { MESSAGE_DATA_ERROR, MESSAGE_STATUS_CODE } from "../constants/messageSnackbar.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";


export const getListClientManagement = (maNhom, soTrang, soPhanTuTrenTrang) => {
    return async (dispatch) => {
        dispatch(showLoader_Action());
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
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
export const getListSearchClientManagement = (maNhom, tuKhoa, soTrang, soPhanTuTrenTrang) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
            })
            dispatch({
                type: GET_LIST_CLIENT_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
// delete
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
// edit update
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

export const btnEditClient = (datas) => {
    return {
        type: UPDATE_LIST_CLIENT_MANAGEMENT,
        payload: datas
    }
}
// add
export const addClientManagement = (dataClient) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        try {
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
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: res.status
            })
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: MESSAGE_STATUS_CODE,// show message error
                payload: error.response.status
            })
            dispatch({
                type: MESSAGE_DATA_ERROR,// show message error
                payload: error.response.data
            })
        }
    }
}
// setState ClientMaragement
export const btnThemNguoiDung = (dataNull) => {
    return {
        type: ADD_CLIENT_MANAGEMENT,
        payload: dataNull
    }
}
// show page ClientMaragement
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