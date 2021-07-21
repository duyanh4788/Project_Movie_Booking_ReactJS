import { HIDEN_LOADER, SHOW_LOADER } from "../constants/common.constant";

const initialState = {
    loading: false,
}

export const CommonReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_LOADER: {
            state.loading = true
            return { ...state };
        }
        case HIDEN_LOADER: {
            state.loading = false
            return { ...state };
        }
        default: return { ...state }
    }
}
