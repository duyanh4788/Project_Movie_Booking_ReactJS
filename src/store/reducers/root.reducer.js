import { combineReducers } from "redux";
import { movieReducer } from "./movie.reduder";
import { detaiMovielReducer } from "./detail.reducer";
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

export const rootReducers = combineReducers({
  movieReducer,
  detaiMovielReducer,
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
});
