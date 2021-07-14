import Axios from 'axios'
import { GET_GROUP_CINEMA, GET_INFOR_SYSTEM, GET_NAME_CINEMA } from '../constants/tabNavigationComponent.const'

export const getInforSystem = () => {
    return async (dispatch) => {
        try {
            const res = await Axios({
                method: 'GET',
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap"
            })
            dispatch({
                type: GET_INFOR_SYSTEM,
                payload: res.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const groupCinematAction = (payload) => {
    return {
        type: GET_GROUP_CINEMA,
        payload,
    }
}
export const nameCinematAction = (codeCinema) => {
    return {
        type: GET_NAME_CINEMA,
        payload: codeCinema,
    }
}