import { DELETE_LIST_MOVIE_MANAGEMENT, GET_CODE_CINEMA_MOVIE_MANAGEMENT, GET_CUM_RAP_MOVIE_MANAGEMENT, GET_LIST_LENGTH_MOVIE_MANAGEMENT, GET_LIST_MOVIE_MANAGEMENT, GET_MAPHIM_MOVIE_MANAGEMENT, GET_MOVIE_DATE_MANAGEMENT, INFO_MOVIE_MANAGEMENT, PAGE_FORM_MOVIE_MANAGEMENT, SET_UPDATE_SUCCESS_MOVIE_MANAGEMENT, UPDATE_LIST_MOVIE_MANAGEMENT } from "../constants/movieManagement.constant"

const initialState = {
    movieList: [],// render table  moviemanagement
    movieListLength: [], // get length array page
    movieListDate: [], // get list movie date 
    pageFormAdd: "listMovie",// link page moviemanagement
    updateSuccess: 0,// moviemanagement render html sau khi update thành công
    infoMovie: {},// form edit
    maPhim: "",// FormCreatSchedule
    codeCinema: {},// FormCreatSchedule
    codeCumRap: [], // FormCreatSchedule

}

export const MovieManagementReducer = (state = initialState, { type, payload }) => {
    let movieListUpdate = [...state.movieList]
    switch (type) {
        case GET_LIST_MOVIE_MANAGEMENT: {
            state.movieList = payload.items
            return { ...state, ...payload }
        }
        case GET_LIST_LENGTH_MOVIE_MANAGEMENT: {
            state.movieListLength = payload
            return { ...state, ...payload }
        }
        case GET_MOVIE_DATE_MANAGEMENT: {
            movieListUpdate = payload
            state.movieList = movieListUpdate
            state.movieListDate = payload
            return { ...state, ...payload }
        }
        case GET_CODE_CINEMA_MOVIE_MANAGEMENT: {
            state.codeCinema = payload;
            return { ...state }
        }
        case GET_CUM_RAP_MOVIE_MANAGEMENT: {
            state.codeCumRap = payload;
            return { ...state }
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
            state.updateSuccess = payload.status
            return { ...state }
        }
        case SET_UPDATE_SUCCESS_MOVIE_MANAGEMENT: {
            state.updateSuccess = payload
            return { ...state }
        }
        case GET_MAPHIM_MOVIE_MANAGEMENT: {
            state.maPhim = payload
            return { ...state }
        }
        default:
            return state
    }
}
