import Axios from "axios";
import { DOMAIN } from "../../services/domainUrl";
import { BOOKING_CHAIR, CHOICE_CHAIR, GET_CODE_PHIM_BOOKING, GET_TICKET_LIST } from "../constants/booking.constant";
import { hidenLoader_Action, showLoader_Action } from "./common.action";

export const getTicketListAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            dispatch(showLoader_Action())
            const res = await Axios({
                method: 'GET',
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
            })
            dispatch({
                type: GET_TICKET_LIST,
                payload: res.data
            })
            dispatch(hidenLoader_Action())
        } catch (error) {
            console.log(error);
            dispatch(hidenLoader_Action())
        }
    }
}

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
export const choiceChairAction = (payload) => {
    return {
        type: CHOICE_CHAIR,// great value dangChon => BookingReducer
        payload,
    }
}

export const bookingTicketAction = (showTimeCode, listChairChoice) => {
    // reccive (showTimeCode, listChairChoice) form dispatch BookingComponent
    return async (dispatch) => {
        // get data to localstorage have save form action/signIn_Action 
        const toKen = JSON.parse(localStorage.getItem('token'))
        const taiKhoan = JSON.parse(localStorage.getItem('taiKhoan'))
        try {
            // show loading
            dispatch(showLoader_Action())
            const res = await Axios({
                method: 'POST',
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
                data: {
                    maLichChieu: showTimeCode,
                    danhSachVe: listChairChoice,
                    taiKhoanNguoiDung: taiKhoan,
                },
                headers: {
                    Authorization: `Bearer ${toKen}`,
                }
            })
            dispatch({
                type: BOOKING_CHAIR, // none save BookingReducer
                payload: res,
            })
            // hidden loading
            dispatch(hidenLoader_Action())
        } catch (error) {
            console.log(error.response.status);
            // hidden loading
            dispatch(hidenLoader_Action())
        }
    }
}

