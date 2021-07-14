import { GET_LOGO_DETAILTAB } from "../constants/detailTabComponent.const"

const initialState = {
    listLogoDetail: [],
}

export const DetailTabReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_LOGO_DETAILTAB: {
            state.listShowTimeDetail = payload
            return { ...state }
        }
        default:
            return state
    }
}
