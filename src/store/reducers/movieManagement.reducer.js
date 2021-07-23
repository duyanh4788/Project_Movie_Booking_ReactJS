import { ADD_LIST_MOVIE_MANAGEMENT, CREAT_SCHEDULE_MOVIE_MANAGEMENT, DELETE_LIST_MOVIE_MANAGEMENT, GET_LIST_MOVIE_MANAGEMENT, GET_MAPHIM_MOVIE_MANAGEMENT, INFO_MOVIE_MANAGEMENT, PAGE_FORM_MOVIE_MANAGEMENT, UPDATE_LIST_MOVIE_MANAGEMENT } from "../constants/movieManagement.constant"

const initialState = {
    movieList: [],
    pageFormAdd: "listMovie",
    infoMovie: {},
    maPhim: "",
}

export const MovieManagementReducer = (state = initialState, { type, payload }) => {
    let movieListUpdate = [...state.movieList]
    switch (type) {

        case GET_LIST_MOVIE_MANAGEMENT: {
            state.movieList = payload
            return { ...state, ...payload }
        }
        case DELETE_LIST_MOVIE_MANAGEMENT: {
            let index = movieListUpdate.find(item => item.maPhim === payload)
            if (index !== -1) {
                movieListUpdate.splice(index, 1)
            }
            state.movieList = movieListUpdate
            return { ...state }
        }
        case INFO_MOVIE_MANAGEMENT: {
            state.infoMovie = payload
            return { ...state }
        }
        case PAGE_FORM_MOVIE_MANAGEMENT: {
            state.pageFormAdd = payload
            return { ...state }
        }
        case UPDATE_LIST_MOVIE_MANAGEMENT: {
            return { ...state }
        }
        case ADD_LIST_MOVIE_MANAGEMENT: {
            return { ...state }
        }
        case GET_MAPHIM_MOVIE_MANAGEMENT: {
            state.maPhim = payload
            return { ...state }
        }
        case CREAT_SCHEDULE_MOVIE_MANAGEMENT: {
            return { ...state }
        }
        default:
            return state
    }
}
