import Axios from "axios"
import { GET_CODE_CINEMA_PAGE, GET_CODE_GROUP_CINEMA_PAGE, GET_LIST_SHOWTIME_PAGE, GET_MOVIE_SCHEDULE_PAGE, GET_NAME_GROUP_CINEMA_PAGE } from "../constants/tabNavigationPage.const"


export const getListShowTimePageAction = () => {// get data to Axios use NavigationTabsOne.page.jsx
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01"
            })
            dispatch({
                type: GET_LIST_SHOWTIME_PAGE, // dipatch TabNavigationPageReducer
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const getCodeCinemaPage = (codeCinema) => {// post data form NavigationTabsOne.page.jsx to TabNavigationPageReducer
    return {
        type: GET_CODE_CINEMA_PAGE,
        payload: codeCinema,
    }
}

export const getCodeGroupCinemaPage = (codeGroupCinema) => { // post data form NavigationTabsTwo.pageto TabNavigationPageReducer
    return {
        type: GET_CODE_GROUP_CINEMA_PAGE,
        payload: codeGroupCinema,
    }
}
export const getNameGroupCinemaPage = (nameGroupCinema) => { // post data form NavigationTabsTwo.pageto TabNavigationPageReducer
    return {
        type: GET_NAME_GROUP_CINEMA_PAGE,
        payload: nameGroupCinema,
    }
}

export const getMovieSchedulePage = (lichChieuPhim) => {
    return {
        type: GET_MOVIE_SCHEDULE_PAGE,
        payload: lichChieuPhim
    }
}