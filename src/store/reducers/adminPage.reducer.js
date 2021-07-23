import { GET_LENGTH_CLIENT, GET_LENGTH_MOVIE } from "../constants/adminPage.constant"

const initialState = {
    listClient: [],
    movieList: [],
}

export const AdminPageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LENGTH_MOVIE:
            state.movieList = payload
            return { ...state, ...payload }
        case GET_LENGTH_CLIENT:
            state.listClient = payload
            return { ...state, ...payload }
        default:
            return state
    }
}
