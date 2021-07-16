import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { GET_CODE_PHIM_BOOKING } from "../constants/bookingCodePhim.constant"

export const getMaPhimBooking = (maPhim) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: "GET",
                url: `${DOMAIN}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
            })
            dispatch({
                type: GET_CODE_PHIM_BOOKING,
                payload: res.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}