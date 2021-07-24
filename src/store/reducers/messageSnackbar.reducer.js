import { MESSAGE_DATA_ERROR, MESSAGE_STATUS_CODE } from "../constants/messageSnackbar.constant"

const initialState = {
    statusCode: "",
    errorMessage: ""
}

export const MessageSnackbarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MESSAGE_STATUS_CODE: {
            state.statusCode = payload
            return { ...state }
        }
        case MESSAGE_DATA_ERROR: {
            state.errorMessage = payload
            return { ...state }
        }
        default:
            return state
    }
}
