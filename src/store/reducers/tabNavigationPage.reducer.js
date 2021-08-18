import { GET_CODE_CINEMA_PAGE, GET_CODE_GROUP_CINEMA_PAGE, GET_LIST_SHOWTIME_PAGE, GET_MOVIE_SCHEDULE_PAGE, GET_NAME_GROUP_CINEMA_PAGE,  SCHEDULE_TAB } from "../constants/tabNavigationPage.const"

const initialState = {
    listShowTime: [],
    codeCinema: "",
    lstCumRap: [],
    schedulerMovie: undefined,
    codeGroupCinema: {},
    nameGroupCinema: "",
    lichChieuPhim: [],
}

export const TabNavigationPageReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_LIST_SHOWTIME_PAGE: {
            state.listShowTime = payload
            return { ...state }
        }
        case GET_CODE_CINEMA_PAGE: {
            // get codeCinema use codeCinema = useSelector to NavigationTabsTwo.page
            state.codeCinema = payload
            // get lstCumRap use lstCumRap = useSelector to NavigationTabsTwo.page
            let listShowTimeUpdate = [...state.listShowTime]
            let indexlistShowTimeUpdate = listShowTimeUpdate.find(item => item.maHeThongRap === payload)
            state.lstCumRap = indexlistShowTimeUpdate.lstCumRap
            return { ...state }
        }
        case SCHEDULE_TAB: {
            state.schedulerMovie = payload;
            return { ...state }
        }
        case GET_CODE_GROUP_CINEMA_PAGE: {
            state.codeGroupCinema = payload
            let lstCumRapUpdate = [...state.lstCumRap]
            let indexlstCumRapUpdate = lstCumRapUpdate.find(item => item.danhSachPhim)
            state.danhSachPhim = indexlstCumRapUpdate.danhSachPhim
            return { ...state }
        }
        case GET_NAME_GROUP_CINEMA_PAGE: {
            state.nameGroupCinema = payload;
            return { ...state }
        }
        case GET_MOVIE_SCHEDULE_PAGE: {
            state.lichChieuPhim = payload;
            return { ...state }
        }
        default:
            return state
    }
}
