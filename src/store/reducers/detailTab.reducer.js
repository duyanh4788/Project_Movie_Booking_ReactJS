import { GET_CODE_CINEMA_DETAILTAB, GET_CODE_GROUP_CINEMA_DETAILTAB, GET_LOGO_DETAILTAB } from "../constants/detailTabComponent.const"

const initialState = {
    listLogoDetail: [],
    codeCinemaDetail: "",
}

export const DetailTabReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_LOGO_DETAILTAB: {
            state.listShowTimeDetail = payload
            return { ...state }
        }
        case GET_CODE_CINEMA_DETAILTAB: {
            state.codeCinemaDetail = payload
            return { ...state }
        }
        case GET_CODE_GROUP_CINEMA_DETAILTAB: {
            return { ...state }
        }
        default:
            return state
    }
}
