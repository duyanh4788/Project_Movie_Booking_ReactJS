import { GET_GROUP_CINEMA, GET_INFOR_SYSTEM, GET_NAME_CINEMA } from "../constants/tabNavigationComponent.const"

const initialState = {
    listSystem: [],
    codeCinema: {},
    nameCinema: {},
}

export const TabNavigationComponentReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_INFOR_SYSTEM: {
            state.listSystem = payload
            return { ...state }
        }
        case GET_GROUP_CINEMA: {
            state.codeCinema = action.payload;
            return { ...state }
        }
        case GET_NAME_CINEMA: {
            state.nameCinema = action.payload;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
