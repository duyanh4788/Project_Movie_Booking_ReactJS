
import { GET_LOGO_DETAILTAB, GET_MOVIE_DETAIL, GET_SCHEDULE_MOVIE_DETAIL } from "../constants/detailTabComponent.const"

const initialState = {
    listLogoDetail: [],
    detailMovie: {},
    lichChieuMovie: [],
    showDatePanel: [],
}

export const DetailTabReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_LOGO_DETAILTAB: {
            state.listShowTimeDetail = payload
            return { ...state }
        }
        case GET_MOVIE_DETAIL: {
            state.detailMovie = payload;
            return { ...state };
        }
        case GET_SCHEDULE_MOVIE_DETAIL: {
            state.lichChieuMovie = payload
            state.showDatePanel = payload
            return { ...state }
        }
        default:
            return state
    }
}
