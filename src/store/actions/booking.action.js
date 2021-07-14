import Axios from "axios";
import { BOOKING_CHAIR, CHOICE_CHAIR, GET_TICKET_LIST } from "../constants/booking.constant";

export const getTicketListAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
            })
            dispatch({
                type: GET_TICKET_LIST,
                payload: res.data.danhSachGhe
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
            console.log(res);
            dispatch({
                type: BOOKING_CHAIR, // none save BookingReducer
            })
        } catch (error) {
            console.log(error);
        }
    }
}