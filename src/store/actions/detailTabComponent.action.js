import Axios from "axios"
import { DOMAIN } from "../../services/domainUrl"
import { GET_CODE_CINEMA_DETAILTAB, GET_CODE_GROUP_CINEMA_DETAILTAB, GET_LOGO_DETAILTAB } from "../constants/detailTabComponent.const"


export const getListShowTimeDetailTabAction = () => {// get data to Axios use NavigationTabsOne.page.jsx
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: `${DOMAIN}QuanLyRap/LayThongTinHeThongRap`
            })
            dispatch({
                type: GET_LOGO_DETAILTAB, // dipatch TabNavigationPageReducer
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const getCodeCinemaDetailTab = (codeCinema)=>{// post data form NavigationTabsOne.page.jsx to TabNavigationPageReducer
    return {
        type :GET_CODE_CINEMA_DETAILTAB,
        payload :codeCinema,
    }
}

export const getCodeGroupDetailTab = (codeGroupCinema)=>{ // post data form NavigationTabsTwo.pageto TabNavigationPageReducer
    console.log(codeGroupCinema);
    return {
        type : GET_CODE_GROUP_CINEMA_DETAILTAB,
        payload : codeGroupCinema,
    }
}
