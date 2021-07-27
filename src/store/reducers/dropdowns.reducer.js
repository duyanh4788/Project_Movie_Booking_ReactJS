import { GET_CINEMA_DROPDOWNS, GET_LIST_MOVIE_DROPDOWNS, GET_DATE_DROPDOWNS } from "../constants/dropdown.constant"

const initialState = {
    listPhim: [],
    listCinema: {},
    listLichChieu: {},
}

export const dropDownsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LIST_MOVIE_DROPDOWNS:
            state.listPhim = payload
            return { ...state, ...payload }
        case GET_CINEMA_DROPDOWNS:
            state.listCinema = payload
            return { ...state, ...payload }
        case GET_DATE_DROPDOWNS:
            state.listLichChieu = payload
            return { ...state, ...payload }
        default:
            return state
    }
}
