import { GET_LIST_PAGINATION } from "../constants/ListClientPagination"

const initialState = {
    listUserPagination: []
}

export const ListClientPaginationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LIST_PAGINATION: {
            state.listUserPagination = payload.items
            return { ...state }
        }
        default:
            return state
    }
}
