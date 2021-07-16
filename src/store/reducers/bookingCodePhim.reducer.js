import { GET_CODE_PHIM_BOOKING } from "../constants/bookingCodePhim.constant"

const initialState = {
    listPhimBooking: {}
}

const BookingCodePhimReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_CODE_PHIM_BOOKING:
            state.listPhimBooking = payload;
            return { ...state, ...payload }

        default:
            return state
    }
}

export default BookingCodePhimReducer