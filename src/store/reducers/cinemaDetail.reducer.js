import { GET_DETAIL_CINEMA, GET_INFOPHIM_DETAIL_CINEMA, GET_LISTPHIM_DETAIL_CINEMA, GET_LOGO_CINEMA } from "../constants/cinemaDetail.constant"

const initialState = {
    loGoCinema: [],
    groupCinema: [],
    listPhimCinema: [],
    infoCinema: null,
}

export const CinemaDetailReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_LOGO_CINEMA:
            state.loGoCinema = payload
            return { ...state, ...payload }

        case GET_DETAIL_CINEMA:
            state.groupCinema = payload
            return { ...state, ...payload }

        case GET_LISTPHIM_DETAIL_CINEMA:
            state.listPhimCinema = payload
            return { ...state, ...payload }

        case GET_INFOPHIM_DETAIL_CINEMA:
            state.infoCinema = payload
            return { ...state, ...payload }

        default:
            return state
    }
}
