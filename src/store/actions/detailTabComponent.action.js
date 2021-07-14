import Axios from "axios"
import { DOMAIN } from "../../services/domainUrl"
import { GET_LOGO_DETAILTAB } from "../constants/detailTabComponent.const"


export const getLogoDetailTabAction = () => {// get data to Axios use NavigationTabsOne.page.jsx
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
