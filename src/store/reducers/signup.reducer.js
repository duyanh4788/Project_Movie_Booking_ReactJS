import { ERR_NOTIFI_SIGNUP, INFOR_SIGNIN, SUCCESS_NOTIFI_SIGNUP } from "../constants/signup.constant"

const initialState = {
    inforSignIn: {},
    messageSignUp: "",
    mesageSuccess: "",
}

export const SignUpReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case INFOR_SIGNIN:
            state.inforSignIn = payload
            return { ...state }
        case ERR_NOTIFI_SIGNUP:
            state.messageSignUp = payload
            return { ...state }
        case SUCCESS_NOTIFI_SIGNUP:
            state.mesageSuccess = payload
            return { ...state, ...payload }
        default:
            return state
    }
}
