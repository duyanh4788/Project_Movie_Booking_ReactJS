import { GET_MOVIE_DETAIL } from "../constants/detail.constant";

const initialState = {
  detail: {},
};

export const detaiMovielReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAIL: {
      state.detail = action.payload;
      return { ...state };
    }
    default:
      return { state };
  }
};
