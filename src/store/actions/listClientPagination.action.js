import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { GET_LIST_PAGINATION } from "../constants/ListClientPagination";

export const getListClientPagination = (maNhom, soTrang, soPhanTuTrenTrang) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
            })
            dispatch({
                type: GET_LIST_PAGINATION,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}

export const getListSearchClientPagination = (maNhom, tuKhoa, soTrang, soPhanTuTrenTrang) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=${maNhom}&tuKhoa=${tuKhoa}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
            })
            console.log(res.data);
            dispatch({
                type: GET_LIST_PAGINATION,
                payload: res.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }
}