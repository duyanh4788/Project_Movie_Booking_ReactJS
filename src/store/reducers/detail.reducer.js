import { GET_MOVIE_DETAIL } from "../constants/detail.constant";
import { GET_GROUP_CINEMA, GET_NAME_CINEMA } from "../constants/tabNavigationComponent.const";

const initialState = {
  detail: {},
};

export const detaiMovielReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIE_DETAIL: {
      state.detail = action.payload;
      return { ...state };
    }
    case GET_GROUP_CINEMA: {
      return { ...state }// call dispatch for NavigationTabsTwo.component ???
    }
    case GET_NAME_CINEMA: {
      return { ...state }// call dispatch for NavigationTabsThere.component ???
    }
    default:
      return { state };
  }
};
