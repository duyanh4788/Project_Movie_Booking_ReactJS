import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import "../src/assets/Style/scss/index.css"
// component
import Home from "./pages/Home/Home.page";
import Header from "./pages/Header/Header.page";
import FooterIntfo from "./pages/Footer/FooterIntfo"
import MovieDetailComponent from "./components/Movie-detail/Movie-detail.component";
import SignInPage from "./pages/Sign-In/Sign-In.page";
import SignUpPage from "./pages/Sign-Up/Sign-Up.page";
import AdminPage from "./pages/admin/admin.page";
import Guard from "./HOC/guard.hoc";
import HeaderResponsivePage from "./pages/Header/HeaderResponsive.page"
import CinemaDetailComponent from "./components/Cinema-detail/CinemaDetail.component";
import StepperComponent from "./components/Booking/Step.component"
import ProfileUser from "./components/Profile/Profile";
import DemoPaination from "./components/tablePagination/DemoPaination";
/**
 * 28-05-02021 Vũ Duy Anh
 * 1. Heder => notDone
 * Page/Header access to SignUpPage , SignInPage
 * pages/Home access to Carousel Slider , Carousel List
 * 2. Carousel Slider => notDone
 * 3. Carousel List => not Done
 */

function App() {

  return (
    <BrowserRouter>
      <HeaderResponsivePage />
      <Header />
      <section className="mainSection">
        <Switch >
          <Route path="/" exact component={Home} />
          <Route path="/phimDetail/:maPhim" exact component={MovieDetailComponent} />
          <Route path="/cinemaDetail/:maCumRap" exact component={CinemaDetailComponent} />
          <Route path="/signUp" exact component={SignUpPage} />
          <Route path="/signIn" exact component={SignInPage} />
          <Route path="/table" exact component={DemoPaination} />
          <Route
            path="/bookingComponent/:showTimeCode"
            exact
            component={StepperComponent}
          />
          <Route path="/admin">
            <Guard>
              <AdminPage />
            </Guard>
          </Route>
          <Route path="/profile" exact component={ProfileUser} >
          </Route>
          <Route path="">
            <Redirect to="/" />
          </Route>
        </Switch>
        <FooterIntfo />
      </section>
    </BrowserRouter>
  );
}

export default App;
