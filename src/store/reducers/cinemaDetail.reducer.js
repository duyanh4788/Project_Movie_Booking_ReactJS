import { GET_DETAIL_CINEMA, GET_INFO_MOVIE_DETAIL_CINEMA, GET_LIST_MOVIE_DETAIL_CINEMA, GET_LOGO_CINEMA, SHOW_SCHEDULE_MOVIE_CINEMADETAIL } from "../constants/cinemaDetail.constant"

const initialState = {
    loGoCinema: [],
    groupCinema: [],
    listPhimCinema: [],
    infoCinema: null,
    showScheduleMovie: undefined,
}

export const CinemaDetailReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_LOGO_CINEMA:
            state.loGoCinema = payload
            return { ...state, ...payload }

        case GET_DETAIL_CINEMA:
            state.groupCinema = payload
            return { ...state, ...payload }

        case GET_LIST_MOVIE_DETAIL_CINEMA:
            state.listPhimCinema = payload
            return { ...state, ...payload }

        case GET_INFO_MOVIE_DETAIL_CINEMA: {
            state.infoCinema = payload
            return { ...state, ...payload }
        }
        case SHOW_SCHEDULE_MOVIE_CINEMADETAIL: {
            state.showScheduleMovie = payload
            return { ...state, ...payload }
        }
        default:
            return state
    }
}

