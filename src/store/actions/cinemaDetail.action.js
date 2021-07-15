import Axios from "axios"
import { DOMAIN } from "../../services/domainUrl";
import { GET_DETAIL_CINEMA, GET_INFOPHIM_DETAIL_CINEMA, GET_LISTPHIM_DETAIL_CINEMA, GET_LOGO_CINEMA } from "../constants/cinemaDetail.constant";

export const getLogoCinema = () => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: `${DOMAIN}QuanLyRap/LayThongTinHeThongRap`
            })
            dispatch({
                type: GET_LOGO_CINEMA,
                payload: res.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const getDetailCinema = (maCumRap) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "get",
                url: `${DOMAIN}QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maCumRap}&maNhom=GP01`
            })
            dispatch({
                type: GET_DETAIL_CINEMA,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getListPhimCinema = (danhSachPhim) => {
    return {
        type: GET_LISTPHIM_DETAIL_CINEMA,
        payload: danhSachPhim
    }
}

export const getInfoPhimCinema = (infoPhim) => {
    return {
        type: GET_INFOPHIM_DETAIL_CINEMA,
        payload: infoPhim
    }
}