import { MESSAGE_STATUS_CODE } from "../constants/messageSnackbar.constant"


export const setDataErrorToZero = (zero) => {
    return {
        type: MESSAGE_STATUS_CODE,
        payload: zero
    }
}

