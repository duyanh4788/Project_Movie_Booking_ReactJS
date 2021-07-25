import { ADD_CLIENT_MANAGEMENT, GET_INFO_CLIENT, GET_LIST_CLIENT_MANAGEMENT, GET_LIST_LENGTH_CLIENT_MANAGEMENT, PAGE_EDIT_CLIENT, TAIKHOAN_CLIENT_MANAGEMENT, UPDATE_LIST_CLIENT_MANAGEMENT } from "../constants/clientManagement.constant"

const initialState = {
    listClient: [],// render html
    listClientLength: [],// render html
    pageFormClient: "listUser",// link page
    infoClient: {},// show info sau khi update
    addSuccess: {},// show info sau khi add
    updateSuccess: 0,// set status thay đổi sau khi update
}

export const ClientManagementReducer = (state = initialState, { type, payload }) => {
    let listClientUpdate = [...state.listClient]
    switch (type) {
        case GET_LIST_CLIENT_MANAGEMENT:
            state.listClient = payload.items
            return { ...state, ...payload }
        case GET_LIST_LENGTH_CLIENT_MANAGEMENT:
            state.listClientLength = payload
            return { ...state, ...payload }
        case TAIKHOAN_CLIENT_MANAGEMENT: {
            let index = listClientUpdate.findIndex(item => item.taiKhoan === payload)
            if (index !== -1) {
                listClientUpdate.splice(index, 1)
            }
            state.listClient = listClientUpdate
            return { ...state }
        }
        case PAGE_EDIT_CLIENT: {
            state.pageFormClient = payload;
            return { ...state }
        }
        case GET_INFO_CLIENT: {
            state.infoClient = payload
            return { ...state }
        }
        case UPDATE_LIST_CLIENT_MANAGEMENT: {
            state.updateSuccess = payload.status
            return { ...state }
        }
        case ADD_CLIENT_MANAGEMENT: {
            state.addSuccess = payload
            return { ...state }
        }
        default:
            return state
    }
}
