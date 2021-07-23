import Axios from "axios"
import { DOMAIN } from "../../services/domainUrl"
import { GET_LENGTH_CLIENT, GET_LENGTH_MOVIE } from "../constants/adminPage.constant"



export const getLengthMovieAdminPage = (maNhom) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
            })
            dispatch({
                type: GET_LENGTH_MOVIE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const getLengthClientAdminPage = (maNhom) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`
            })
            dispatch({
                type: GET_LENGTH_CLIENT,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}