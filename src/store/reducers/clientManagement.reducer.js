import { GET_LIST_CLIENT_MANAGEMENT, GET_LIST_SEARCH_CLIENT_MANAGEMENT, TAIKHOAN_CLIENT_MANAGEMENT } from "../constants/clientManagement.constant"

const initialState = {
    listClient: []
}

export const ClientManagementReducer = (state = initialState, { type, payload }) => {
    let listClientUpdate = [...state.listClient]
    switch (type) {

        case GET_LIST_CLIENT_MANAGEMENT:
            state.listClient = payload
            return { ...state, ...payload }
        case GET_LIST_SEARCH_CLIENT_MANAGEMENT: {
            listClientUpdate = payload
            state.listClient = listClientUpdate
            return { ...state }
        }
        case TAIKHOAN_CLIENT_MANAGEMENT: {
            let index = listClientUpdate.findIndex(item => item.taiKhoan === payload)
            if (index !== -1) {
                listClientUpdate.splice(index, 1)
            }
            state.listClient = listClientUpdate
            return { ...state }
        }
        default:
            return state
    }
}
