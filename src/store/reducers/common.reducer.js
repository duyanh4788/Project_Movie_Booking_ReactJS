import { HIDEN_LOADER, SHOW_LOADER } from "../constants/common.constant";

const initialState = {
    loading: false,
}

export const CommonReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SHOW_LOADER: {
            return { ...state, loading: true };
        }
        case HIDEN_LOADER: {
            return { ...state, loading: false };
        }
        default: return { ...state }
    }
}
