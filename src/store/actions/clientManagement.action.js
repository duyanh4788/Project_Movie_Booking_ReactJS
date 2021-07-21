import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { GET_LIST_CLIENT_MANAGEMENT, GET_LIST_SEARCH_CLIENT_MANAGEMENT, TAIKHOAN_CLIENT_MANAGEMENT } from "../constants/clientManagement.constant";

export const getListClientManagement = (maNhom) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
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

export const getListSearchClientManagement = (maNhom, tuKhoa) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${tuKhoa}`
            })
            dispatch({
                type: GET_LIST_SEARCH_CLIENT_MANAGEMENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteListClientManagement = (taiKhoan) => {
    const toKen = JSON.parse(localStorage.getItem("token"))
    return async (dispatch) => {
        try {
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
        } catch (error) {
            console.log(error.response);
            alert(error.response.data)
        }
    }
}