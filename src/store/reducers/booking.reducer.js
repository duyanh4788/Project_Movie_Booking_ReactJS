import { BOOKING_CHAIR, CHOICE_CHAIR, GET_TICKET_LIST } from "../constants/booking.constant"
import { GET_CODE_INFO_CINEMA, GET_CODE_PHIM_BOOKING } from "../constants/bookingCodePhim.constant"

const initalState = {
    listChair: [],
    mesageBooking: {},
    listPhimBooking: {},
    infoCinema: {}
}

export const BookingReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TICKET_LIST: {
            state.listChair = action.payload
            return { ...state }
        }
        case CHOICE_CHAIR: {
            let listChairUpdate = [...state.listChair]
            let index = listChairUpdate.findIndex(item => item.maGhe === action.payload.maGhe)
            if (index !== -1) {
                let oldChair = listChairUpdate[index];
                let newChair = { ...oldChair, dangChon: !oldChair.dangChon } // add more value dangChon
                listChairUpdate[index] = newChair
                state.listChair = listChairUpdate
            }
            return { ...state }
        }
        case BOOKING_CHAIR: {
            state.mesageBooking = action.payload
            return { ...state } // none save booking.action
        }
        case GET_CODE_PHIM_BOOKING: {
            state.listPhimBooking = action.payload;
            return { ...state, ...action.payload }
        }
        case GET_CODE_INFO_CINEMA: {
            state.infoCinema = action.payload;
            return { ...state, ...action.payload }
        }
        default: return { ...state }
    }
}