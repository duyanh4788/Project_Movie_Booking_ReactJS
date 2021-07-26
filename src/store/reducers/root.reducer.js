import { combineReducers } from "redux";
import { movieReducer } from "./movie.reduder";
import { signInReducer } from "./signIn.reducer";
import { BookingReducer } from "./booking.reducer";
import { CommonReducer } from "./common.reducer";
import { TabNavigationPageReducer } from "./tabNavigationPage.reducer";
import infoUserReducer from "./infoUser.reducer";
import { dropDownsReducer } from "./dropdowns.reducer"
import { DetailTabReducer } from "./detailTab.reducer"
import { CinemaDetailReducer } from "./cinemaDetail.reducer"
import BookingCodePhimReducer from "./bookingCodePhim.reducer"
import { SignUpReducer } from "./signup.reducer"
import { ClientManagementReducer } from "./clientManagement.reducer"
import { AdminPageReducer } from "./adminPage.reducer"
import { MovieManagementReducer } from "./movieManagement.reducer"
import { MessageSnackbarReducer } from "./messageSnackbar.reducer"
import { ListClientPaginationReducer } from "./ListClientPagination.reducer"
export const rootReducers = combineReducers({
  movieReducer,
  signInReducer,
  SignUpReducer,
  BookingReducer,
  CommonReducer,
  TabNavigationPageReducer,
  infoUserReducer,
  dropDownsReducer,
  DetailTabReducer,
  CinemaDetailReducer,
  BookingCodePhimReducer,
  ClientManagementReducer,
  AdminPageReducer,
  MovieManagementReducer,
  MessageSnackbarReducer,
  ListClientPaginationReducer,
});
